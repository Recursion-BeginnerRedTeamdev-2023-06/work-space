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
let palyArea = new PlayArea(20, 10, mino);
palyArea.drawField();

document.addEventListener('keydown',function(e){
switch(e.keyCode){
        case 37:
        // if(checkMove(-1,0,palyArea,tetro["shape"])) palyArea.tetro_x--;
        palyArea.tetro_x--;
        break;
        case 38:
        // if(checkMove(0,-1,palyArea,tetro["shape"])) palyArea.tetro_y--;
        palyArea.tetro_y--;
        break;
        case 39:
        // if(checkMove(1,0,palyArea,tetro["shape"])) palyArea.tetro_x++;
        palyArea.tetro_x++;
        break;
        case 40:
        // if(checkMove(0,1,palyArea,tetro["shape"])) palyArea.tetro_y++;
        palyArea.tetro_y++;
        break;
        case 32:
        break;   
    }
palyArea.drawField();
// palyArea.context.clearRect(0, 0, palyArea.canvas.height, palyArea.canvas.width);
});
