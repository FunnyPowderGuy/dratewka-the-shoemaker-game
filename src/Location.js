import { MAX_LOCATION_ITEMS } from "./Consts.js";

export class Location {
    constructor(entry = {}) {
        this.id = entry.id;
        this.x  = entry.x;
        this.y = entry.y;
        this.locationHeader = entry.locationHeader;
        this.image = entry.image;
        this.color = entry.color;
        this.ableMoves = entry.ableMoves;
        this.condition = entry.condition;
        this.items = [];
    }

    key() {
        return `${this.x}-${this.y}`;
    }

    canMove(direction) {
        return this.ableMoves[direction] === 1;
    }

    // max 3 items per location
    canDrop() {
        const count = this.items.filter(item => item.flag === 1).length;
        return count < MAX_LOCATION_ITEMS;
    }

    removeItem(itemId) {
        const index = this.items.findIndex(item => item.id === itemId);
        if (index === -1) return null;
        const item = this.items[index];
        this.items.splice(index, 1);
        return item;
    }

    addItem(item) {
        this.items.push(item);
    }

    // returns what you see
    describeItems() {
        if (this.items.length === 0) return "You see nothing";
        const names = this.items.map(item => item.name);
        return "You see: " + names.join(", ");
    }
}