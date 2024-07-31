// ==UserScript==
// @name         de-ru
// @namespace    http://tampermonkey.net/
// @version      2024-07-21
// @author       You
// @grant        none
// @match        *://*/*
// @description  Transliterate user input between DE and RU
// ==/UserScript==

(function () {

    const DE = 'German', RU = 'Russian';
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
        "ü": "ю",
        "ä": "ж",
        "ö": "ь",

        "^": "ё",
        "°": "Ё",

        "+": "щ",
        "*": "Щ",

        "#": "э",
        "'": "Э",

        "ß": "ъ",
        "?": "Ъ",

    };

    let activeLang = DE;

    document.addEventListener('keydown', (ev) => {
        try {
            if (ev.ctrlKey && ev.shiftKey) { // Ctrl+Shift to switch language
                activeLang = (activeLang === DE) ? RU : DE;
                console.log(`Switched to ${activeLang}`);
                return;
            }

            if (activeLang !== RU) {
                return; // only translate to RU
            }

            let translation = translations[ev.key.toLowerCase()];
            if (!translation) {
                return;
            }

            const capsLockOn = ev.getModifierState("CapsLock");
            if (ev.shiftKey || capsLockOn) { // Shift or CapsLock to upper case
                translation = translation.toUpperCase();
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
        } catch (e) {
            console.error(e);
        }
    });

})();
