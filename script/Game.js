import { PlayArea } from './PlayArea.js';
// import { Score } from './Score.js';
import { TetroMino } from './TetroMino.js';
import { Utility } from './Utility.js';


let mino = TetroMino.getRandomMinoType();

// 回転させる
// mino =TetroMino.rotate(mino);

// 現状は描画も行っている
// Utility.createMino(mino,TetroMino.MINO_SIZE,TetroMino.BLOCK_SIZE);

// let score = new Score();

// // lineが消える処理の後に記述する想定
// score.line = 2;
// score.displayScore();

// PlayAreaクラスのフィールド描画
let palyArea = new PlayArea(10, 20);
palyArea.drawField();
