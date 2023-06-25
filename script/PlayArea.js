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
    this.FieldInit();
  }

  display(){}
      
  drawField(){
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

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

  isContact(next_x, next_y) {
    for (let y = 0; y < TetroMino.MINO_SIZE; y++) {
      for (let x = 0; x < TetroMino.MINO_SIZE; x++) {
        let new_position_x = this.tetro_x + next_x + x;
        let new_position_y = this.tetro_y + next_y + y;
        if (this.tetroMino["shape"][y][x]) {
          if (
            new_position_y < 0 || // 上壁に当たった場合
            new_position_y >= this.height || // 下壁に当たった場合
            this.field[new_position_y][new_position_x] ||
            new_position_x < 0 ||
            new_position_x >= this.width
          ) {
            return false;
          }
        }
      }
    }
    return true;
  }

  move(){}

  dropMino(){}

  deleteMino(){
    for(let y = 0;y < this.height ;y ++){
      let flag = true;
      for(let x = 0;x < this.width ;x ++){
        if(!this.field[y][x]) {
          flag = false;
          break;
        }
      }
      if(flag == true){
        for(let ny = y; ny > 0;ny --){
          for(let nx = 0;nx < this.height ;nx ++){
            this.field[ny][nx] = this.field[ny - 1][nx];
          }
        }
      }
    }
  }

}

export { PlayArea }
