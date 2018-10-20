#! /bin/sh

mkdir -p ../dist
cat ./emojis.yml | node memap.js > ../dist/memap.yml
cat ./emojis.yml | node handler.js > ../dist/path-handler.rb
