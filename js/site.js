const headerHTML = `
<div class="GSBackContainer"><div class="GSBack" data-parallax="backgroundY" data-parallax-speed="2"></div></div>

<!-- Navbar -->
<nav class="global-nav"></nav>
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

<div class="global-menu"></div>
<div class="global-zoom"></div>
`;

// Allows different components to lock/unlock the scroll bar of the website.
class PageScrollHandler {
    lockCount = 0

    AddOneNoScroll()
    {
        this.lockCount++;
        document.body.style.overflow = 'hidden';
    }
    
    ReleaseOneNoScroll()
    {
        if (this.lockCount == 0) throw "Attempted to disable scrolling more times than it's enabled.";
        this.lockCount--;
        if (this.lockCount == 0) document.body.style.overflow = 'auto';
    }
} 

var menuPanel;
function InitPage(navbarID)
{
    // Insert header + footer
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
    document.body.insertAdjacentHTML('beforeend', footerHTML);

    // Setup everything
    let scrollHandler = new PageScrollHandler();
    let zoomHandler = new ZoomPanel(document.querySelector(".global-zoom"), scrollHandler);
    menuPanel = new FloatingMenuPanel(document.querySelector(".global-menu"), zoomHandler, scrollHandler);
    let navbar = new Navbar(document.querySelector(".global-nav"), navbarID, scrollHandler);

    SetupParallax();
    SetupAnim();
}

// Parallax movement (e.g. guitar separator)
function SetupParallax() {
    
    let backgroundParallax = document.querySelectorAll("[data-parallax]");

    for (let itm of backgroundParallax)
    {
        let handler;
        
        switch (itm.dataset.parallax)
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
