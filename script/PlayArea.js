import { TetroMino } from "./TetroMino.js";


class PlayArea {
    #canvas = document.getElementById("canvas");
    #context = canvas.getContext("2d");

    constructor(height, width, tetroMino){
        this.height = height;
        this.width = width;
        this.tetroMino = tetroMino;
    }

    getHeight() {
        return this.height;
    }

    getWidth() {
        return this.width;
    }

    display(){}

    drawField(){
        const FIELD_COL = this.getWidth();
        const FIELD_ROW = this.getHeight();
        const SCREEN_W = TetroMino.BLOCK_SIZE*FIELD_COL;
        const SCREEN_H = TetroMino.BLOCK_SIZE*FIELD_ROW;
        const START_X = FIELD_COL/2 - TetroMino.MINO_SIZE/2;
        const START_Y = 0;

        let tetro_x = START_X;
        let tetro_y = START_Y;

        this.#canvas.height = SCREEN_H;
        this.#canvas.width = SCREEN_W;
        this.#canvas.style.border = "4px solid #555";

        let field = [];
        this.FieldInit(field);

        this.#context.clearRect(0, 0, SCREEN_W, SCREEN_H);

        let tetroMino = TetroMino.getRandomMinoType();
        for(let y=0;y<FIELD_ROW;y++){
            for(let x=0;x<FIELD_COL;x++){
              if(field[y][x]){
                this.drawBlock(x, y, tetroMino["color"]);            
              }
            }
        }

        for(let y=0;y<TetroMino.MINO_SIZE;y++){
            for(let x=0;x<TetroMino.MINO_SIZE;x++){
              if(tetroMino["shape"][y][x]){
                this.drawBlock(tetro_x+x, tetro_y+y, tetroMino["color"]);
              }
            }
        }
    }

    FieldInit(field) {
        for(let y=0;y<this.height;y++){
            field[y] = [];
            for(let x=0;x<this.width;x++){
            field[y][x] = 0;
            }
        }
    }

    drawBlock(x, y, color) {
        let position_x = x * TetroMino.BLOCK_SIZE;
        let position_y = y * TetroMino.BLOCK_SIZE;

        this.#context.fillStyle = color;
        this.#context.fillRect(position_x, position_y, TetroMino.BLOCK_SIZE, TetroMino.BLOCK_SIZE);

        this.#context.strokeStyle = "black";
        this.#context.strokeRect(position_x, position_y, TetroMino.BLOCK_SIZE, TetroMino.BLOCK_SIZE);
    }

    fixMino(){}
    
    isContact(){}
    
    move(){}
    
    dropMino(){}
    
    deleteMino(){}
}

export { PlayArea }
