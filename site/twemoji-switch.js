let twemojiEnabledFlag = false;
function enableTwemoji() {
    if (twemojiEnabledFlag) return;
    twemojiEnabledFlag = true;

    const script = document.createElement('script');
    script.src = 'https://twemoji.maxcdn.com/2/twemoji.min.js?11.2';
    document.head.appendChild(script);

    script.onload = e=> {
        twemoji.parse(document.body);
        document.getElementById('twemoji-credit').hidden = false;
        e.currentTarget.parentNode.removeChild(e.currentTarget);
    };
}
