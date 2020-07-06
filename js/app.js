var startButton = document.getElementById("start_button");
var allCards = document.querySelectorAll(".card");
var allbacks = document.querySelectorAll(".back ,.font");

var game_status = false; //遊戲當前狀態，false尚未開始、true已開始。
var flippedCard = false;
var lockCard = false;
var firstCard, secondCard;
var count = 0; //配對成功次數，用於判斷遊戲是否已經完成。

function game_start() { //點按鈕開始遊戲
    document.getElementById("game_text").style.display = "none";//隱藏遊戲完成的文字
    if (game_status == false) {
        //洗牌
        allCards.forEach(Cards => {
            var random = Math.floor(Math.random() * 12);
            Cards.style.order = random;
        });

        //翻開全部牌
        allbacks.forEach(e => e.classList.add("after")); //翻牌
        setTimeout(function () { //等待0.6秒後蓋牌
            allbacks.forEach(e => e.classList.remove("after"))
        }, 600);

        //遊戲當前狀態改為已開始 
        // 若沒設定setTimeout會有牌還沒完全翻回去就可以翻牌的問題，
        // 但若設定setTimeout又會有start game按鈕在遊戲狀態還沒變為true的時段內可以重複按的問題。
        game_status = true;
    }
}

function flipCard() { //開始翻牌
    if (game_status == true) { //判斷遊戲當前狀態為true時，才可以開始翻牌
        //如果配對失敗，就蓋牌
        if (lockCard) return;

        //防止翻同一張牌當第二張牌
        if (this === firstCard) return;

        this.children[0].classList.add("after");
        this.children[1].classList.add("after");

        if (!flippedCard) {
            flippedCard = true;
            firstCard = this;
            return;
        }
        secondCard = this;

        //執行確認是否配對成功函式
        checkMatch();
    }
}

function checkMatch() { //確認是否配對成功
    var isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? Match() : unMatch();
}

function Match() { //配對成功
    //移除click事件
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    resetCard();
    count++;
    if (count === 6) gameDone();
}

function unMatch() { //配對失敗
    lockCard = true;

    setTimeout(() => { //一秒後蓋牌
        firstCard.children[0].classList.remove("after");
        firstCard.children[1].classList.remove("after");
        secondCard.children[0].classList.remove("after");
        secondCard.children[1].classList.remove("after");
        resetCard();
    }, 1000);
}

function resetCard() {
    [flippedCard, lockCard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function gameDone() { //當count為6時，代表Match執行了6次(也就是12張牌都配對成功)表示遊戲完成
    setTimeout(function () { //要等待最後一張牌備完全翻過來，才顯示遊戲完成的文字，所以設定0.6秒的延遲
        document.getElementById("game_text").style.display = "block";
    }, 600);

    setTimeout(function () { //1秒後再次把所有牌翻回背面，以便重新開始遊戲
        allbacks.forEach(e => e.classList.remove("after"));
    }, 1000);

    game_status = false; //將遊戲當前狀態改為false
    count = 0; //把配對成功次數歸零
    allCards.forEach(Cards => Cards.addEventListener('click', flipCard)); //再次註冊click事件，以便再次遊玩
}

startButton.addEventListener('click', game_start);
allCards.forEach(Cards => Cards.addEventListener('click', flipCard));