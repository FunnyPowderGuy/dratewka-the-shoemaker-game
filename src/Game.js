import { map } from "./mapData.js";
import { Location } from "./Location.js";
import { Player } from "./Player.js";
import { Intro } from "./Intro.js";
import { Compass } from "./Compass.js";
import { EndScreen } from "./EndScreen.js";
import {
  DIR,
  INPUT_TO_DIR,
  START_POS,
  MESSAGES,
  ITEMS,
  ALL_ITEMS,
  ITEM_STARTING_LOCATIONS,
  MILESTONES_TO_ASSEMBLE,
  VOCABULARY_SCREEN,
  GOSSIPS_SCREEN,
} from "./Consts.js";

const DRAGON_BLOCKED_ROUTE = {
  fromKey: "2-4",
  direction: DIR.W,
};

class Game {
  constructor() {
    this.playerPos = { ...START_POS };
    this.locations = [];

    this.player = new Player();

    this.milestones = 0;
    this.dragonDead = false;
    this.gameWon = false;

    this.overlayActive = false;

    this.locationHeaderElem = document.getElementById("locationHeader");
    this.canvasElem = document.getElementById("image");
    this.compassElem = document.getElementById("compass");
    this.ableMovesElem = document.getElementById("ableMoves");
    this.inputElem = document.getElementById("inputDirection");
    this.whatUSeeElem = document.getElementById("whatUSee");
    this.whatUCarryElem = document.getElementById("whatUCarry");
    this.messageElem = document.getElementById("message");
    this.controlsElem = document.getElementById("controls");

    this.ctx = this.canvasElem.getContext("2d");

    this.compass = new Compass(this.compassElem);

    this.endScreen = new EndScreen();
    this.endScreen.onKonami(() => this.endScreen.show());

    this.initLocations();
    this.placeStartItems();

    document.addEventListener("click", () => {
      this.inputElem.focus();
    });

    document.addEventListener("keydown", () => {
      this.inputElem.focus();
    });

    this.inputElem.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const raw = this.inputElem.value.trim();
        this.inputElem.value = "";
        this.handleInput(raw);
      }
    });

    new Intro(() => {
      this.render();
      this.inputElem.focus();
    });
  }

  showMessage(text) {
    this.messageElem.textContent = text;
    this.controlsElem.style.display = "none";
    this.messageElem.style.display = "block";

    setTimeout(() => {
      this.messageElem.style.display = "none";
      this.controlsElem.style.display = "flex";
      this.inputElem.focus();
    }, 500);
  }

  // location array from map data
  initLocations() {
    this.locations = [];
    for (let y = 0; y < map.length; y++) {
      const row = [];
      for (let x = 0; x < map[y].length; x++) {
        row.push(new Location(map[y][x]));
      }
      this.locations.push(row);
    }
  }

  // place items
  placeStartItems() {
    for (const locationKey in ITEM_STARTING_LOCATIONS) {
      const itemId = ITEM_STARTING_LOCATIONS[locationKey];
      const itemDef = ALL_ITEMS.find((i) => i.id === itemId);
      if (!itemDef) continue;

      const loc = this.getLocationByKey(locationKey);
      if (loc) {
        loc.addItem({ ...itemDef }); // spread copy not reference!
      }
    }
  }

  getCurrentLocation() {
    const { x, y } = this.playerPos;
    return this.locations[y - 1][x - 1];
  }

  getLocationByKey(key) {
    for (let y = 0; y < this.locations.length; y++) {
      for (let x = 0; x < this.locations[y].length; x++) {
        if (this.locations[y][x].key() === key) {
          return this.locations[y][x];
        }
      }
    }
    return null;
  }

  // input handler
  handleInput(raw) {
    if (this.gameWon) return;

    const parts = raw.toUpperCase().split(" ");
    const command = parts[0];
    const arg = parts.slice(1).join(" ");

    const direction = INPUT_TO_DIR[command];
    if (direction !== undefined) {
      this.move(direction);
      return;
    }
    switch (command) {
      case "TAKE":
        this.take(arg);
        break;
      case "T":
        this.take(arg);
        break;
      case "DROP":
        this.drop(arg);
        break;
      case "D":
        this.drop(arg);
        break;
      case "USE":
        this.use(arg);
        break;
      case "U":
        this.use(arg);
        break;
      case "VOCABULARY":
      case "V":
        this.showOverlay(VOCABULARY_SCREEN);
        break;
      case "GOSSIPS":
        this.showOverlay(GOSSIPS_SCREEN);
        break;
      case "G":
        this.showOverlay(GOSSIPS_SCREEN);
        break;
      default:
        this.showMessage("Unknown command. Type V for vocabulary.");
    }
  }

  // moves the player to the direciton
  move(direction) {
    const location = this.getCurrentLocation();

    if (
      location.key() === DRAGON_BLOCKED_ROUTE.fromKey &&
      direction === DRAGON_BLOCKED_ROUTE.direction &&
      !this.dragonDead
    ) {
      this.showMessage("You can't go that way... The dragon sleeps in a cave!");
      return;
    }

    if (!location.canMove(direction)) {
      this.showMessage("You can't go that way.");
      return;
    }

    switch (direction) {
      case DIR.N:
        this.playerPos.y--;
        break;
      case DIR.S:
        this.playerPos.y++;
        break;
      case DIR.E:
        this.playerPos.x++;
        break;
      case DIR.W:
        this.playerPos.x--;
        break;
    }

    this.showMessage(MESSAGES.GOING[direction]);
    this.render();
  }

  //  take item from location
  take(itemName) {
    const location = this.getCurrentLocation();
    const item = location.items.find((i) =>
      i.name.toUpperCase().includes(itemName),
    );

    if (!item) {
      this.showMessage(MESSAGES.NOT_HERE);
      return;
    }
    if (item.flag === 0) {
      this.showMessage(MESSAGES.CANT_CARRY);
      return;
    }
    if (this.player.isCarrying()) {
      this.showMessage(MESSAGES.ALREADY_CARRY(this.player.carrying.name));
      return;
    }

    location.removeItem(item.id);
    this.player.pickUp(item);
    this.showMessage(MESSAGES.TAKE_SUCCESS(item.name));
    this.render();
  }

  // drop item
  drop(itemName) {
    if (!this.player.isCarrying()) {
      this.showMessage(MESSAGES.DROP_EMPTY);
      return;
    }

    const carrying = this.player.carrying;
    if (!carrying.name.toUpperCase().includes(itemName)) {
      this.showMessage(MESSAGES.DROP_NOT_HAVE(itemName));
      return;
    }

    const location = this.getCurrentLocation();
    if (!location.canDrop()) {
      this.showMessage(MESSAGES.DROP_FULL);
      return;
    }

    const item = this.player.drop();
    location.addItem(item);
    this.showMessage(MESSAGES.DROP_SUCCESS(item.name));
    this.render();
  }

  // use item
  use(itemName) {
    if (!this.player.isCarrying()) {
      this.showMessage(MESSAGES.USE_NOT_HAVE);
      return;
    }

    const carrying = this.player.carrying;
    if (!carrying.name.toUpperCase().includes(itemName)) {
      this.showMessage(MESSAGES.USE_NOT_HAVE);
      return;
    }

    if (carrying.id === 36) {
      this.showMessage("You show your prize to everyone!");
      this.render();
      setTimeout(() => this.winGame(), 1500);
      return;
    }

    const location = this.getCurrentLocation();
    const locationKey = location.key();
    const rule = ITEMS.find(
      (r) => r.itemId === carrying.id && r.locationKey === locationKey,
    );

    if (!rule) {
      this.showMessage(MESSAGES.USE_NOTHING);
      return;
    }

    // cannot feed dead dragon
    if (carrying.id === 37 && this.dragonDead) {
      this.showMessage("The dragon is already dead.");
      return;
    }

    // dead dragon check
    if (carrying.id === 33) {
      const hasDragon = location.items.find((i) => i.id === 30);
      if (!hasDragon) {
        this.showMessage(MESSAGES.USE_NOTHING);
        return;
      }
    }

    // sheep full check
    if (carrying.id === 37 && this.milestones < MILESTONES_TO_ASSEMBLE) {
      this.showMessage("Your sheep is not ready yet. Keep working!");
      return;
    }

    this.player.drop();

    const resultItem = ALL_ITEMS.find((i) => i.id === rule.result);

    if (resultItem) {
      if (rule.onLocation) {
        location.addItem({ ...resultItem });

        if (rule.milestone) {
          this.milestones++;
          // full sheep check
          if (this.milestones === MILESTONES_TO_ASSEMBLE) {
            const sheep = ALL_ITEMS.find((i) => i.id === 37);
            this.player.pickUp({ ...sheep });
          }
        }

        if (rule.result === 30) {
          this.dragonDead = true;
          const trapLoc = this.getLocationByKey("3-4");
          if (trapLoc) trapLoc.image = "./assets/smokbmp.bmp";
        }
      } else {
        this.player.pickUp({ ...resultItem });
      }
    }

    // win kondition when shoes given
    if (carrying.id === 35 && rule.result === 36) {
      this.showMessage(rule.message);
      this.render();
      return;
    }

    this.showMessage(rule.message);
    this.render();
  }

  // shows vocabulary
  showOverlay(lines) {
    this.overlayActive = true;
    this.locationHeaderElem.textContent = "";
    this.ableMovesElem.textContent = "";
    this.whatUSeeElem.innerHTML = lines.map((l) => `<p>${l}</p>`).join("");
    this.whatUCarryElem.innerHTML = "";
    this.controlsElem.style.display = "none";
    this.messageElem.style.display = "none";

    const dismiss = () => {
      this.overlayActive = false;
      this.render();
      document.removeEventListener("keydown", dismiss);
    };
    setTimeout(() => document.addEventListener("keydown", dismiss), 50);
  }

  // win
  winGame() {
    this.gameWon = true;
    this.locationHeaderElem.textContent = "** YOU WON! **";
    this.ableMovesElem.textContent = "";
    this.whatUSeeElem.innerHTML = MESSAGES.WIN;
    this.whatUCarryElem.innerHTML = "";
    this.controlsElem.style.display = "none";
    this.messageElem.textContent = "Thank you for playing!";
    this.messageElem.style.display = "block";

    this.endScreen.show();
  }

  // build directions
  buildMovesText(ableMoves) {
    const directions = [];
    if (ableMoves[DIR.N]) directions.push("North");
    if (ableMoves[DIR.S]) directions.push("South");
    if (ableMoves[DIR.E]) directions.push("East");
    if (ableMoves[DIR.W]) directions.push("West");
    return "You can go: " + directions.join(", ");
  }

  // draws the location
  drawImage(src, color) {
    if (!src) return;

    const img = new Image();
    img.src = src;

    img.onload = () => {
      this.canvasElem.width = img.width;
      this.canvasElem.height = img.height;
      this.ctx.drawImage(img, 0, 0);

      // apply colors for canvas
      this.ctx.fillStyle = color;
      this.ctx.globalCompositeOperation = "multiply";
      this.ctx.fillRect(0, 0, img.width, img.height);
      this.ctx.globalCompositeOperation = "source-over";
    };
  }

  // update ui
  render() {
    if (this.overlayActive || this.gameWon) return;

    this.controlsElem.style.display = "flex";
    this.messageElem.style.display = "none";

    const location = this.getCurrentLocation();

    this.locationHeaderElem.textContent = location.locationHeader;
    this.ableMovesElem.textContent = this.buildMovesText(location.ableMoves);
    this.whatUSeeElem.innerHTML = location.describeItems();
    this.whatUCarryElem.innerHTML = this.player.isCarrying()
      ? "You carry: " + this.player.carrying.name
      : MESSAGES.CARRY_NOTHING;

    this.drawImage(location.image, location.color);

    // compas update
    this.compass.update(location.ableMoves);
  }
}

const game = new Game();
