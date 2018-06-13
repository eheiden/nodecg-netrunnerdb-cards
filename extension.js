'use strict';

module.exports = function (nodecg) {
    const axios = require('axios');

    const leftInitialValue = {
        img: ""

    };
    const rightInitialValue = {
        img: ""
    };

    const r_leftCard = nodecg.Replicant('leftCard', { defaultValue: leftInitialValue });
    const r_rightCard = nodecg.Replicant('rightCard', { defaultValue: rightInitialValue });

    axios.get('https://netrunnerdb.com/api/2.0/public/cards')
        .then(response => nodecg.Replicant('cards').value = response.data);


};
