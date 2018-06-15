(function () {
    'use strict';

    const fadeDelay = 0.5;

    const img_card = document.getElementById('card');

    const r_soloCard = nodecg.Replicant('soloCard');

    function fadeOut() {
        TweenMax.to('#card', fadeDelay, { opacity: 0 });
    }

    function updateCard() {
        img_card.src = r_soloCard.value.img;
        TweenMax.to('#card', fadeDelay, { opacity: 1 });
    }

    nodecg.readReplicant('soloCard', card => {
        img_card.src = card.img;
    });

    r_soloCard.on('change', newCard => {
        fadeOut();
        if (newCard.img !== null && newCard.img !== "") {
            window.setTimeout(updateCard, fadeDelay * 1000);
        }

    });

})();