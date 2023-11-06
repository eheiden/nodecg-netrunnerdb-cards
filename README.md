netrunner-card-overlay is a [NodeCG](http://github.com/nodecg/nodecg) bundle.
It was originally written by [dodgepong](https://github.com/dodgepong/nodecg-netrunnerdb-cards), and this version of the repo has been forked by Eric Heiden. The blame for any bugs belongs to Eric.

It works with NodeCG versions which satisfy this [semver](https://docs.npmjs.com/getting-started/semantic-versioning) range: `~2.1.1`
You will need to have an appropriate version of NodeCG installed to use it.
NodeCG requires Node.js version 18.15.0. In order to use old versions of Node.js (such as this one), use nvm.
To install the necessary tools on Windows 10:
1. Install nvm for windows here: https://dev.to/skaytech/how-to-install-node-version-manager-nvm-for-windows-10-4nbi
2. nvm install 18.15.0

install jq (linux = apt-get install jq)

1. git clone https://github.com/nodecg/nodecg.git nodecg
2. cd nodecg
3. npm install && npm run build
4. cd bundles
5. git clone https://github.com/eheiden/nodecg-netrunnerdb-cards
6. cd nodecg-netrunnerdb-cards
7. npm install
8. cd shared/netrunnercards/
9. ./card_download.sh
10. cd ../../..
11. nvm use 18.15.0
8. nodecg start

The nodecg-netrunnerdb-cards bundle requires cards to be in `shared/netrunnercards/` named as `<nrdbcode>.jpg`. For example, Maw would be in that folder as `12002.jpg`.

In order to easily obtain the images for all the cards correctly, navigate to nodecg-netrunnerdb/shared/netrunnercards/ and run "./card_download.sh". This process only needs to be run upon initial setup or whenever new cards are released.

nvm use 18.15.0
nodecg start

Tested using Node.js v18.15.0 on 4/19/2023

API References:
[Netrunnerdb.com API](https://netrunnerdb.com/api/doc)
