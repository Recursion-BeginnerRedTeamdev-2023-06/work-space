import { PlayArea } from './PlayArea.js';
// import { Score } from './Score.js';
import { TetroMino } from './TetroMino.js';


let mino = TetroMino.getRandomMinoType();

// 回転させる
// mino =TetroMino.rotate(mino);

// 現状は描画も行っている
// Utility.createMino(mino,TetroMino.MINO_SIZE,TetroMino.BLOCK_SIZE);

// let score = new Score();

// // lineが消える処理の後に記述する想定
// score.line = 2;
// score.displayScore();

// PlayAreaクラスのフィールド描画
let playArea = new PlayArea(20, 10, mino);
playArea.drawField()

document.addEventListener('keydown', function(e) {
    switch (e.keyCode) {
      case 37: // 左矢印キー
        if (playArea.isContact(-1, 0)) {
          playArea.tetro_x--;
        }
        break;
      case 38: // 上矢印キー
        // if (playArea.isContact(0, -1)) {
        //   playArea.tetro_y--;
        // }
        break;
      case 39: // 右矢印キー
        if (playArea.isContact(1, 0)) {
          playArea.tetro_x++;
        }
        break;
      case 40: // 下矢印キー
        if (playArea.isContact(0, 1)) {
          playArea.tetro_y++;
        }
        break;
      case 32: // スペースキー
        let tetro = TetroMino.rotate(playArea.currentMino);
        if (playArea.isContact(0, 0, tetro)) {
          playArea.rotateMino();
        }
        break;
    }
  
    playArea.drawField();
  });