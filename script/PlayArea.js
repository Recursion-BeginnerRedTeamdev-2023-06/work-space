import { DisplayNextMino } from "./DisplayNextMino.js";
import { TetroMino } from "./TetroMino.js";
import { Score } from "./Score.js"


class PlayArea {
  constructor(height, width){
    this.height = height;
    this.width = width;
    this.field = [];
    this.canvas = document.getElementById("play-canvas");
    this.context = this.canvas.getContext("2d");
    this.canvas.height = TetroMino.BLOCK_SIZE*this.height;
    this.canvas.width = TetroMino.BLOCK_SIZE*this.width;
    this.canvas.style.border = "4px solid #555";
  }

  start(){
    this.gameSpeed = 1000;
    this.isGameOver = false;
    this.tetro_x = this.width/2 - TetroMino.MINO_SIZE/2;
    this.tetro_y = 0;

    this.FieldInit();
    this.currentMino = TetroMino.getRandomMinoType();
    this.nextMino = TetroMino.getRandomMinoType();
    this.dropMinoLoop();
    DisplayNextMino.displayMino(this.nextMino);
    
    this.score = new Score();
    this.score.displayScore(); // 初期値のスコアを表示
  }

  changeDifficulty() {
    if (this.score.value > 0 && this.score.value % 100 === 0) {
      this.gameSpeed *= 0.5;
      if (this.gameSpeed < 0) {
        this.gameSpeed = 0;
      }
    }
  }
      
  drawField(){
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for(let y=0;y<this.height;y++){
      for(let x=0;x<this.width;x++){
        if(this.field[y][x]){
          this.drawBlock(x, y, this.field[y][x]);            
        }
      }
    }

    for(let y=0;y<TetroMino.MINO_SIZE;y++){
      for(let x=0;x<TetroMino.MINO_SIZE;x++){
        if(this.currentMino["shape"][y][x]){
          this.drawBlock(this.tetro_x+x, this.tetro_y+y, this.currentMino["color"]);
        }
      }
    }

    if(this.isGameOver){
      let s = "GAME OVER";
      this.context.font = "40px 'MSゴシック'";
      let w = this.context.measureText(s).width;
      let x = this.canvas.width/2 - w/2;
      let y = this.canvas.height/2 - 20;
      this.context.lineWidth = 4;
      this.context.strokeText(s,x,y);
      this.context.fillStyle = "white";
      this.context.fillText(s,x,y);
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

  fixMino(){
    for(let y=0;y< TetroMino.MINO_SIZE;y++){
      for(let x=0;x< TetroMino.MINO_SIZE;x++){
        if(this.currentMino["shape"][y][x]){
          this.field[this.tetro_y + y][this.tetro_x + x] = this.currentMino["color"];  
        }
      }
    }
  }

  isContact(next_x, next_y, ntetro) {
    if(ntetro == undefined) ntetro = this.currentMino;
    for (let y = 0; y < TetroMino.MINO_SIZE; y++) {
      for (let x = 0; x < TetroMino.MINO_SIZE; x++) {
        let new_position_x = this.tetro_x + next_x + x;
        let new_position_y = this.tetro_y + next_y + y;
        if (ntetro["shape"][y][x]) {
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

  dropMino() {
    if(this.isGameOver) return;

    if (this.isContact(0, 1)) this.tetro_y++;
    else {
      const INIT_TETRO_X = this.width/2 - TetroMino.MINO_SIZE/2;
      const INIT_TETRO_Y = 0;
      
      this.fixMino();
      this.currentMino = this.next_mino;      
      this.tetro_x = INIT_TETRO_X;
      this.tetro_y = INIT_TETRO_Y;
  
      this.deleteMino(); // テトリスの行を消去する
      this.currentMino = this.nextMino;
      this.nextMino = TetroMino.getRandomMinoType();
      if (!this.isContact(0, 0)) this.isGameOver = true;
    }

    this.drawField();
    DisplayNextMino.displayMino(this.nextMino);
  
  }

  deleteMino() {
    let linesDeleted = 0; // 削除されたラインの数をカウントする変数

    for (let y = this.height - 1; y >= 0; y--) {
      let flag = true;
      for (let x = 0; x < this.width; x++) {
        if (!this.field[y][x]) {
          flag = false;
          break;
        }
      }
      if (flag) {       
        for (let ny = y; ny > 0; ny--) {
          for (let nx = 0; nx < this.width; nx++) {
            this.field[ny][nx] = this.field[ny - 1][nx];
          }
        }
        for (let nx = 0; nx < this.width; nx++) {
          this.field[0][nx] = 0;
        }
        // もう一度同じ行をチェックするためにインデックスを増やす
        y++;

        linesDeleted++; // ラインが削除されたのでカウントを増やす

        this.score.line = linesDeleted
        this.score.displayScore();
        this.changeDifficulty();
      }
    }
  }
  
  dropMinoLoop() {
    this.dropMino();
    setTimeout(() => {
      this.dropMinoLoop();
    }, this.gameSpeed);
  }

  rotateMino(){
    this.currentMino = TetroMino.rotate(this.currentMino);
  }
}

export { PlayArea };