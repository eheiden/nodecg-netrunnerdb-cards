#!/bin/bash

echo 'Downloading card printing info into cards.json...'

curl -g https://api-preview.netrunnerdb.com/api/v3/public/cards | json > cards.json.temp

#move the old cards.json over for safe keeping
if test -f "cards.json"; then
    mv cards.json cards.json.prev
fi

#copy over the temp file to the new cards.json file
mv cards.json.temp cards.json

if test -f "urls.txt"; then
    mv urls.txt urls.txt.last
fi

for URL in $(curl -g "https://api-preview.netrunnerdb.com/api/v3/public/printings/?fields[printings]=images&page[limit]=3000" | jq '.data[].attributes.images.nrdb_classic.large' | sed -e 's/"//g'); 

do echo "url = \"$URL\"";  OUT=$(basename $URL);
echo "output = \"$OUT\""; done > urls.txt

cp urls.txt netrunnercards
cd netrunnercards

curl --parallel --parallel-max 15 --config urls.txt
