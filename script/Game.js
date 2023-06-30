import { PlayArea } from './PlayArea.js';
import { TetroMino } from './TetroMino.js';

// let startRetryButton = document.getElementById("start-retry-button");
// let restartStopButton = document.getElementById("restart-stop-button");
// let isGameRunning = false;

// startRetryButton.addEventListener("click", gameStart);
// restartStopButton.addEventListener("click", toggleGameRestartAndStop);

// startRetryButton.disabled = false;
// restartStopButton.disabled = true;

// const PLAY_AREA_HEIGHT = 20;
// const PLAY_AREA_WIDTH = 10;
// let playArea = new PlayArea(PLAY_AREA_HEIGHT, PLAY_AREA_WIDTH);

// let music = new Audio();
// let music_name = "Tetris.mp3";

class Game {
  constructor(playArea, music_name){
    this.playArea = playArea;
    this.music = new Audio();
    this.music_name = music_name;
    
    this.startRetryButton = document.getElementById("start-retry-button");
    this.restartStopButton = document.getElementById("restart-stop-button");
    this.startRetryButton.addEventListener("click", this.gameStart);
    this.restartStopButton.addEventListener("click", this.toggleGameRestartAndStop);
    this.startRetryButton.disabled = false;
    this.restartStopButton.disabled = true;
        
    this.isGameRunning = false;
  }

  gameStart() {
    let isRetryGame = this.playArea && this.playArea.isGameOver;

    if(isRetryGame) {
      // GameOverからスタートした場合
      this.retryGame();
      return;
    }

    playArea.start();
    this.playBgm(music, music_name);
    
    this.startRetryButton.disabled = true;
    this.restartStopButton.disabled = false;

    this.checkGameOver();
  }

  retryGame() {
    this.clearGameOverMessage();
    // GameOverになった場合、インスタンスを削除して新たに作成する。
    this.playArea = null;
    this.music = null;
    this.music = new Audio();
    this.playArea = new PlayArea(PLAY_AREA_HEIGHT, PLAY_AREA_WIDTH);

    this.playArea.start();
    this.playBgm(music, music_name);
    
    this.startRetryButton.disabled = true;
    this.restartStopButton.disabled = false;
  
    this.checkGameOver();
  }

  toggleGameRestartAndStop() {
    if (this.isGameRunning) this.gameReStart();
    else this.gameStop();
  }

  gameReStart() {
    this.playArea.start();
    this.restartStopButton.innerHTML = "<h3>GAME<br>STOP</h3>";
    this.isGameRunning = false;
    this.music.play();
  }

  gameStop(){ 
    if (this.playArea) this.playArea.stop();
    this.restartStopButton.innerHTML = "<h3>GAME<br>RESTART</h3>";
    this.isGameRunning = true;
    this.music.pause();
  }

  playBgm() {
    this.music.src = `./music/${this.music_name}`;  // BGM ファイルのパスを設定
    this.music.volume = 0.05;
    this.music.loop = true;  // BGM をループ再生するように設定
    this.music.addEventListener('ended', function() {
      // BGM再生が終了したら再度再生する
      this.music.currentTime = 0;
      this.music.play();
    });
    this.music.play();  // BGM を再生
  }

  checkGameOver() {
    if (this.playArea.isGameOver) {
      this.drawGameOverMessage();
      this.gameReset();
    }
    else {
      requestAnimationFrame(this.checkGameOver);
    }
  }

  gameReset() {
    this.playArea.stop();
    this.music.pause();
    this.startRetryButton.innerHTML = "<h3>GAME<br>RETRY</h3>";
    this.restartStopButton.innerHTML = "<h3>GAME<br>STOP</h3>";
    this.isGameRunning = false;
    this.startRetryButton.disabled = false;
    this.restartStopButton.disabled = true;
  }

  drawGameOverMessage() {
    let s = "GAME OVER";
    let x = this.playArea.canvas.width / 2;
    let y = this.playArea.canvas.height / 2;
    
    this.playArea.context.font = "40px 'MSゴシック'";
    this.playArea.context.lineWidth = 4;
    this.playArea.context.textAlign = "center"; // テキストを中央揃えに設定
    this.playArea.context.textBaseline = "middle"; // テキストのベースラインを中央に設定
    this.playArea.context.strokeText(s, x, y);
    this.playArea.context.fillStyle = "white";
    this.playArea.context.fillText(s, x, y);
  }

  clearGameOverMessage() {
    this.playArea.context.clearRect(0, 0, playArea.canvas.width, playArea.canvas.height);
  }

  document.addEventListener('keydown', function(e) {
    if (this.playArea.isGameOver) return;
    switch (e.keyCode) {
      case 37: // 左矢印キー
        if (this.playArea.isContact(-1, 0)) {
          this.playArea.tetro_x--;
        }
        break;
      case 38: // 上矢印キー
        while (this.playArea.isContact(0, 1)) {
          this.playArea.tetro_y++;
        }
        break;
      case 39: // 右矢印キー
        if (this.playArea.isContact(1, 0)) {
          this.playArea.tetro_x++;
        }
        break;
      case 40: // 下矢印キー
        if (this.playArea.isContact(0, 1)) {
          this.playArea.tetro_y++;
        }
        break;
      case 32: // スペースキー
        let tetro = TetroMino.rotate(this.playArea.currentMino);
        if (this.playArea.isContact(0, 0, tetro)) {
          this.playArea.rotateMino();
        }
        break;
    }
    this.playArea.drawField();
  });
}

