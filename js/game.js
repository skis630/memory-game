class Game {
    constructor(rows, cols) {
        this.board = new Board(rows, cols);
        this.clickedCardsCount = 0; 
        this.pairClicked = []; //Used to track every pair of cards which are clicked one after the
                              //the other
        this.cardsShown = 0;
    }

    showCardImg(x, y) {
        let currentCard = this.board.board[x][y];
        let img = "";

        if (currentCard.hidden) {
            img = currentCard.cardImg;
            this.clickedCardsCount++;
            this.pairClicked.push(currentCard);
        }

        return img;
    }

    toggleHidden(x, y) {
        let currentCard = this.board.board[x][y];

        if (currentCard.hidden) {
            currentCard.hidden = false;
        } else {
            currentCard.hidden = true;
        }
    }
    
    checkIfMatch(img1, img2) {
        if (img1 != img2) {
            return true;
        } else {
            this.cardsShown += 2;
        }
    }
    
    checkIfWon(rows, cols) {
        if (this.cardsShown == rows * cols) {
            return true;
        }
    }
}
