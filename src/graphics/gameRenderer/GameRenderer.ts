interface Piece {
  col: string;
  row: string;
  white: boolean;
  //   id: number;
  //   exists: Boolean;
}

interface RenderBoardArgs {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  pieces: Piece[];
}

export default class GameRenderer {
  constructor() {}

  render({ ctx, width, height, pieces }: RenderBoardArgs) {
    ctx.clearRect(0, 0, width, height);

    const offset = 50;
    const boardSize = 8;
    const cellSize = (width - offset) / boardSize;

    ctx.save();

    ctx.translate(offset, 0);

    ctx.fillStyle = "#8A5D31";
    for (let i = 0; i < boardSize; i++) {
      for (let j = i % 2; j < boardSize; j += 2) {
        ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
      }
    }

    ctx.fillStyle = "#5D3F22";
    for (let i = 0; i < boardSize; i++) {
      for (let j = (i + 1) % 2; j < boardSize; j += 2) {
        ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
      }
    }

    ctx.strokeStyle = "#232326";
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, cellSize * boardSize, cellSize * boardSize);

    ctx.restore();

    ctx.save();

    ctx.translate(offset / 2, height - offset / 2);

    ctx.fillStyle = "#232326";
    ctx.font = "12px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    for (let i = 0; i < boardSize; i++) {
      ctx.fillText(`${i + 1}`, 0, -offset / 2 - cellSize / 2 - cellSize * i);
      ctx.fillText(
        String.fromCharCode("A".charCodeAt(0) + i),
        offset / 2 + cellSize / 2 + cellSize * i,
        0
      );
    }

    ctx.restore();

    ctx.save();

    ctx.strokeStyle = "#232326";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(offset * 0.75, 0);
    ctx.lineTo(offset * 0.75, height - offset * 0.75);
    ctx.lineTo(width, height - offset * 0.75);
    ctx.stroke();

    ctx.restore();

    ctx.save();

    ctx.translate(offset * 0.75, height - offset * 0.75);
    ctx.rotate(Math.PI / 4);

    ctx.fillStyle = "#232326";
    ctx.fillRect(-offset / 4 / 2, -offset / 4 / 2, offset / 4, offset / 4);

    ctx.restore();

    ctx.save();

    ctx.translate(offset + cellSize / 2, cellSize / 2);
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    pieces.forEach((e: Piece) => {
      ctx.fillStyle = e.white ? "#DEDAD7" : "#232326";
      let x = (e.col.charCodeAt(0) - "a".charCodeAt(0)) * cellSize;
      let y = (boardSize - e.row.charCodeAt(0) + "0".charCodeAt(0)) * cellSize;
      ctx.fillText("F", x, y);
    });

    ctx.restore();
  }
}
