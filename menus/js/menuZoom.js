window.addEventListener('load', () => {
    for (let itm of document.querySelectorAll("[data-action='zoom']"))
    {
        itm.addEventListener('click', () => {
            window.parent.postMessage('^' + itm.src, '*');
        });
    }
});