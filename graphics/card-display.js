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
        // TweenMax.to("#leftCard", 1, {rotationY: 15, ease: Power1.easeIn});
        TweenMax.to("#leftCard", 0.75, {ease: Back.easeOut});
        TweenMax.to("#leftCardContainer", 0.75, {left: 0, ease: Back.easeOut});
    }

    function aHideLeft() {
        // TweenMax.to("#leftCard", 0.5, {rotationY: 115, ease: Power1.easeIn});
        TweenMax.to("#leftCard", 1.0, {ease: Back.easeIn});
        TweenMax.to("#leftCardContainer", 1.0, {left: -450, ease: Back.easeIn});
    }

    function aShowRight() {
        // TweenMax.to("#rightCard", 1, {rotationY: -15, ease: Power1.easeIn});
        TweenMax.to("#rightCard", .75, {ease: Back.easeOut});
        TweenMax.to("#rightCardContainer", .75, {left: 1490, ease: Back.easeOut});
    }

    function aHideRight() {
        // TweenMax.to("#rightCard", 0.5, {rotationY: -115, ease: Power1.easeIn});
        TweenMax.to("#rightCard", 1.0, {ease: Back.easeIn});
        TweenMax.to("#rightCardContainer", 1.0, {left: 1940, ease: Back.easeIn});
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