import { TetroMino } from "./TetroMino.js";


class PlayArea {
  constructor(height, width, tetroMino){
    this.height = height;
    this.width = width;
    this.tetroMino = tetroMino;
    this.field = [];
    this.tetro_x = this.width/2 - TetroMino.MINO_SIZE/2;;
    this.tetro_y = 0;
    this.canvas = document.getElementById("canvas");
    this.context = this.canvas.getContext("2d");
    this.canvas.height = TetroMino.BLOCK_SIZE*this.height;
    this.canvas.width = TetroMino.BLOCK_SIZE*this.width;
    this.canvas.style.border = "4px solid #555";
  }

  display(){}
      
  drawField(){
    this.FieldInit();
    this.context.clearRect(0, 0, this.canvas.height, this.canvas.width);

    for(let y=0;y<this.height;y++){
      for(let x=0;x<this.width;x++){
        if(this.field[y][x]){
          this.drawBlock(x, y, this.tetroMino["color"]);            
        }
      }
    }

    for(let y=0;y<TetroMino.MINO_SIZE;y++){
      for(let x=0;x<TetroMino.MINO_SIZE;x++){
        if(this.tetroMino["shape"][y][x]){
          this.drawBlock(this.tetro_x+x, this.tetro_y+y, this.tetroMino["color"]);
        }
      }
    }
  }

  FieldInit() {
    for(let y=0;y<this.height;y++){
      this.field[y] = [];
      for(let x=0;x<this.width;x++){
          this.field[y][x] = 0;
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

  fixMino(){}

  isContact(){}

  move(){}

  dropMino(){}

  deleteMino(){}

}

export { PlayArea }
