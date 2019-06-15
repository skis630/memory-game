const ROWS = 3;
const COLS = 4;
let game = new Game(ROWS, COLS);

$(document).ready(function() {
    $(".card").click(function(e) {
        let target = e.target;

        let x = target.getAttribute("x");
        let y = target.getAttribute("y");

        let imgClass = game.showCardImg(x, y);

        if (game.clickedCardsCount < 2) {
             $(this).toggleClass("backcard-bg");
             $(this).toggleClass(imgClass); 
        } else if (game.clickedCardsCount == 2) {
            $(this).toggleClass("backcard-bg");
            $(this).toggleClass(imgClass); 
            let noMatch = game.checkIfMatch(game.pairClicked[0].cardImg, game.pairClicked[1].cardImg);
            if (noMatch) {
                setTimeout(function() {
                    let clickedFirst = $(`[x=${game.pairClicked[0].row}][y=${game.pairClicked[0].col}]`);
                    let clickedSecond = $(`[x=${game.pairClicked[1].row}][y=${game.pairClicked[1].col}]`);
                    clickedSecond.toggleClass("backcard-bg");
                    clickedSecond.toggleClass(imgClass); 
                    clickedFirst.toggleClass("backcard-bg");
                    clickedFirst.toggleClass(game.pairClicked[0].cardImg);
                    game.toggleHidden(game.pairClicked[0].row, game.pairClicked[0].col);
                    game.toggleHidden(game.pairClicked[1].row, game.pairClicked[1].col);
                    game.clickedCardsCount = 0;
                    game.pairClicked = [];
                }, 1500);               
            } else {
                game.clickedCardsCount = 0;
                game.pairClicked = []; 
            }
        }
    })
})