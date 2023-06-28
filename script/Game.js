import { PlayArea } from './PlayArea.js';
// import { Score } from './Score.js';
import { TetroMino } from './TetroMino.js';

// PlayAreaクラスのフィールド描画
let playArea = new PlayArea(20, 10);

var button = document.getElementById("start-button");
button.addEventListener("click", start);

function start(){ 
  playArea.start();
}

document.addEventListener('keydown', function(e) {
  if(playArea.isGameOver) return;
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