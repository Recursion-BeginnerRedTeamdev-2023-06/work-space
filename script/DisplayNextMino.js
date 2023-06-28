import { TetroMino } from "./TetroMino.js";


class DisplayNextMino {
    constructor() {
        this.canvas = document.getElementById("next-mino-canvas");
        this.context = this.canvas.getContext("2d");
        this.canvas.height = TetroMino.BLOCK_SIZE*4;
        this.canvas.width = TetroMino.BLOCK_SIZE*4;
        this.tetro_x = 0;
        this.tetro_y = 0;
    }

    static displayMino(next_mino){
        new DisplayNextMino().drawField(next_mino);
    }

    drawField(next_mino){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
        for(let y=0;y<TetroMino.MINO_SIZE;y++){
            for(let x=0;x<TetroMino.MINO_SIZE;x++){
                if(next_mino["shape"][y][x]){
                this.drawBlock(this.tetro_x+x, this.tetro_y+y, next_mino["color"]);
                }
            }
        }
    }

    drawBlock(x, y, color) {
        let position_x = x * TetroMino.BLOCK_SIZE;
        let position_y = y * TetroMino.BLOCK_SIZE;
    
        this.context.fillStyle = color;
        this.context.fillRect(position_x, position_y, TetroMino.BLOCK_SIZE, TetroMino.BLOCK_SIZE);
    
        this.context.strokeStyle = "black";
        this.context.strokeRect(position_x, position_y, TetroMino.BLOCK_SIZE, TetroMino.BLOCK_SIZE);
    }
}

export { DisplayNextMino }
