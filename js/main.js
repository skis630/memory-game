const ROWS = 3;
const COLS = 4;
let game = new Game(ROWS, COLS);

$(document).ready(function() {
    $(".new-game").click(function() {
        $(".card").removeClass(function (index, classNames) {
            let current_classes = classNames.split(" "), // change the list into an array
                classes_to_remove = []; // array of classes which are to be removed
        
            $.each(current_classes, function (index, class_name) {
              // if the classname begins with img add it to the classes_to_remove array
              if (/img.*/.test(class_name)) {
                classes_to_remove.push(class_name);
              }
            });
            // turn the array back into a string
            return classes_to_remove.join(" ");
          });
          $(".card").addClass("backcard-bg");
        game = new Game(ROWS, COLS);
    })
    $(".card").click(function(e) {
        let target = e.target;

        let x = target.getAttribute("x");
        let y = target.getAttribute("y");

        let imgClass = "";
        if (game.board.board[x][y].hidden) {
            imgClass = game.showCardImg(x, y);
            $(this).toggleClass("backcard-bg");
            $(this).toggleClass(imgClass); 
        }

        
        
        if (game.clickedCardsCount == 2) {
            $(".card").css("pointer-events", "none");
            let noMatch = game.checkIfMatch(game.pairClicked[0].cardImg, game.pairClicked[1].cardImg);
            if (noMatch) {
                setTimeout(function() {
                    let clickedFirst = $(`[x=${game.pairClicked[0].row}][y=${game.pairClicked[0].col}]`);
                    let clickedSecond = $(`[x=${game.pairClicked[1].row}][y=${game.pairClicked[1].col}]`);
                    game.toggleHidden(game.pairClicked[0].row, game.pairClicked[0].col);
                    game.toggleHidden(game.pairClicked[1].row, game.pairClicked[1].col);
                    clickedSecond.toggleClass("backcard-bg");
                    clickedSecond.toggleClass(imgClass); 
                    clickedFirst.toggleClass("backcard-bg");
                    clickedFirst.toggleClass(game.pairClicked[0].cardImg);
                    game.clickedCardsCount = 0;
                    game.pairClicked = [];
                    $(".card").css("pointer-events", "auto");
                }, 1000);               
            } else {
                $(".card").css("pointer-events", "auto");
                game.toggleHidden(game.pairClicked[0].row, game.pairClicked[0].col);
                game.toggleHidden(game.pairClicked[1].row, game.pairClicked[1].col);
                game.clickedCardsCount = 0;
                game.pairClicked = []; 
            }
        }

        let didWin = game.checkIfWon(ROWS, COLS);

        if (didWin) {
            $("#myModal").modal();
        }

    })
});
