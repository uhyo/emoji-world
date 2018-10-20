const {emojis} = require('./loademojis.js');

// find emoji for html.
const htmlEmoji = Object.keys(emojis).find(key => emojis[key].ext === 'html');

// generate path handling script.
const script =
    Object.keys(emojis)
.map(key => {
    const {ext} = emojis[key];
    return String.raw`
    if /^(.*)\/([^\/]*)\.${encodeEmoji(key)}$/.match(env["PATH_INFO"])
      return [307, {"x-reproxy-url" => "#{$1}/#{$2}.${ext}"}, []]
    end
    `;
})
.join('\n');

process.stdout.write(`lambda do |env|
    if env["PATH_INFO"] == "/"
        return [301, {"location" => "/index.${htmlEmoji}"}, []]
    end
${script}
    return [399, {}, []]
end
`);


function encodeEmoji(str) {
    // return [...str].map(e => `\\x{${e.codePointAt(0).toString(16)}}`).join('');
    return encodeURIComponent(str);
}
