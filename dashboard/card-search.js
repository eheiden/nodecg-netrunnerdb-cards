(function () {
    'use strict';

    //Replicants are reated in extension.js within the nodecg-netrunnerdb-cards directory
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

    const b_showSolo = document.getElementById('showSolo');
    const b_hideSolo = document.getElementById('hideSolo');
    const b_refreshDatabase = document.getElementById('refreshDatabase');

    const r_leftCard = nodecg.Replicant('leftCard');
    const r_rightCard = nodecg.Replicant('rightCard');
    const r_soloCard = nodecg.Replicant('soloCard');

    //searchCards is called whenever a new character is typed, and it passes back any matches from the database through a callback object cb
    function searchCards(query, cb) {
        const nrdbCards = r_cards.value;
        const cardsData = nrdbCards['data'];

        //const matches = cardsData.filter(card => card.attributes.stripped_title.match(new RegExp(query, "i")))
        
        let matches = cardsData.filter(card => {
            let attr = card.attributes;
            let stripped = attr.stripped_title;
            //console.log("trying to query '" + query + "' with stripped title '" + stripped + "'.");
            let match = stripped.includes(query);
            //console.log("'stripped.includes(query)' returned '" + match + "'");
            return match;
            })

        //for debug, watch the console in the browser (in chrome right click the dashboard, click inspect, then find the "Console" tab)
        for (let i = 0; i < matches.length; i++){
            console.log(`"searchCards() "${query}" returned "${matches[i].attributes.stripped_title}"`);
        }
        
        cb(matches);
    }

    //getCard is called whenever enter is hit on the Card Search textbox or the magnifying glass is clicked, and returns any matches
    //"query" is whatever text is in the search box
    function getCard(query) {
        const nrdbCards = r_cards.value;
        const cardsData = nrdbCards['data'];

        //for (let i = 0; i < cardsData.length; i++){
        //    console.log(cardsData[i].attributes.stripped_title)
        //}

        //look in extension.js for how the cards.json file gets parsed into the card object
        //const matches = cardsData.filter(card => card.attributes.stripped_title.match(new RegExp(query, "i")))
        //let matches = cardsData.filter(card => card.attributes.stripped_title.match(new RegExp("^" + query + "$", "i")))

        let matches = cardsData.filter(card => {
            let attr = card.attributes;
            let stripped = attr.stripped_title;
            //console.log("trying to query '" + query + "' with stripped title '" + stripped + "'.");
            let match = stripped.includes(query);
            //console.log("'stripped.includes(query)' returned '" + match + "'");

            return match;
            })

        //console.log(`getCard() length of matches = "${matches.length}"`);

        // for (let i = 0; i < matches.length; i++){
        //     console.log(`"${query}" returned "${matches[i].attributes.stripped_title}"`);
        // }

        if (matches.length > 0) {

            console.log(matches[matches.length - 1]);

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

        if (i_cardPreview.src == '../shared/runner-back.png' || i_cardPreview.src === "") {
            currentLeftCard.img = "";
        }
        else {
            currentLeftCard.img = i_cardPreview.src;
        }
    }

    function setRight() {
        var currentRightCard = r_rightCard.value;
        if (i_cardPreview.src === currentRightCard.img) {
            return
        }

        if (i_cardPreview.src == '../shared/runner-back.png' || i_cardPreview.src === "") {
            currentRightCard.img = "";
        }
        else {
            currentRightCard.img = i_cardPreview.src;
        }
    }

    function setSolo() {
        var currentSoloCard = r_soloCard.value;
        if (i_cardPreview.src === currentSoloCard.img) {
            return
        }

        if (i_cardPreview.src == '../shared/runner-back.png' || i_cardPreview.src === "") {
            currentSoloCard.img = "";
        }
        else {
            currentSoloCard.img = i_cardPreview.src;
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
            i_cardPreview.src = "../shared/runner-back.png";
        } else {
            i_cardPreview.src = "../shared/netrunnercards/" + result['id'] + ".jpg";
        }
    });

    b_showSolo.addEventListener('click', () => {
        setSolo();
    });

    b_hideSolo.addEventListener('click', () => {
        r_soloCard.value.img = "";
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
        setLeft();
        // small delay to make sure card gets updated
        window.setTimeout(() => nodecg.sendMessage('showLeft'), 500);
    });

    b_hideLeft.addEventListener('click', () => {
        nodecg.sendMessage('hideLeft');
    });

    b_showLeft10s.addEventListener('click', () => {
        setLeft();
        // small delay to make sure card gets updated
        window.setTimeout(() => nodecg.sendMessage('showLeft10s'), 500);
    });

    b_showRight.addEventListener('click', () => {
        setRight();
        // small delay to make sure card gets updated
        window.setTimeout(() => nodecg.sendMessage('showRight'), 500);
    });

    b_hideRight.addEventListener('click', () => {
        nodecg.sendMessage('hideRight');
    });

    b_showRight10s.addEventListener('click', () => {
        setRight();
        // small delay to make sure card gets updated
        window.setTimeout(() => nodecg.sendMessage('showRight10s'), 500);
    });

    autocomplete('#cardQuery', { hint: false, autoselect: true, appendTo: '#cardQueryAutocomplete' }, [
        {
            source: searchCards,
            displayKey: 'title'
        }
    ]);
})();