class Score {
  constructor() {
    const BASE_SCORE = 100;       // 1ライン消されると加算されるスコア
    const BASE_BONUS = 2;        // ボーナスの乗数
    let value = 0;          // 初期値のスコア
    let line = 0;
    this.line = line;
    this.BASE_SCORE = BASE_SCORE;
    this.BASE_BONUS = BASE_BONUS;
    this.value = value;
  }

  calculateScore() {
      if (this.line === 0){
          return this.value;
      }
      else if (this.line === 1) {
          this.value += this.BASE_SCORE; // 消えたライン数が1の時はベースの得点のみが加算される
          return this.value
      } 
      else {
          this.value += (this.BASE_SCORE * this.line) + (this.BASE_SCORE * Math.pow(this.BASE_BONUS, this.line - 1));
      } // 一度に複数のラインを消すと、ラインの数に応じてボーナスも加算される
        return this.value;
  }

  displayScore() {
    let scoreValueElement = document.getElementById("score-value");
    let scoreValue = this.calculateScore();
    
    scoreValueElement.textContent = scoreValue;
    this.value = scoreValue;
  }
}

export { Score };