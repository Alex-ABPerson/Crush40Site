// Headstock snapping - so it doesn't weirdly line up with frets.
window.addEventListener('load', () => {

    let headstocks = document.querySelectorAll(".headstock-right");

    for (let headstock of headstocks)
    {
        // Remove default CSS
        headstock.style.right = "unset";

        window.addEventListener('resize', () => {
            UpdatePos(headstock);
        });

        UpdatePos(headstock);
    }

    UpdateNavbarPageSelection("navAbout");
});

function UpdatePos(headstock) {
    let snapSize = parseInt(getComputedStyle(headstock).getPropertyValue("--snap-size"));
    headstock.style.left = "calc(" + ((Math.ceil(window.innerWidth / snapSize) * snapSize)) + "px - var(--offset-from-right)";
}