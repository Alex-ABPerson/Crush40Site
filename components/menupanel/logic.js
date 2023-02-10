var FloatingMenuPanel = class {

    mainElem = null
    panelElem = null
    panelTitleElem = null
    panelIFrameElem = null
    panelBackBtnElem = null

    loadingScreen = null
    zoomPanel = null
    scrollHandler = null

    currentPanelHeight = 0

    noPanelHistory = 0

    constructor(main, zoomPanel, scrollHandler) {

        this.zoomPanel = zoomPanel;
        this.scrollHandler = scrollHandler;

        this.mainElem = main
        this.mainElem.classList.add("_comp_menupanel");
        this.mainElem.innerHTML = `
        <div class="panelClose"></div>
        <div class="panel">
            <div class="titlebar">
                <button title="Back" class="back iconButton"><img src="img/icons/smallBackButton.svg" alt="Back Icon"></button>
                <p class="title">Loading...</p>
                <button title="Close" class="close iconButton"><img src="img/icons/smallCloseButton.svg" alt="Close Icon"></button>
            </div>

            <div class="loading"></div>

            <iframe title="Menu Contents" class="contents" src=""></iframe>
        </div>
        `;

        // Setup elements
        this.panelElem = this.mainElem.querySelector(".panel");
        this.panelTitleElem = this.panelElem.querySelector(".titlebar .title");
        this.panelIFrameElem = this.panelElem.querySelector(".contents");
        this.backBtnElem = this.panelElem.querySelector(".titlebar .back");
        this.loadingScreen = new LoadingScreen(this.panelElem.querySelector(".loading"));
 
        // Setup clicks
        this.panelElem.querySelector(".titlebar .close").addEventListener('click', () => this.Close());
        this.mainElem.querySelector(".panelClose").addEventListener('click', () => this.Close());

        this.backBtnElem.addEventListener('click', () => this.GoBack());
        
        // Setup additional handling
        window.addEventListener('message', (e) => this.HandleMessage(e.data));
        window.addEventListener('resize', () => this.RefreshPanelSizing());

        // Initialize
        this.RefreshPanelSizing();

        for (let btn of document.querySelectorAll("[data-action='panel']"))
            btn.addEventListener('click', () => this.OpenTo(btn.dataset.pageName));
    }

    // Open/Close
    OpenTo(newSrc) {
        this.mainElem.style.visibility = 'visible';
        this.scrollHandler.AddOneNoScroll();

        this.GoTo(newSrc, false);
        this.ResetHistory();
    }

    Close() {
        this.mainElem.style.visibility = 'collapse';
        this.scrollHandler.ReleaseOneNoScroll();
    }

    // Navigation
    GoTo(newSrc, updateHistory = true) {
        let bothParts = newSrc.split('?');

        if (bothParts.length > 1)
            this.panelIFrameElem.src = "menus/" + bothParts[0] + ".html" + "?" + bothParts[1];
        else
            this.panelIFrameElem.src = "menus/" + bothParts[0] + ".html";

        this.BeforePageLoad(updateHistory);
    }

    // Page Loading
    BeforePageLoad(updateHistory) {
        this.loadingScreen.Start();
        if (updateHistory) this.AddToHistory();
    }

    AfterPageLoad() {
        // Send the current parent page to the iframe - the menu may just ignore this. One place this is used by the "guitar view" page,
        // which needs to know whether it should hide the "View on Gear page" button if we're already on the gear page.
        let splitURL = document.URL.split('/');
        this.panelIFrameElem.contentWindow.postMessage(splitURL[splitURL.length - 1]);
        
        this.panelTitleElem.innerHTML = this.panelIFrameElem.contentDocument.title;
        this.loadingScreen.Stop();
    }

    // Panel Sizing
    RefreshPanelSizing() {
        if (this.currentPanelHeight >= window.innerHeight || window.innerWidth < 1000)
            this.panelElem.style.height = "100%";
        else
            this.panelElem.style.height = this.currentPanelHeight + "px";
    }

    // Page Communication
    HandleMessage(msg) {
        let msgCode = msg[0];
        let msgContents = msg.substring(1);

        switch (msgCode)
        {
            // Listen out for a message from the page in the frame when it loads - this will not only tell us how tall to make the panel,
            // but will also confirm it's fully loaded.
            case '!':
                this.currentPanelHeight = parseInt(msgContents);
                this.RefreshPanelSizing();
                this.AfterPageLoad();
                break;
            // Zoom feature
            case '^':
                this.zoomPanel.Open(msgContents.replace("../", "")); // Get rid of any ../s as they don't apply here.
                break;
            // Navigate To
            case '@':
                this.GoTo(msgContents);
                break;
        }
    }

    // Panel History
    AddToHistory() {
        this.noPanelHistory++;
        this.RefreshBackPrescence();
    }

    GoBack() {
        this.noPanelHistory--;
        this.RefreshBackPrescence();
        this.panelIFrameElem.contentWindow.history.back();
        this.BeforePageLoad(false);
    }

    ResetHistory() {
        this.noPanelHistory = 0;
        this.backBtnElem.classList.add("hiddenBack");
    }

    RefreshBackPrescence() {
        // Show the back button if we have enough history now.
        if (this.noPanelHistory > 0)
            this.backBtnElem.classList.remove("hiddenBack");
        else
            this.backBtnElem.classList.add("hiddenBack");
    }
}