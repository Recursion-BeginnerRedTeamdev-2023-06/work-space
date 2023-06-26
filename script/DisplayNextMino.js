class DisplayNextMino {
    constructor() {
        this.canvas = document.getElementById("next-mino-canvas");
        this.context = this.canvas.getContext("2d");
    }

    displayMino(){
        this.holdNextMino();
        // TODO: 表示したMino情報のオブジェクトをPlyaAreaに渡す
        // 方法は関数？インスタンスの更新？
    }

    holdNextMino(){
        // TODO: 次に落下するMino情報を維持する。
    }
}

export { DisplayNextMino }
