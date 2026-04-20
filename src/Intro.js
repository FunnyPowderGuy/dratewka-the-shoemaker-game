export class Intro {
  constructor(onDone) {
    this.onDone = onDone;

    this.screens = [
      { src: "./assets/Title.jpg", duration: null },
      { src: "./assets/opis_A.jpg", duration: 30000 },
      { src: "./assets/opis_B.jpg", duration: 30000 },
    ];

    this.currentScreen = 0;
    this.autoTimer = null;
    this.musicStarted = false;

    this.music = new Audio("./assets/hejnal.mp3");

    this.overlay = document.createElement("div");
    this.overlay.id = "introOverlay";

    this.img = document.createElement("img");
    this.img.id = "introImg";

    this.hint = document.createElement("div");
    this.hint.textContent = "Press SPACE to skip";
    this.hint.id = "introHint";

    this.overlay.appendChild(this.img);
    this.overlay.appendChild(this.hint);
    document.body.appendChild(this.overlay);

    this.music.play().catch(() => {
      const startMusicOnce = () => {
        if (!this.musicStarted) {
          this.music.play();
          this.musicStarted = true;
        }
        document.removeEventListener("keydown", startMusicOnce);
        document.removeEventListener("click", startMusicOnce);
      };
      document.addEventListener("keydown", startMusicOnce);
      document.addEventListener("click", startMusicOnce);
    });

    // Space advances to the next intro screen
    this.keyHandler = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        this.advance();
      }
    };
    document.addEventListener("keydown", this.keyHandler);

    this.showScreen(0);
  }

  showScreen(index) {
    if (this.autoTimer) {
      clearTimeout(this.autoTimer);
      this.autoTimer = null;
    }

    this.currentScreen = index;
    this.img.src = this.screens[index].src;

    const duration = this.screens[index].duration;
    if (duration) {
      this.autoTimer = setTimeout(() => this.advance(), duration);
    }
  }

  advance() {
    const next = this.currentScreen + 1;
    if (next >= this.screens.length) {
      this.finish();
    } else {
      this.showScreen(next);
    }
  }

  finish() {
    this.music.pause();
    this.music.currentTime = 0;
    if (this.autoTimer) {
      clearTimeout(this.autoTimer);
    }

    document.removeEventListener("keydown", this.keyHandler);
    this.overlay.remove();
    this.onDone();
  }
}
