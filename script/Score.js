class Score {
    constructor(line) {
      const BASE_SCORE = 100;       // 1ライン消されると加算されるスコア
      const BASE_BONUS = 2;        // ボーナスの乗数
      const INIT_SCORE = 0;          // 初期値のスコア
      this.line = line;
      this.BASE_SCORE = BASE_SCORE;
      this.BASE_BONUS = BASE_BONUS;
      this.INIT_SCORE = INIT_SCORE;
    }
  
    calculateScore() {
        if (this.line === 1) {
            this.INIT_SCORE += this.BASE_SCORE; // 消えたライン数が1の時はベースの得点のみが加算される
          } else {
            this.INIT_SCORE += (this.BASE_SCORE * this.line) + (this.BASE_SCORE * Math.pow(this.BASE_BONUS, this.line - 1));
          } // 一度に複数のラインを消すと、ラインの数に応じてボーナスも加算される
          return this.INIT_SCORE;
    }
    displayScore() {
      let canvas = document.getElementById("canvas");
      let context = canvas.getContext("2d");
  
      let scoreText = "SCORE";
      context.fillText(scoreText, 410, 300);
  
      let scoreValue = "" + this.calculateScore();
      context.fillText(scoreValue, 410, 340);
    }
  }