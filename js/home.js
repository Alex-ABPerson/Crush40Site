// Headstock snapping - so it doesn't weirdly line up with frets.
var headstockRight;

window.addEventListener('load', () => {

    headstockRight = document.querySelector(".headstock-right");

    // Remove default CSS
    headstockRight.style.right = "unset";

    window.addEventListener('resize', () => {
        UpdatePos();
    });

    UpdatePos();
});

function UpdatePos() {
    headstockRight.style.left = "calc(" + ((Math.ceil(window.innerWidth / 23) * 23)) + "px - var(--offset-from-right)";
}