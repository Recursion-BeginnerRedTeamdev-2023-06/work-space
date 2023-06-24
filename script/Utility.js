class Utility {
    /**
     * TODO = 相談する。ランダムでMinoを生成している。かつ、本関数は描画=プレイエリアクラスのdrawのように感じた。このクラスで良いか再検討が必要に感じました。
     * @param {TetroMino} 描画したいMinoのオブジェクト。
     * @param {MINO_SIZE} TetroMinoクラスで指定されたミノサイズ
     * @param {BLOCK_SIZE} TetroMinoクラスで指定されたブロックサイズ
     */
    static createMino(tetroMino, MINO_SIZE, BLOCK_SIZE) {
      const NON_BLOCKS = 0;
      const MINO_SHAPE = tetroMino["shape"];
      const MINO_COLOR = tetroMino["color"];
      
      let canvas = document.getElementById("canvas");
      let context = canvas.getContext("2d");
  
      for (let y = 0; y < MINO_SIZE; y++) {
        for (let x = 0; x < MINO_SIZE; x++) {
          if (NON_BLOCKS != MINO_SHAPE[y][x]) {
            let position_x = x * BLOCK_SIZE;
            let position_y = y * BLOCK_SIZE;
      
            context.fillStyle = MINO_COLOR;
            context.fillRect(position_x, position_y, BLOCK_SIZE, BLOCK_SIZE);
      
            context.strokeStyle = "black";
            context.strokeRect(position_x, position_y, BLOCK_SIZE, BLOCK_SIZE);
          }
        }
      }
  
    }
  
  }
  
  export { Utility };
  