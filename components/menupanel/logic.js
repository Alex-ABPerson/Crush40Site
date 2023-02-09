var FloatingMenuPanel = class {

    panelElem = null
    panelTitleElem = null
    panelFrameElem = null
    panelBackElem = null

    loadingScreen = null
    currentPanelHeight = 0
    panelOpen = false
    


    var floatingLoading;
    var floatingPanelTitle;
    var floatingPanelFrame;
    var floatingPanelBack;
    var currentPanelHeight;
    var panelOpen = false;
    var noPanelHistory = 0;
}


function SetupFloating() {
    
    floating = document.querySelector(".floating");
    floatingLoading = new LoadingComponent(document.querySelector(".floating .panel .loading-screen"));
    floatingPanel = document.querySelector(".floating .panel");
    floatingPanelTitle = document.querySelector(".floating .panel .titlebar .title");
    floatingPanelFrame = document.querySelector(".floating .panel .contents");
    floatingPanelBack = document.querySelector(".floating .panel .titlebar .back");

    document.querySelector(".floating .floatingClose").addEventListener('click', ClosePanel);
    document.querySelector(".floating .panel .titlebar .close").addEventListener('click', ClosePanel);
    floatingPanelBack.addEventListener('click', NavBack);

    window.addEventListener('message', (e) => HandleMessage(e.data));
    window.addEventListener('resize', () => {
        UpdatePanelSizing();
    });
    UpdatePanelSizing();

    for (let btn of document.querySelectorAll("[data-action='panel']"))
        btn.addEventListener('click', () => UpdatePanelPage(btn.dataset.pageName));
}

function UpdatePanelPage(newSrc)
{   
    let bothParts = newSrc.split('?');
    floatingPanelFrame.src = "menus/" + bothParts[0] + ".html" + (bothParts.length > 1 ? "?" + bothParts[1] : "");

    OnUpdatePanelPage(panelOpen);
}

function OnUpdatePanelPage(updateHistory)
{
    floatingLoading.Start();
    OpenPanel();

    if (updateHistory) noPanelHistory++;

    // Show the back button if we have enough history now.
    if (noPanelHistory > 0)
        floatingPanelBack.classList.remove("hiddenBack");
    else
        floatingPanelBack.classList.add("hiddenBack");
}

function NavBack()
{
    noPanelHistory--;
    floatingPanelFrame.contentWindow.history.back();
    OnUpdatePanelPage(false);
}

function OpenPanel()
{
    panelOpen = true;
    floating.style.visibility = 'visible';
    DisableScroll();
}

function ClosePanel()
{
    panelOpen = false;
    noPanelHistory = 0;
    floating.style.visibility = 'collapse';
    EnableScroll();
}

function OnPanelLoad()
{
    let splitURL = document.URL.split('/');

    // Send the current parent page to the iframe - the menu may just ignore this. One place this is used by the "guitar view" page,
    // which needs to know whether it should hide the "View on Gear page" button if we're already on the gear page.
    floatingPanelFrame.contentWindow.postMessage(splitURL[splitURL.length - 1]);
    
    floatingPanelTitle.innerHTML = floatingPanelFrame.contentDocument.title;
    floatingLoading.Stop();
}

function UpdatePanelSizing() {
    if (currentPanelHeight >= window.innerHeight || window.innerWidth < 1000)
        floatingPanel.style.height = "100%";
    else
        floatingPanel.style.height = currentPanelHeight + "px";
}

function HandleMessage(msg) {
    let msgCode = msg[0];
    let msgContents = msg.substring(1);

    switch (msgCode)
    {
        // Listen out for a message from the page in the frame when it loads - this will not only tell us how tall to make the panel,
        // but will also confirm it's fully loaded.
        case '!':
            currentPanelHeight = parseInt(msgContents);
            UpdatePanelSizing();
            OnPanelLoad();
            break;
        // Zoom feature
        case '^':
            OpenZoom(msgContents.replace("../", "")); // Get rid of any ../s as they don't apply here.
            break;
        // Navigate To
        case '@':
            UpdatePanelPage(msgContents); // Get rid of any ../s as they don't apply here.
            break;
    }
}