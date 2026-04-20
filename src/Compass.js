import { DIR } from "./Consts.js";

export class Compass {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.image = new Image();
    this.image.src = "./assets/kompas.bmp";
  }

  update(ableMoves) {
    const draw = () => {
      const w = this.canvas.width;
      const h = this.canvas.height;

      this.ctx.drawImage(this.image, 0, 0, w, h);

      this.ctx.fillStyle = "#000000";

      const rects = [
        { dir: DIR.N, x: 150, y: 0, w: 60, h: 16 },
        { dir: DIR.S, x: 150, y: 130, w: 60, h: 30 },
        { dir: DIR.E, x: 350, y: 40, w: 40, h: 20 },
        { dir: DIR.W, x: 0, y: 40, w: 50, h: 20 },
      ];

      for (const rect of rects) {
        if (!ableMoves[rect.dir]) {
          this.ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
        }
      }
    };

    draw();
  }
}
