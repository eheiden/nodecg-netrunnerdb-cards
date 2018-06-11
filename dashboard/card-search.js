(function () {
    'use strict';

    const r_cards = nodecg.Replicant('cards');

    const b_search = document.getElementById('search');
    const i_cardQuery = document.getElementById('cardQuery');
    const i_cardPreview = document.getElementById('cardPreview');

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
            const imageUrlTemplate = nrdbCards['imageUrlTemplate'];

            if (result['image_url']) {
                i_cardPreview.src = result['image_url'];
            } else {
                i_cardPreview.src = imageUrlTemplate.replace('{code}', result['code']);
            }
        }
    });

    autocomplete('#cardQuery', { hint: false, autoselect: true, appendTo: '#cardQueryAutocomplete' }, [
        {
            source: searchCards,
            displayKey: 'title'
        }
    ]);
})();