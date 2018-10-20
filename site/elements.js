// check availablity of Custom Elements (v1).
const ce = window.customElements != null;

const elementsTable = {
    'p': 'e-🖋️',
    'a': {
        name: 'e-🔗',
        attributes: ['href', 'target'],
    },
    'button': 'e-👆',
    'header': 'e-🗣️',
    'h1': {
        name: 'e-1⃣',
        styles: ` h1 { margin: 1rem 0; }`,
    },
    'main': 'e-💩',
    'figure': 'e-📈',
    'figcaption': 'e-📰',
    'img': {
        name: 'e-🖼️',
        attributes: ['src', 'alt', 'width'],
    },
    'small': 'e-🤫',
    'footer': {
        name: 'e-🦶',
        styles: ` footer { clear: both; }`,
    },
};

if (!ce) {
    // fall back to old behavior.
    fallbackElements();
} else {
    registerCustomElements();
}

function fallbackElements() {
    document.body.style.opacity = '0';
    document.addEventListener('DOMContentLoaded', ()=> {
        // replace all occurences of custom elements with normal elements.
        for (const tag of Object.keys(elementsTable)) {
            const custom = elementsTable[tag];
            const customName = custom.name || custom;
            const lel = document.getElementsByTagName(customName);
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
    // fix styles for custom elements.
    fixStyles();
}
function fixStyles() {
    const elementsBackMap = {};
    for (const tag of Object.keys(elementsTable)) {
        const custom = elementsTable[tag];
        elementsBackMap[custom.name || custom] = tag;
    }
    for (const st of Array.from(document.styleSheets)) {
        for (const r of Array.from(st.cssRules)) {
            fixRule(r);
        }
    }

    function fixRule(r) {
        if (r.cssRules) {
            for (const r2 of Array.from(r.cssRules)) {
                fixRule(r2);
            }
        }
        if (r.selectorText) {
            r.selectorText = r.selectorText.replace(/\b(e-.*)(?:\s|$)/g, (str, elm) => {
                return elementsBackMap[elm] || str;
            });
        }
    }
}

function registerCustomElements() {
    // do not use customized built-in elements as it is not widely supported for now.
    for (const tag of Object.keys(elementsTable)) {
        const custom = elementsTable[tag];
        const customName = custom.name || custom;
        const customAttrs = custom.attributes || [];

        const tagCls = class extends HTMLElement {
            static get observedAttributes() {
                return customAttrs;
            }
            constructor() {
                super();

                this.attachShadow({mode: 'open'});
                const innerElement = this.innerElement = document.createElement(tag);

                if (custom.styles) {
                    const style = document.createElement('style');
                    style.textContent = custom.styles;
                    this.shadowRoot.appendChild(style);
                }

                const slot = document.createElement('slot');
                innerElement.appendChild(slot);
                this.shadowRoot.appendChild(innerElement);
            }
            attributeChangedCallback(name, _, newValue) {
                console.log(name, newValue);
                this.innerElement.setAttribute(name, newValue);
            }
        };

        customElements.define(customName, tagCls);
    }
}
