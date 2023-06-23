import { Utility } from './Utility.js';

class TetroMino {
class TetroMino {
  #MINO_SHAPE = {
    "棒形": [ [0, 0, 0, 0], [1, 1, 1, 1],[0, 0, 0, 0], [0, 0, 0, 0] ],
    "正方形": [ [0, 0, 0, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0] ],
    "S字": [ [0, 0, 0, 0] , [0, 1, 1, 0] , [1, 1, 0, 0] , [0, 0, 0, 0]  ],
    "Z字": [ [0, 0, 0, 0], [1, 1, 0, 0], [0, 1, 1, 0], [0, 0, 0, 0] ],
    "J字": [ [0, 0, 1, 0] , [0, 0, 1, 0] , [0, 1, 1, 0] , [0, 0, 0, 0]  ],
    "L字": [ [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 1, 0], [0, 0, 0, 0] ],
    "T字": [ [0, 1, 0, 0], [0, 1, 1, 0], [0, 1, 0, 0], [0, 0, 0, 0] ]
  };

  static BLOCK_SIZE = 30;
  static MINO_SIZE = 4;

  /** @returns {Array} ランダムで指定された形を2次元配列形式で返す。*/
  getRandomMinoType() {
    const SHAPE_PATTERN = ["棒形", "正方形", "S字", "Z字", "J字", "L字", "T字"];
    let randomShapeType = Math.floor(Math.random() * SHAPE_PATTERN.length);
    return this.getShape(SHAPE_PATTERN[randomShapeType]);
  }

  /**
   * @param {shapeType(Type=String)} pattern 棒形/正方形/S字/Z字/J字/L字/T字
   * @returns {Array} 指定された形を2次元配列形式で返す。
   */
  getShape(shapeType) {
    return this.#MINO_SHAPE[shapeType];
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
