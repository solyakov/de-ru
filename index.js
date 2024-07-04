// ==UserScript==
// @name         de-ru
// @namespace    http://tampermonkey.net/
// @version      2024-07-04
// @author       You
// @grant        none
// @match        *://*/*
// @description  Transliterate user input between DE and RU
// ==/UserScript==

(function () {

    const DE = 1, RU = 2;
    const translations = {
        "a": "а",
        "b": "б",
        "c": "ц",
        "d": "д",
        "e": "е",
        "f": "ф",
        "g": "г",
        "h": "ч",
        "i": "и",
        "j": "й",
        "k": "к",
        "l": "л",
        "m": "м",
        "n": "н",
        "o": "о",
        "p": "п",
        "q": "я",
        "r": "р",
        "s": "с",
        "t": "т",
        "u": "у",
        "v": "в",
        "w": "ш",
        "x": "х",
        "y": "ы",
        "z": "з",
        "^": "ё",
        "ü": "ю",
        "+": "щ",
        "#": "э",
        "ä": "ж",
        "ö": "ь",
        "´": "ъ"
    };

    let activeLang = DE;

    document.addEventListener('keydown', (ev) => {
        if (ev.ctrlKey && ev.shiftKey) {
            activeLang = (activeLang === DE) ? RU : DE;
            console.log(`Switched to ${activeLang === DE ? 'German' : 'Russian'}`);
            return;
        }

        if (activeLang !== RU) {
            return;
        }

        const key = ev.key.toLowerCase();
        const translation = translations[key];
        if (!translation) {
            return;
        }

        ev.preventDefault();
        ev.stopPropagation();

        const target = ev.target

        if (target.isContentEditable) {
            const sel = window.getSelection();
            const range = sel.getRangeAt(0);
            range.deleteContents();
            range.insertNode(document.createTextNode(translation));
            range.collapse(false);
            sel.removeAllRanges();
            sel.addRange(range);
            return;
        }

        const start = target.selectionStart;
        const end = target.selectionEnd;
        const oldValue = target.value;
        const newValue = oldValue.slice(0, start) + translation + oldValue.slice(end);

        target.value = newValue;
        target.selectionStart = target.selectionEnd = start + 1;
    });

})();
