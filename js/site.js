// Parallax movement (e.g. guitar separator)
var backgroundParallax;

window.addEventListener('load', () => {

    backgroundParallax = document.querySelectorAll("[data-parallax='background']");

    window.addEventListener('scroll', () => {
        UpdateParallaxAll();
    });

    UpdateParallaxAll();
});

function UpdateParallaxAll()
{
    // Temporary: Stop the parallax on small screens
    if (window.innerWidth < 1000) return;
        
    for (let i = 0; i < backgroundParallax.length; i++)
    {
        backgroundParallax[i].style.backgroundPosition = "0% " + -window.scrollY / parseInt(backgroundParallax[i].dataset.parallaxSpeed);
    }
}