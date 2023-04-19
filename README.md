netrunner-card-overlay is a [NodeCG](http://github.com/nodecg/nodecg) bundle.
It was originally written by dodgepong (https://github.com/dodgepong/nodecg-netrunnerdb-cards), and this version of the repo has been forked by Eric Heiden. The blame for any bugs belongs to Eric.

It works with NodeCG versions which satisfy this [semver](https://docs.npmjs.com/getting-started/semantic-versioning) range: `~2.1.1`
You will need to have an appropriate version of NodeCG installed to use it.

Requires cards to be in `shared/netrunnercards/` named as `<nrdbcode>.jpg`. For example, Maw would be in that folder as `12002.jpg`.

In order to easily obtain the images for all the cards correctly, navigate to nodecg-netrunnerdb/shared and run "./download.sh". This process can take a long time (hours), but only needs to be run upon initial setup or whenever new cards are released.

1. git clone https://github.com/nodecg/nodecg.git nodecg
2. cd nodecg
3. npm install && npm run build
4. cd bundles
5. git clone https://github.com/eheiden/nodecg-netrunnerdb-cards
6. cd nodecg-netrunnerdb-cards
7. npm install
8. cd shared
9. ./download.sh
10. cd ../../..
11. nvm use 18.15.0
8. nodecg start

Tested using Node.js v18.15.0 on 4/19/2023

API References:
https://netrunnerdb.com/api/doc
