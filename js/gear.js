let gtrImg;
let belowGtr;

var Guitars = {
    sonic: {
        img: "img/content/guitars/GL-SONIC/Front.svg"
    }
};

window.addEventListener('load', () => {
    UpdateNavbarPageSelection("navGear");

    gtrImg = document.querySelector("#gtrImg");
    belowGtr = document.querySelector("#belowGtr");

    // Register all the guitar presses. 
    let guitars = document.querySelectorAll(".guitar");
    for (let gtr of guitars)
        gtr.addEventListener('click', () => {
            // Deselect everyone else
            for (let deselectGtr of guitars)            
                deselectGtr.classList.remove("selected");

            gtr.classList.add("selected");

            ChangeTo(Guitars[gtr.dataset.id]);
        });

    UpdateGtrMargin();

    window.addEventListener('resize', () => {
        UpdateGtrMargin();
    });
});

function ChangeTo(gtr)
{
    gtrImg.src = gtr.img;
    UpdateGtrMargin();
}

function UpdateGtrMargin()
{
    belowGtr.style.marginTop = "-" + (gtrImg.offsetHeight / 2 + 5) + "px";
}