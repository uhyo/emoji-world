const fs = require('fs');
const yaml = require('js-yaml');

// load base setting file.
const emojis = yaml.safeLoad(
    fs.readFileSync(
        '/dev/stdin',
        'utf8',
    ));

// remove 異体字セレクタ from keys.
const result = {};
for (const key in emojis) {
    result[key.replace('\ufe0f', '')] = emojis[key];
}

exports.emojis = result;
