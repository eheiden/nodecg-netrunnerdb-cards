'use strict';

module.exports = function (nodecg) {
    const axios = require('axios');

    axios.get('https://netrunnerdb.com/api/2.0/public/cards')
        .then(response => nodecg.Replicant('cards').value = response.data);
};
