import { PlayArea } from './PlayArea.js';
import { TetroMino } from './TetroMino.js';


class Game {
  constructor(){
    this.PLAY_AREA_HEIGHT = 20;
    this.PLAY_AREA_WIDTH = 10;
    this.playArea = new PlayArea(this.PLAY_AREA_HEIGHT, this.PLAY_AREA_WIDTH);
    this.music = new Audio();
    this.music_name = "Tetris.mp3";
    
    this.startRetryButton = document.getElementById("start-retry-button");
    this.restartStopButton = document.getElementById("restart-stop-button");
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

    this.playArea.start();
    this.playBgm(this.music, this.music_name);
    
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
    this.playArea = new PlayArea(this.PLAY_AREA_HEIGHT, this.PLAY_AREA_WIDTH);

    this.playArea.start();
    this.playBgm(this.music, this.music_name);
    
    this.startRetryButton.disabled = true;
    this.restartStopButton.disabled = false;
  
    this.checkGameOver();
  }

  toggleGameRestartAndStop = () => {
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
      requestAnimationFrame(() => this.checkGameOver());
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
    this.playArea.context.clearRect(0, 0, this.playArea.canvas.width, this.playArea.canvas.height);
  }
}


const GAME = new Game();
GAME.startRetryButton.addEventListener("click", GAME.gameStart.bind(GAME));
GAME.restartStopButton.addEventListener("click", GAME.toggleGameRestartAndStop.bind(GAME));

document.addEventListener('keydown', (e) => {
  if (GAME.playArea.isGameOver) return;

  if (GAME.playArea.isPaused) return;

  switch (e.keyCode) {
    case 37: // 左矢印キー
      if (GAME.playArea.isContact(-1, 0)) {
        GAME.playArea.tetro_x--;
      }
      break;
    case 38: // 上矢印キー
      while (GAME.playArea.isContact(0, 1)) {
        GAME.playArea.tetro_y++;
      }
      break;
    case 39: // 右矢印キー
      if (GAME.playArea.isContact(1, 0)) {
        GAME.playArea.tetro_x++;
      }
      break;
    case 40: // 下矢印キー
      if (GAME.playArea.isContact(0, 1)) {
        GAME.playArea.tetro_y++;
      }
      break;
    case 32: // スペースキー
      let tetro = TetroMino.rotate(GAME.playArea.currentMino);
      if (GAME.playArea.isContact(0, 0, tetro)) {
        GAME.playArea.rotateMino();
      }
      break;
  }
  GAME.playArea.drawField();
});
