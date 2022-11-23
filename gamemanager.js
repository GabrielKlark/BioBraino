(()=>{

    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let tries = 0;

    const triesSpan = document.querySelector('#tries');
    const cards = document.querySelectorAll('.memory-card');

    function flipCard() {
        if (lockBoard) 
            return;

        if (this === firstCard) 
            return;

        this.classList.add('flip');

        if (!hasFlippedCard) 
        {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        secondCard = this;

        IncreaseTries();
        checkForMatch();
    }

    function IncreaseTries()
    {
        tries++;
        triesSpan.innerHTML = tries;
    }
    
    function checkForMatch()
    {
        let card1 = firstCard.dataset.framework.split("-")
        let card2 = secondCard.dataset.framework.split("-")

        let isMatch = card1[1] === card2[1];
        let isCanAndTrash = card1[0] != card2[0];
        isMatch && isCanAndTrash ? disableCards() : unflipCards();
    }

    function disableCards()
    {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        resetBoard();
    }

    function unflipCards() {
        lockBoard = true;

        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            resetBoard();
        }, 1500);
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    (function shuffle() {
        cards.forEach(card => {
          let ramdomPos = Math.floor(Math.random() * 12);
          card.style.order = ramdomPos;
        });
    })();

    cards.forEach(card => card.addEventListener('click', flipCard));

})();