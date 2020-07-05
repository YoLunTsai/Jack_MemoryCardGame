var startButton = document.getElementById("start_button");
var game_status = false; //遊戲當前狀態，false尚未開始、true已開始。
var allCards = document.querySelectorAll(".card");
var firstCard, secondCard;

function game_start() { //點按鈕開始遊戲
    if (game_status == false) {
        //洗牌
        allCards.forEach(Cards => {
            var random = Math.floor(Math.random() * 12);
            Cards.style.order = random;
        });

        //翻開全部牌
        var allbacks = document.querySelectorAll(".back ,.font");
        allbacks.forEach(e => e.classList.add("after"));
        setTimeout(function () {
            allbacks.forEach(e => e.classList.remove("after"))
        }, 600);

        //遊戲當前狀態改為已開始 
        // 若沒設定setTimeout會有牌還沒完全翻回去就可以翻牌的問題，
        // 但若設定setTimeout又會有start game按鈕在遊戲狀態還沒變為true的時段內可以重複按的問題。
        game_status = true;
    }
}

function flipCard() { //開始翻牌
    if (game_status == true) { //判斷遊戲當前狀態為true時，才可以開始點牌
        this.children[0].classList.add("after");
        this.children[1].classList.add("after");
    }
}



startButton.addEventListener('click', game_start);
allCards.forEach(Cards => Cards.addEventListener('click', flipCard));