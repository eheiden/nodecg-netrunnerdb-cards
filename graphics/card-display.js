(function () {
    'use strict';

    const o_leftCardContainer = document.getElementById('leftCardContainer');
    const o_rightCardContainer = document.getElementById('rightCardContainer');

    const i_leftCard = document.getElementById('leftCard');
    const i_rightCard = document.getElementById('rightCard');

    const r_leftCard = nodecg.Replicant('leftCard');
    const r_rightCard = nodecg.Replicant('rightCard');

    var leftTimeout;
    var rightTimeout;

    function aShowLeft() {
        TweenMax.to("#leftCard", 1, {rotationY: 15});
        TweenMax.to("#leftCardContainer", 1, {left: 0});
    }

    function aHideLeft() {
        TweenMax.to("#leftCard", 0.5, {rotationY: 115, ease: Power1.easeIn});
        TweenMax.to("#leftCardContainer", 0.5, {left: -50, ease: Power1.easeIn});
    }

    function aShowRight() {
        TweenMax.to("#rightCard", 1, {rotationY: -15});
        TweenMax.to("#rightCardContainer", 1, {left: 1590});
    }

    function aHideRight() {
        TweenMax.to("#rightCard", 0.5, {rotationY: -115, ease: Power1.easeIn});
        TweenMax.to("#rightCardContainer", 0.5, {left: 1640, ease: Power1.easeIn});
    }

    r_leftCard.on('change', newCard => {
        if (newCard.img === null || newCard.img === "") {
            i_leftCard.src = "";
            i_leftCard.style.display = "none";
        } else {
            i_leftCard.src = newCard.img;
            i_leftCard.style.display = "block";
        }
    });

    r_rightCard.on('change', newCard => {
        if (newCard.img === null || newCard.img === "") {
            i_rightCard.src = "";
            i_rightCard.style.display = "none";
        } else {
            i_rightCard.src = newCard.img;
            i_rightCard.style.display = "block";
        }
    });

    nodecg.listenFor('showLeft', () => {
        if (leftTimeout) {
            window.clearTimeout(leftTimeout);
        }
        aShowLeft();
    })

    nodecg.listenFor('hideLeft', () => {
        if (leftTimeout) {
            window.clearTimeout(leftTimeout);
        }
        aHideLeft();
    })

    nodecg.listenFor('showLeft10s', () => {
        aShowLeft();
        leftTimeout = window.setTimeout(aHideLeft, 11000);
    })

    nodecg.listenFor('showRight', () => {
        if (rightTimeout) {
            window.clearTimeout(rightTimeout);
        }
        aShowRight();
    })

    nodecg.listenFor('hideRight', () => {
        if (rightTimeout) {
            window.clearTimeout(rightTimeout);
        }
        aHideRight();
    })

    nodecg.listenFor('showRight10s', () => {
        aShowRight();
        rightTimeout = window.setTimeout(aHideRight, 11000);
    })

})();