const PLAY_AREA_HEIGHT = 20;
const PLAY_AREA_WIDTH = 10;
let playArea = new PlayArea(this.PLAY_AREA_HEIGHT, this.PLAY_AREA_WIDTH);
let music_name = "Tetris.mp3";

const GAME = new Game(playArea, music_name);
Game.gameStart();

// let startRetryButton = document.getElementById("start-retry-button");
// let restartStopButton = document.getElementById("restart-stop-button");
// let isGameRunning = false;

// startRetryButton.addEventListener("click", Game.gameStart);
// restartStopButton.addEventListener("click", Game.toggleGameRestartAndStop);

// startRetryButton.disabled = false;
// restartStopButton.disabled = true;

// function gameStart() {
//   let isRetryGame = playArea && playArea.isGameOver;

//   if(isRetryGame) {
//     // GameOverからスタートした場合
//     retryGame();
//     return;
//   }

//   playArea.start();
//   playBgm(music, music_name);
  
//   startRetryButton.disabled = true;
//   restartStopButton.disabled = false;

//   checkGameOver();
// }

// function retryGame() {
//     clearGameOverMessage();
//     // GameOverになった場合、インスタンスを削除して新たに作成する。
//     playArea = null;
//     music = null;
//     music = new Audio();
//     playArea = new PlayArea(PLAY_AREA_HEIGHT, PLAY_AREA_WIDTH);

//     playArea.start();
//     playBgm(music, music_name);
    
//     startRetryButton.disabled = true;
//     restartStopButton.disabled = false;
  
//     checkGameOver();
// }

// function toggleGameRestartAndStop() {
//   if (isGameRunning) gameReStart();
//   else gameStop();
// }

// function gameReStart() {
//   playArea.start();
//   restartStopButton.innerHTML = "<h3>GAME<br>STOP</h3>";
//   isGameRunning = false;
//   music.play();
// }

// function gameStop(){ 
//   if (playArea) playArea.stop();
//   restartStopButton.innerHTML = "<h3>GAME<br>RESTART</h3>";
//   isGameRunning = true;
//   music.pause();
// }

// function playBgm(music, music_name) {
//   music.src = `./music/${music_name}`;  // BGM ファイルのパスを設定
//   music.volume = 0.05;
//   music.loop = true;  // BGM をループ再生するように設定
//   music.addEventListener('ended', function() {
//     // BGM再生が終了したら再度再生する
//     music.currentTime = 0;
//     music.play();
//   });
//   music.play();  // BGM を再生
// }

// function checkGameOver() {
//   if (playArea.isGameOver) {
//     drawGameOverMessage();
//     gameReset();
//   }
//   else {
//     requestAnimationFrame(checkGameOver);
//   }
// }

// function gameReset() {
//   playArea.stop();
//   music.pause();
//   startRetryButton.innerHTML = "<h3>GAME<br>RETRY</h3>";
//   restartStopButton.innerHTML = "<h3>GAME<br>STOP</h3>";
//   isGameRunning = false;
//   startRetryButton.disabled = false;
//   restartStopButton.disabled = true;
// }

// function drawGameOverMessage() {
//   let s = "GAME OVER";
//   let x = playArea.canvas.width / 2;
//   let y = playArea.canvas.height / 2;
  
//   playArea.context.font = "40px 'MSゴシック'";
//   playArea.context.lineWidth = 4;
//   playArea.context.textAlign = "center"; // テキストを中央揃えに設定
//   playArea.context.textBaseline = "middle"; // テキストのベースラインを中央に設定
//   playArea.context.strokeText(s, x, y);
//   playArea.context.fillStyle = "white";
//   playArea.context.fillText(s, x, y);
// }

// function clearGameOverMessage() {
//   playArea.context.clearRect(0, 0, playArea.canvas.width, playArea.canvas.height);
// }

// document.addEventListener('keydown', function(e) {
//   if (playArea.isGameOver) return;
//   switch (e.keyCode) {
//     case 37: // 左矢印キー
//       if (playArea.isContact(-1, 0)) {
//         playArea.tetro_x--;
//       }
//       break;
//     case 38: // 上矢印キー
//       while (playArea.isContact(0, 1)) {
//         playArea.tetro_y++;
//       }
//       break;
//     case 39: // 右矢印キー
//       if (playArea.isContact(1, 0)) {
//         playArea.tetro_x++;
//       }
//       break;
//     case 40: // 下矢印キー
//       if (playArea.isContact(0, 1)) {
//         playArea.tetro_y++;
//       }
//       break;
//     case 32: // スペースキー
//       let tetro = TetroMino.rotate(playArea.currentMino);
//       if (playArea.isContact(0, 0, tetro)) {
//         playArea.rotateMino();
//       }
//       break;
//   }
//   playArea.drawField();
// });
