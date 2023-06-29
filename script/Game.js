import { PlayArea } from './PlayArea.js';
import { TetroMino } from './TetroMino.js';

let startButton = document.getElementById("start-button");
let reStartStopButton = document.getElementById("restart-stop-button");
let isGameRunning = false;

startButton.addEventListener("click", gameStart);
reStartStopButton.addEventListener("click", toggleGameRestartAndStop);

startButton.disabled = false;
reStartStopButton.disabled = true;

const PLAY_AREA_HEIGHT = 20;
const PLAY_AREA_WIDTH = 10;
let playArea = new PlayArea(PLAY_AREA_HEIGHT, PLAY_AREA_WIDTH);

const MUSIC = new Audio();
let music_name = "Tetris.mp3";

function gameStart() {
  if (playArea) playArea.stop();
  
  playArea = new PlayArea(PLAY_AREA_HEIGHT, PLAY_AREA_WIDTH);
  playArea.start();
  playBgm(MUSIC, music_name);
  
  startButton.disabled = true;
  reStartStopButton.disabled = false;
}

function toggleGameRestartAndStop() {
  if (isGameRunning) gameReStart();
  else gameStop();
}

function gameReStart() {
  playArea.start();
  reStartStopButton.innerHTML = "<h3>GAME STOP</h3>";
  isGameRunning = false;
  MUSIC.play();
}

function gameStop(){ 
  if (playArea) playArea.stop();
  reStartStopButton.innerHTML = "<h3>GAME RESTART</h3>";
  isGameRunning = true;
  MUSIC.pause();
}

function checkGameOver() {
  if (playArea.isGameOver) {
    let s = "GAME OVER";
    playArea.context.font = "40px 'MSゴシック'";
    let w = playArea.context.measureText(s).width;
    let x = playArea.canvas.width/2 - w/2;
    let y = playArea.canvas.height/2 - 20;
    playArea.context.lineWidth = 4;
    playArea.context.strokeText(s,x,y);
    playArea.context.fillStyle = "white";
    playArea.context.fillText(s,x,y);

    // clearTimeout(playArea.timerId); 
    playArea.isPaused = false;
    playArea.timerId =null;

    gameReset();
  }
  else {
    requestAnimationFrame(checkGameOver);
  }
}

function gameReset() {
  playArea.stop();
  MUSIC.pause();
  playArea = new PlayArea(PLAY_AREA_HEIGHT, PLAY_AREA_WIDTH)
  reStartStopButton.innerHTML = "<h3>GAME STOP</h3>";
  isGameRunning = false;
  startButton.disabled = false;
  reStartStopButton.disabled = true;
}

function playBgm(music, music_name) {
  music.src = `./music/${music_name}`;  // BGM ファイルのパスを設定
  music.volume = 0.05;
  music.loop = true;  // BGM をループ再生するように設定
  music.addEventListener('ended', function() {
    // BGM再生が終了したら再度再生する
    music.currentTime = 0;
    music.play();
  });
  music.play();  // BGM を再生
}

checkGameOver();

document.addEventListener('keydown', function(e) {
  if (playArea.isGameOver) return;
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
