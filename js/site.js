const headerHTML = `
<div class="GSBackContainer"><div class="GSBack" data-parallax="backgroundY" data-parallax-speed="2"></div></div>

<!-- Navbar -->
<nav class="nav">
    <div class="other">
        <img class="logo" src="img/logo_white.svg" alt="Crush 40 Logo">
        <button class="btn" title="Toggle Navigation Menu"><img src="img/icons/hamburgerMenu.svg" alt="Menu Icon"></button>
    </div>

    <ul class="items">
        <li id="navAbout">
            <div class="back"></div>
            <a href="index.html"><p>About</p></a>
        </li>
        <li id="navDiscography">
            <div class="back"></div>
            <a href="discography.html"><p>Discography</p></a>
        </li>
        <li id="navGear">
            <div class="back"></div>
            <a href="gear.html"><p>Gear</p></a>
        </li>
        <li id="navMerch">
            <div class="back"></div>
            <a href="https://johnnygmerch.com" target="_blank"><p>Merch</p></a>
        </li>
        <!--<li id="navShows">
            <div class="back"></div>
            <p>Shows</p>
        </li>
        <li id="navBranding">
            <div class="back"></div>
            <p>Branding</p>
        </li>
        <li id="navHistory">
            <div class="back"></div>
            <p>History</p>
        </li>-->
    </ul>
</nav>
`;

const footerHTML = `
<!-- Footer -->
<div class="footer section" data-action="panel" data-page-name="credits">
    <img class="image" src="img/logo/FanWebsiteLogo.svg" alt="Crush 40 Logo">
    <div class="text">
        <p>This entire site was created completely from scratch by the <b>Crush 40 Fan Community</b> - no templates, no website builder, just raw work from the community!</p>
        <p>Click here to see a list of the project leads who helped most of all to make this website come to life on your screen today!</p>
    </div>
</div>

<div class="floating">
    <div class="floatingClose"></div>
    <div class="panel" id="myPanel">
        <div class="titlebar">
            <button id="backButton" title="Back" class="back iconButton"><img src="img/icons/smallBackButton.svg" alt="Back Icon"></button>
            <p class="title">Loading...</p>
            <button title="Close" class="close iconButton"><img src="img/icons/smallCloseButton.svg" alt="Close Icon"></button>
        </div>

        <div class="loading-screen">
            <p class="loading-text"><b>Revvin' Up</b> the engines!</p>
            <div class="spinning"></div>
        </div>

        <iframe title="Menu Contents" class="contents" src=""></iframe>
    </div>
</div>

<div class="zoom" id="zoom">
    <img id="zoomImg" />
</div>
`;

var addedLoadEvents = [];
function AddLoadLogic(eve)
{
	addedLoadEvents.push(eve);
}

function DisableScroll()
{
    document.body.style.overflow = 'hidden';
}

function EnableScroll()
{
    document.body.style.overflow = 'auto';
}

window.addEventListener('load', () => {
	// Insert header + footer
	document.body.insertAdjacentHTML('afterbegin', headerHTML);
	document.body.insertAdjacentHTML('beforeend', footerHTML);
	
	// Setup everything
	SetupNavbar();
	SetupFloating();
	SetupZoom();
	SetupParallax();
	SetupAnim();
	
	// Call the load for everything registered
	for (let toLoad of addedLoadEvents)
		toLoad();
});

// Navbar Mobile Menu
var navbar;
var navbarItems;
var navbarBtn;

function SetupNavbar()
{
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
}

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

function SetupFloating() {
    
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
}

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
    let splitURL = document.URL.split('/');

    // Send the current parent page to the iframe - the menu may just ignore this. One place this is used by the "guitar view" page,
    // which needs to know whether it should hide the "View on Gear page" button if we're already on the gear page.
    floatingPanelFrame.contentWindow.postMessage(splitURL[splitURL.length - 1]);
    
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

function SetupZoom() {
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
}

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

function SetupParallax() {
    
    backgroundParallax = document.querySelectorAll("[data-parallax]");

    for (let i = 0; i < backgroundParallax.length; i++)
    {
        let itm = backgroundParallax[i];
        let handler;
        
        switch (backgroundParallax[i].dataset.parallax)
        {
            case "backgroundYRev":
                handler = () => UpdateBackgroundParallaxYRev(itm);
                break;
            case "backgroundY":
                handler = () => UpdateBackgroundParallaxY(itm);
                break;
        }

        window.addEventListener('scroll', handler);
        window.addEventListener('resize', handler);
        handler();
    }
}

function UpdateBackgroundParallaxX(item)
{
    item.style.backgroundPosition = -window.scrollY / parseInt(item.dataset.parallaxSpeed) + "px 0%";
}

function UpdateBackgroundParallaxYRev(item)
{
    if (window.innerWidth < parseInt(item.dataset.parallaxChangeAt))
        UpdateBackgroundParallaxX(item);
    else
        item.style.backgroundPosition = "0% " + item.getBoundingClientRect().top / parseInt(item.dataset.parallaxSpeed) + "px";
}

function UpdateBackgroundParallaxY(item)
{
    item.style.backgroundPosition = "0% " + -(item.getBoundingClientRect().top / parseInt(item.dataset.parallaxSpeed)) + "px";
}

// Animation
// The animation engine marks all the children marked with "data-anim"
// on "data-anim-marker" elements!
var toAnim;
var triggerPoint;

function SetupAnim() {
    let elems = document.querySelectorAll("[data-anim-point='s']");
    toAnim = Array.from(elems);

    // Ensure the items are ordered by their y-position
    toAnim.sort((a, b) => { b.getBoundingClientRect().y - a.getBoundingClientRect().y });

    window.addEventListener('resize', UpdateAnimTrigger);
    UpdateAnimTrigger();

    window.addEventListener('scroll', CheckForNextAnimTrigger);
}

function UpdateAnimTrigger()
{
    triggerPoint = window.innerHeight / 2;
    CheckForNextAnimTrigger();
}

function CheckForNextAnimTrigger()
{
    if (toAnim.length > 0)
    {
        if (toAnim[0].getBoundingClientRect().y <= triggerPoint)
        {
            TriggerAnimation(toAnim.shift());
            CheckForNextAnimTrigger();
        }

        // If we hit the bottom, trigger everyone who remains
        else if (window.scrollY + window.innerHeight == document.body.scrollHeight)
        {
            for (let itm of toAnim)
                TriggerAnimation(itm);
            toAnim = null;
        }
    }
}

function TriggerAnimation(itm)
{
    let children = itm.querySelectorAll("[data-anim='y']");
    for (let child of children)
        child.classList.add("_anim");
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
