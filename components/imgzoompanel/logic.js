var ZoomPanel = class {
    zoomElem = null
    zoomImgElem = null
    scrollHandler = null

    constructor(zoom, scrollHandler) {
        zoom.classList.add("_comp_zoom");
        zoom.innerHTML = `<img class="zoomImg" />`;

        this.scrollHandler = scrollHandler;
        this.zoomElem = zoom;
        this.zoomImgElem = zoom.querySelector(".zoomImg");

        for (let itm of document.querySelectorAll("[data-action='zoom']"))
        {
            itm.addEventListener('click', () => {
                this.Open(itm.src);
            });
        }

        zoom.addEventListener('click', () => this.Close());
    }

    Open(imgSrc)
    {
        this.scrollHandler.AddOneNoScroll();
        this.zoomElem.style.visibility = 'visible';
        this.zoomImgElem.src = imgSrc;
    }

    Close()
    {
        this.zoomElem.style.visibility = 'hidden';
        this.scrollHandler.ReleaseOneNoScroll();
    }
}