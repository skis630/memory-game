class Board {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.cardImgs = this.createCardClasses(rows,cols); //Generating classes to style the cards images
        this.board = this.createGameBoard(rows, cols);
    }

    //Generate class name to style the cards with the images (the hidden face)
    createCardClasses(rows, cols) {
        let arrLen = rows * cols / 2;
        let cardSelectionArr = []
        for (let i = 0; i < arrLen; i++) {
            cardSelectionArr.push(`img${i}`);
            cardSelectionArr.push(`img${i}`);
        }

        return cardSelectionArr;
    }

    //random allocation of cards on the board
    createGameBoard(rows, cols) {
        let rowArr = [];
        let counter = rows * cols - 1;
        let imgs = this.createCardClasses(rows, cols);
        for (let i = 0; i < rows; i++) {
            let colArr = [];
            for (let j = 0; j < cols; j++) {
                let randIndex = Math.round(Math.random() * counter);
                colArr.push(new Card(i, j, imgs[randIndex]));
                imgs.splice(randIndex, 1);
                counter--;    
            }
            rowArr.push(colArr);
        }

        return rowArr;
    }
}