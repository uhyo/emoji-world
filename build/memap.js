// load base setting file.
const yaml = require('js-yaml');
const {emojis} = require('./loademojis.js');

// generate mime-extension map.
const meMap = {};
for (const key in emojis) {
    const val = emojis[key];
    meMap[val.mimetype] = `.${key}`;
}

process.stdout.write(yaml.safeDump(meMap) + '\n');


