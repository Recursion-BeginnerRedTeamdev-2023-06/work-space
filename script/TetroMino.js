class TetroMino {
  static BLOCK_SIZE = 30;
  static MINO_INFO = {
      "棒形": {
        "shape":[ [0, 0, 0, 0], [1, 1, 1, 1],[0, 0, 0, 0], [0, 0, 0, 0] ],
        "color": "red"},
      "正方形": {
        "shape":[ [0, 0, 0, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0] ],
        "color": "blue"},
      "S字": {
        "shape": [ [0, 0, 0, 0] , [0, 1, 1, 0] , [1, 1, 0, 0] , [0, 0, 0, 0] ],
        "color": "green"},
      "Z字": {
        "shape":[ [0, 0, 0, 0], [1, 1, 0, 0], [0, 1, 1, 0], [0, 0, 0, 0] ],
        "color": "orange"},
      "J字": {
        "shape": [ [0, 0, 1, 0] , [0, 0, 1, 0] , [0, 1, 1, 0] , [0, 0, 0, 0] ],
        "color": "brown"},
      "L字": { 
        "shape": [ [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 1, 0], [0, 0, 0, 0] ], 
        "color": "pink"},
      "T字": {
        "shape": [ [0, 1, 0, 0], [0, 1, 1, 0], [0, 1, 0, 0], [0, 0, 0, 0] ],
        "color": "silver"} 
    };
  static MINO_SIZE = 4;

  /**
   * @param {shapeType(Type=String)} pattern 棒形/正方形/S字/Z字/J字/L字/T字
   * @returns {Array} 指定された形を2次元配列形式で返す。
   */
  static getShapeInfo(shapeType) {
    return this.MINO_INFO[shapeType];
  }

  /** @returns {Array} ランダムで指定された形を2次元配列形式で返す。*/
  static getRandomMinoType() {
    const SHAPE_PATTERN = ["棒形", "正方形", "S字", "Z字", "J字", "L字", "T字"];
    let randomShapeType = Math.floor(Math.random() * SHAPE_PATTERN.length);

    return this.MINO_INFO[SHAPE_PATTERN[randomShapeType]];
  }

  /**
   * @param {tetro(Type=Array)} 回転させたいテトロミノ。
   * @returns {Array} 回転させた形を2次元配列形式で返す。
   */
  static rotate(tetro){
    const SHAPE_INFO = tetro["shape"];
    let rotateTetro = [];

    for(let y = 0; y < this.MINO_SIZE; y++) {
      rotateTetro[y] = [];
      for(let x = 0; x < this.MINO_SIZE; x++){
        rotateTetro[y][x] = SHAPE_INFO[this.MINO_SIZE-x-1][y];
      }
    }

    return { 
      "shape": rotateTetro,
      "color": tetro["color"]
    };
  }
}

export { TetroMino }
