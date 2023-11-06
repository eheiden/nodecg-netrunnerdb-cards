netrunner-card-overlay is a [NodeCG](http://github.com/nodecg/nodecg) bundle.
It was originally written by [dodgepong](https://github.com/dodgepong/nodecg-netrunnerdb-cards), and this version of the repo has been forked by Eric Heiden. The blame for any bugs belongs to Eric.

It works with NodeCG versions which satisfy this [semver](https://docs.npmjs.com/getting-started/semantic-versioning) range: `~2.1.1`
You will need to have an appropriate version of NodeCG installed to use it.
NodeCG requires Node.js version 18.15.0. In order to use old versions of Node.js (such as this one), use nvm.
To install the necessary tools on Windows 10:
1. Install nvm for windows here: https://dev.to/skaytech/how-to-install-node-version-manager-nvm-for-windows-10-4nbi
2. nvm install 18.15.0

install jq (linux = apt-get install jq, others install here: https://jqlang.github.io/jq/
-- On windows I've found this easiest to install using Chocolatey which is a package manager. Once you install Chocolatey - I used

1. git clone https://github.com/nodecg/nodecg.git nodecg
2. cd nodecg/bundles
3. git clone https://github.com/eheiden/nodecg-netrunnerdb-cards
4. cd nodecg-netrunnerdb-cards
5. npm install
6. cd shared/netrunnercards/
7. ./card_download.sh (on windows admin may be required on the terminal session for the script to have the right file access)
8. cd ../../../.. (back to base nodecg directory)
9. nvm use 18.15.0
10. npm install && npm run build
11. nodecg start (or alternatively "node index.js")
12. Open a browser and visit http://localhost:9090/dashboard/#
13. On the right click on Graphics (eyeball icon)
14. Copy Url for Card-display.html (or solo-card.html, or both)
15. In OBS click under sources, add a browser source, paste the URL under URL, set the width to 1920x1080 for the card-display.html (or 400x577 for solo-card.html), click Use custom frame rate and set it to 60.
16. Now you should be able to type a card name in and hit enter to see it.
17. hit show left / show right / etc to display the card on the OBS overlay.

The nodecg-netrunnerdb-cards bundle requires cards to be in `shared/netrunnercards/` named as `<nrdbcode>.jpg`. For example, Maw would be in that folder as `12002.jpg`.

In order to easily obtain the images for all the cards correctly, navigate to nodecg-netrunnerdb/shared/netrunnercards/ and run "./card_download.sh". This process only needs to be run upon initial setup or whenever new cards are released.

nvm use 18.15.0
nodecg start

Tested using Node.js v18.15.0 on 4/19/2023

API References:
[Netrunnerdb.com API](https://netrunnerdb.com/api/doc)
