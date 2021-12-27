// Headstock snapping - so it doesn't weirdly line up with frets.
var headstockRight;

window.addEventListener('load', () => {

    headstockRight = document.querySelector(".headstock-right");

    // Remove default CSS
    headstockRight.style.right = "unset";

    window.addEventListener('resize', () => {
        headstockRight.style.left = ((Math.ceil(window.innerWidth / 23) * 23) - 140) + "px";
    });
});