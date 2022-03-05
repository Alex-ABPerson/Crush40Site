function DisableScroll()
{
    document.body.style.overflow = 'hidden';
}

function EnableScroll()
{
    document.body.style.overflow = 'auto';
}

// Navbar Mobile Menu
var navbar;
var navbarItems;
var navbarBtn;

window.addEventListener('load', () => {
    navbar = document.querySelector(".nav");
    navbarItems = document.querySelector(".nav .items");
    navbarBtn = document.querySelector(".nav .btn");

    navbarBtn.addEventListener('click', () => {
        if (navbar.classList.contains("navOpen"))
            CloseNavbar();
        else
            OpenNavbar();
    });

    window.addEventListener('resize', () => {
        if (navbar.classList.contains("navOpen") && window.innerWidth > 1040)
            CloseNavbar();
    });
});

function CloseNavbar()
{
    EnableScroll();
    navbar.classList.remove("navOpen");
}

function OpenNavbar()
{
    DisableScroll();
    navbar.classList.add("navOpen");
}

// Navbar "Current Page" selection
function UpdateNavbarPageSelection(id) {
    let item = document.querySelector(".nav .items #" + id);
    item.classList.add("selected");
}

// Floating Panel
var floating;
var floatingPanel;
var floatingLoading;
var floatingPanelTitle;
var floatingPanelFrame;
var floatingPanelBack;
var currentPanelHeight;
var panelOpen = false;
var noPanelHistory = 0;

window.addEventListener('load', () => {
    
    floating = document.querySelector(".floating");
    floatingLoading = document.querySelector(".floating .panel .loading-screen");
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
});

function UpdatePanelPage(newSrc)
{   
    let bothParts = newSrc.split('?');
    floatingPanelFrame.src = "menus/" + bothParts[0] + ".html" + (bothParts.length > 1 ? "?" + bothParts[1] : "");

    OnUpdatePanelPage(panelOpen);
}

function OnUpdatePanelPage(updateHistory)
{
    StartLoading(floatingLoading);
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
    floatingPanelTitle.innerHTML = floatingPanelFrame.contentDocument.title;   
    StopLoading(floatingLoading);
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

// Zoom
let zoom;
let zoomImg;

window.addEventListener('load', () => {
    zoom = document.querySelector("#zoom");
    zoomImg = document.querySelector("#zoomImg");

    for (let itm of document.querySelectorAll("[data-action='zoom']"))
    {
        itm.addEventListener('click', () => {
            DisableScroll();
            OpenZoom(itm.src);
        });
    }

    zoom.addEventListener('click', CloseZoom);
});

function OpenZoom(imgSrc)
{
    zoom.style.visibility = 'visible';
    zoomImg.src = imgSrc;
}

function CloseZoom()
{
    zoom.style.visibility = 'hidden';

    // If we're not in a menu, enable scrolling again.
    if (!panelOpen)
        EnableScroll();
}

// Parallax movement (e.g. guitar separator)
var backgroundParallax;

window.addEventListener('load', () => {
    
    backgroundParallax = document.querySelectorAll("[data-parallax]");

    window.addEventListener('scroll', () => {
        UpdateParallaxAll();
    });
    
    window.addEventListener('resize', () => {
        UpdateParallaxAll();
    });
    
    UpdateParallaxAll();
});

function UpdateParallaxAll()
{
    for (let i = 0; i < backgroundParallax.length; i++)
    {
        switch (backgroundParallax[i].dataset.parallax)
        {
            case "backgroundYRev":
                if (window.innerWidth < parseInt(backgroundParallax[i].dataset.parallaxChangeAt))
                    UpdateBackgroundParallaxX(backgroundParallax[i]);
                else
                    UpdateBackgroundParallaxYRev(backgroundParallax[i]);
                    
                break;
            case "backgroundY":
                UpdateBackgroundParallaxY(backgroundParallax[i]);
                break;
        }
        
    }
}

function UpdateBackgroundParallaxX(item)
{
    item.style.backgroundPosition = -window.scrollY / parseInt(item.dataset.parallaxSpeed) + "px 0%";
}

function UpdateBackgroundParallaxYRev(item)
{
    item.style.backgroundPosition = "0% " + item.getBoundingClientRect().top / parseInt(item.dataset.parallaxSpeed) + "px";
}

function UpdateBackgroundParallaxY(item)
{
    item.style.backgroundPosition = "0% " + -(item.getBoundingClientRect().top / parseInt(item.dataset.parallaxSpeed)) + "px";
}

// Parallax
/*window.addEventListener('load', () => {
    let parallaxed = document.querySelectorAll("[data-parallax-speed]")

    for (let para of parallaxed)
    {
        document.addEventListener('scroll', () => {            
            let yPos = -(document.scrollTop / para.dataset.parallaxSpeed);
            para.style.backgroundPosition = "50%" + yPos + 'px';

            $scroll.css({ backgroundPosition: coords });
        });
    }
});*/