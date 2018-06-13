(function () {
    'use strict';

    const r_cards = nodecg.Replicant('cards');

    const b_search = document.getElementById('search');
    const i_cardQuery = document.getElementById('cardQuery');
    const i_cardPreview = document.getElementById('cardPreview');

    const b_showLeft = document.getElementById('showLeft');
    const b_hideLeft = document.getElementById('hideLeft');
    const b_showLeft10s = document.getElementById('showLeft10s');
    const b_showRight = document.getElementById('showRight');
    const b_hideRight = document.getElementById('hideRight');
    const b_showRight10s = document.getElementById('showRight10s');
    const b_refreshDatabase = document.getElementById('refreshDatabase');

    const r_leftCard = nodecg.Replicant('leftCard');
    const r_rightCard = nodecg.Replicant('rightCard');

    function searchCards(query, cb) {
        const nrdbCards = r_cards.value;
        const cardsData = nrdbCards['data'];

        const matches = cardsData.filter(card => card.title.match(new RegExp(query, "i")))
        cb(matches);
    }

    function getCard(title) {
        const nrdbCards = r_cards.value;
        const cardsData = nrdbCards['data'];
        const matches = cardsData.filter(card => card.title.match(new RegExp("^" + title + "$", "i")))

        if (matches.length > 0) {
            return matches[matches.length - 1];
        } else {
            return false;
        }
    }

    function setLeft() {
        var currentLeftCard = r_leftCard.value;
        if (i_cardPreview.src === currentLeftCard.img) {
            return
        }

        if (i_cardPreview.src == 'no-card.png' || i_cardPreview.src === "") {
            currentLeftCard.img = "";
        }
        else {
            currentLeftCard.img = i_cardPreview.src;
        }
        r_leftCard.value = currentLeftCard;
    }

    function setRight() {
        var currentRightCard = r_rightCard.value;
        if (i_cardPreview.src === currentRightCard.img) {
            return
        }

        if (i_cardPreview.src == 'no-card.png' || i_cardPreview.src === "") {
            currentRightCard.img = "";
        }
        else {
            currentRightCard.img = i_cardPreview.src;
        }
        r_rightCard.value = currentRightCard;
    }

    i_cardQuery.addEventListener('keyup', (event) => {
        if (event.keyCode == 13) {
            b_search.click();
        }
    });

    b_search.addEventListener('click', () => {
        const result = getCard(i_cardQuery.value);
        if (!result) {
            i_cardPreview.src = "no-card.png";
        } else {
            const nrdbCards = r_cards.value;
            i_cardPreview.src = "../shared/netrunnercards/" + result['code'] + ".png";
        }
    });

    b_refreshDatabase.addEventListener('click', () => {
        b_refreshDatabase.classList.remove('is-success');
        b_refreshDatabase.classList.remove('is-danger');
        b_refreshDatabase.classList.add('is-loading');
        b_refreshDatabase.disabled = true;
        axios.get('https://netrunnerdb.com/api/2.0/public/cards')
            .then(response => {
                nodecg.Replicant('cards').value = response.data;
                b_refreshDatabase.classList.remove('is-loading');
                b_refreshDatabase.classList.add('is-success');
                b_refreshDatabase.disabled = false;
            })
            .catch(error => {
                b_refreshDatabase.classList.remove('is-loading');
                b_refreshDatabase.classList.add('is-danger');
                b_refreshDatabase.disabled = false;

            });
    });

    b_showLeft.addEventListener('click', () => {
        console.log('clik');
        setLeft();
        nodecg.sendMessage('showLeft');
    });

    b_hideLeft.addEventListener('click', () => {
        nodecg.sendMessage('hideLeft');
    });

    b_showLeft10s.addEventListener('click', () => {
        setLeft();
        nodecg.sendMessage('showLeft10s');
    });

    b_showRight.addEventListener('click', () => {
        setRight();
        nodecg.sendMessage('showRight');
    });

    b_hideRight.addEventListener('click', () => {
        nodecg.sendMessage('hideRight');
    });

    b_showRight10s.addEventListener('click', () => {
        setRight();
        nodecg.sendMessage('showRight10s');
    });

    autocomplete('#cardQuery', { hint: false, autoselect: true, appendTo: '#cardQueryAutocomplete' }, [
        {
            source: searchCards,
            displayKey: 'title'
        }
    ]);
})();