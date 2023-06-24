class TetroMino {
  static BLOCK_SIZE = 30;
  static MINO_INFO = {
    "棒形": [ [0, 0, 0, 0], [1, 1, 1, 1],[0, 0, 0, 0], [0, 0, 0, 0], "red" ],
    "正方形": [ [0, 0, 0, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0], "blue" ],
    "S字": [ [0, 0, 0, 0] , [0, 1, 1, 0] , [1, 1, 0, 0] , [0, 0, 0, 0], "green" ],
    "Z字": [ [0, 0, 0, 0], [1, 1, 0, 0], [0, 1, 1, 0], [0, 0, 0, 0], "orange" ],
    "J字": [ [0, 0, 1, 0] , [0, 0, 1, 0] , [0, 1, 1, 0] , [0, 0, 0, 0], "brown" ],
    "L字": [ [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 1, 0], [0, 0, 0, 0], "pink" ],
    "T字": [ [0, 1, 0, 0], [0, 1, 1, 0], [0, 1, 0, 0], [0, 0, 0, 0], "silver" ]
  };
  static MINO_SIZE = 4;

  /**
   * @param {shapeType(Type=String)} pattern 棒形/正方形/S字/Z字/J字/L字/T字
   * @returns {Array} 指定された形を2次元配列形式で返す。
   */
  static getShape(shapeType) {
    return this.MINO_INFO[shapeType];
  }

  /** @returns {Array} ランダムで指定された形を2次元配列形式で返す。*/
  static getRandomMinoType() {
    const SHAPE_PATTERN = ["棒形", "正方形", "S字", "Z字", "J字", "L字", "T字"];
    let randomShapeType = Math.floor(Math.random() * SHAPE_PATTERN.length);

    return this.getShape(SHAPE_PATTERN[randomShapeType]);
  }

  /**
   * @param {tetro} 回転させたいテトロミノ。
   * @returns {Array} 回転させた形を2次元配列形式で返す。
   */
  static rotate(tetro){
    let rotateTetro = [];

    for(let y = 0; y < this.MINO_SIZE; y++) {
      rotateTetro[y] = [];
      for(let x = 0; x < this.MINO_SIZE; x++){
        rotateTetro[y][x] = tetro[this.MINO_SIZE-x-1][y];
      }
    }
    return rotateTetro;
  }
}

export { TetroMino }
