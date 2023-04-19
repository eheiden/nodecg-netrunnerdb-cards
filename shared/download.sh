#!/bin/bash

echo 'Downloading card printing info into cards.json...'

curl -g https://netrunnerdb.com/api/2.0/public/cards | json > cards.json.temp

#move the old cards.json over for safe keeping
if test -f "cards.json"; then
    mv cards.json cards.json.prev
fi

#copy over the temp file to the new cards.json file
mv cards.json.temp cards.json

if test -f "urls.txt"; then
    mv urls.txt urls.txt.last
fi

echo 'Parsing cards.json to create urls.txt...'

#find the image urls in cards.json, remove the whitespace, and dump them all to a textfile containing only the urls
#removes whitespace, quotes, commas, and the word "code:" from the output
grep \"code\" cards.json | sed -r 's/\s+//g' | sed 's/\"//g' | sed 's/code\:/https\:\/\/static\.nrdbassets\.com\/v1\/large\//g' | sed 's/\,/\.jpg/g'  > urls.txt

cp urls.txt netrunnercards
cd netrunnercards

echo 'Downloading all images from urls.txt... into shared/netrunnercards'

while read url; do
    wget -N $url
done < urls.txt
