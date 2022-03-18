let gtrElem;
let gtrImg;
let belowGtr;
let selectTitle;
let selectDesc;
let hoverPointsElem;
let currentGuitar;

var Guitars = {
    sonic: {
        img: "img/content/guitars/GL-SONIC/Front.svg",
        imgBaseWidth: 2284.64,
        imgBaseHeight: 749.46,
        hoverPoints: [
            {
                left: 398,
                top: 275,
                width: 110,
                height: 200,
                title: "Bridge Pickup",
                desc: "In line with most of Jun's guitars, this guitar has a <b>Seymour Duncan TB-4</b> pickup for the bridge!"
            },
            {
                left: 675,
                top: 275,
                width: 80,
                height: 200,
                title: "Neck Pickup",
                desc: "This guitar has a <b>SCHECTER MONSTERTONE</b> pickup for the neck pickup!"
            },
            {
                left: 790,
                top: 295,
                width: 1050,
                height: 160,
                title: "Fingerboard",
                desc: `
                    <p><i>Number of frets</i>: This guitar has <b>22 frets</b></p>
                    <p><i>Material</i>: The fingerboard is made of <b>Ebony</b> wood</p>
                `
            },
            {
                left: 2150,
                top: 180,
                width: 100,
                height: 50,
                rotLeft: 35,
                title: "ESP Logo",
                desc: `
                    <p>The ESP Logo.</p>
                `
            },
            {
                left: 1920,
                top: 320,
                width: 330,
                height: 100,
                rotLeft: 36,
                title: "Tuning",
                desc: `
                    <p>This guitar uses <b>GOTOH SG360-07</b> tuners.</p>
                `
            }
        ]
    },
    sth130: {
        img: "img/content/guitars/STH-130/Front.svg"
    },
    sonicii: {
        img: "img/content/guitars/Sonic-II/Front.svg"
    },
    sn25th: {
        img: "img/content/guitars/SN-25th/Front.svg"
    }
};

window.addEventListener('load', () => {
    UpdateNavbarPageSelection("navGear");

    gtrElem = document.querySelector("#gtrElem");
    gtrImg = document.querySelector("#gtrImg");
    selectImg = document.querySelector("#selectImg");
    selectTitle = document.querySelector("#selectTxt");
    selectDesc = document.querySelector("#selectDesc");
    belowGtr = document.querySelector("#belowGtr");
    hoverPointsElem = document.querySelector("#hoverPoints");

    // Register all the guitar presses. 
    let guitars = document.querySelectorAll(".guitarBtn");
    for (let gtr of guitars)
        gtr.addEventListener('click', () => {
            // Deselect everyone else
            for (let deselectGtr of guitars)
                deselectGtr.classList.remove("selected");

            gtr.classList.add("selected");

            // If we didn't previously have a guitar, start listening for touch point adjustments and remove BG
            if (!currentGuitar)
            {
                gtrElem.classList.add('guitarNoBg');

                window.addEventListener('resize', () => {
                    for (let hoverPoint of currentGuitar.hoverPoints)
                        UpdateHoverPointPos(hoverPoint);
                });
            }

            ChangeTo(Guitars[gtr.dataset.id]);
        });

    UpdateGtrMargin();

    window.addEventListener('resize', () => {
        UpdateGtrMargin();
    });
});

function ChangeTo(gtr)
{
    // Ensure we are showing guitar details now
    belowGtr.classList.remove("noGtr");

    ViewDefaultDetails();

    currentGuitar = gtr;
    gtrImg.src = gtr.img;

    hoverPointsElem.replaceChildren();
    for (let hoverPoint of gtr.hoverPoints)
        hoverPointsElem.appendChild(GenerateTouchPoint(hoverPoint));

    UpdateGtrMargin();
}

function GenerateTouchPoint(data)
{
    let elem = document.createElement("div");
    elem.classList.add("point");
    
    if (data.rotLeft)
        elem.style.transform = "rotateZ(-" + data.rotLeft + "deg)";

    data.elem = elem;

    UpdateHoverPointPos(data);

    elem.addEventListener('click', () => {
        // Deselect everything else
        for (let itm of hoverPointsElem.querySelectorAll('*'))
            itm.classList.remove("selected");

        // Select this
        elem.classList.add("selected");

        // View its details
        ViewDetailsOf(data);
    });

    return elem;
}

function UpdateGtrMargin()
{
    let val = (gtrImg.offsetHeight / 2 + 5) + "px";
    belowGtr.style.setProperty("--guitar-half-height", val);
    belowGtr.style.marginTop = "-" + val;
}

function UpdateHoverPointPos(point)
{
    let elem = point.elem;

    // Calculate the positions they should go with the current screen size's scaling on the image.
    let xStretch = gtrImg.clientWidth / currentGuitar.imgBaseWidth;
    elem.style.left = (point.left + 20) * xStretch + "px";
    elem.style.width = point.width * xStretch + "px";

    let yStretch = gtrImg.clientHeight / currentGuitar.imgBaseHeight;
    elem.style.top = point.top * yStretch + "px";
    elem.style.height = point.height * yStretch + "px";
}

function ViewDefaultDetails() { ViewDetailsOf({ title: "Tap something!", desc: "Tap something on the guitar to find out about it details about it!" })}
function ViewDetailsOf(point)
{
    if (!point.img)
        selectImg.classList.add("hidden");

    selectTitle.innerHTML = point.title;
    selectDesc.innerHTML = point.desc;
}