'use strict';

module.exports = function (nodecg) {
    const axios = require('axios');
    const fs = require('fs');
    const path = require('path');

    const filePath = path.join(__dirname, 'shared/cards.json');

    const leftInitialValue = {
        img: ""

    };
    const rightInitialValue = {
        img: ""
    };
    const soloInitialValue = {
        img: ""
    };

    const r_leftCard = nodecg.Replicant('leftCard', { defaultValue: leftInitialValue });
    const r_rightCard = nodecg.Replicant('rightCard', { defaultValue: rightInitialValue });
    const r_soloCard = nodecg.Replicant('soloCard', { defaultValue: soloInitialValue });

    fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
        if (!err) {
            const cards = nodecg.Replicant('cards').value = JSON.parse(data);
        } else {
            console.log(err);
        }
    });
};
