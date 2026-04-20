export class EndScreen {
    constructor() {
        this.konamiSequence = [
            "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
            "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
            "b", "a"
        ];
        this.konamiProgress = 0;
        this.konamiCallback = null;

        document.addEventListener("keydown", (e) => this.checkKonami(e));
    }

    onKonami(konam) {
        this.konamiCallback = konam;
    }

    checkKonami(e) {
        const expected = this.konamiSequence[this.konamiProgress];

        if (e.key === expected || e.key.toLowerCase() === expected) {
            this.konamiProgress++;
            if (this.konamiProgress === this.konamiSequence.length) {
                this.konamiProgress = 0;
                if (this.konamiCallback) this.konamiCallback();
            }
        } else {
            this.konamiProgress = 0;
            if (e.key === this.konamiSequence[0]) {
                this.konamiProgress = 1;
            }
        }
    }

    show() {
        if (document.getElementById("endOverlay")) return;

        const overlay = document.createElement("div");
        overlay.id = "endOverlay";

        const img = document.createElement("img");
        img.src = "./assets/end.jpg";
        img.id = "endIMg"

        overlay.appendChild(img);
        document.body.appendChild(overlay);
    }
}