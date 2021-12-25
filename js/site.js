// Floating Panel
var floating;
var floatingPanel;
var floatingPanelPages;
var panelButtons;

window.addEventListener('load', () => {
    
    floating = document.querySelector(".floating");
    floatingPanel = document.querySelector(".floating .panel");
    floatingPanelPages = document.querySelectorAll(".floating .panel .page");
    panelButtons = document.querySelectorAll("[data-action='panel']");

    for (let btn of panelButtons)
    {
        btn.addEventListener('click', () => {
            floating.style.visibility = 'visible'; // Preventing input presses
            floatingPanel.style.visibility = 'visible';

            for (let page of floatingPanelPages)
                page.style.visibility = page.dataset.pageName == btn.dataset.pageName ? 'visible' : 'hidden';
        });
    }
});

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
            case "backgroundY":
                if (window.innerWidth < parseInt(backgroundParallax[i].dataset.parallaxChangeAt))
                    UpdateBackgroundParallaxX(backgroundParallax[i]);
                else
                    UpdateBackgroundParallaxY(backgroundParallax[i]);
                    
                break;
            case "backgroundX":
                if (window.innerWidth < parseInt(backgroundParallax[i].dataset.parallaxChangeAt))
                    UpdateBackgroundParallaxY(backgroundParallax[i]);
                else
                    UpdateBackgroundParallaxX(backgroundParallax[i]);

                break;
        }
        
    }
}

function UpdateBackgroundParallaxX(item)
{
    item.style.backgroundPosition = -window.scrollY / parseInt(item.dataset.parallaxSpeed) + " 0%";
}

function UpdateBackgroundParallaxY(item)
{
    item.style.backgroundPosition = "0% " + -window.scrollY / parseInt(item.dataset.parallaxSpeed);
}