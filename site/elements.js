// check availablity of Custom Elements (v1).
const ce = window.customElements != null;

const elementsTable = {
    'p': 'e-🖋️',
    'a': 'e-⚓',
    'button': 'e-👆',
    'header': 'e-🗣️',
    'h1': 'e-1⃣',
    'main': 'e-💩',
    'figure': 'e-📈',
    'figcaption': 'e-📰',
    'img': 'e-🖼️',
    'small': 'e-🤫',
    'footer': 'e-🦶',
};

// if (!ce) {
    // fall back to old behavior.
    fallbackElements();
// }

function fallbackElements() {
    document.body.style.opacity = '0';
    document.addEventListener('DOMContentLoaded', ()=> {
        // replace all occurences of custom elements with normal elements.
        for (const tag of Object.keys(elementsTable)) {
            const custom = elementsTable[tag];
            const lel = document.getElementsByTagName(custom);
            for (const e of Array.from(lel)) {
                const repl = document.createElement(tag);
                for (const {name, value} of Array.from(e.attributes)) {
                    repl.setAttribute(name, value);
                }
                for (const child of Array.from(e.childNodes)) {
                    repl.appendChild(child);
                }
                e.parentNode.replaceChild(repl, e);
            }
        }
        document.body.style.opacity = '1';
    }, false);
}
