let gtrElem;
let gtrImg;
let gtrTitle;
let gtrDesc;
let gtrPickupDesc;
let gtrPickups;
let belowGtr;
let otherJunGear;
let selectTitle;
let selectDesc;
let selectInfo;
let selectBasicPage;
let selectPickupPage;
let hoverPointsElem;
let currentGuitar;

var Guitars = {
    noGtr: {
        imgCentreOffset: 3
    },
    sonic: {
        title: "ESP GL 'SONIC'",
        desc: "The first 'Crush 40' guitar made, created for Jun due to his work in the game <i>Sonic Adventure</i>!",
        img: "img/content/guitars/GL-SONIC/Front.svg",
        imgBaseWidth: 2280.77,
        imgBaseHeight: 749.46,
        imgCentreOffset: -3,
        pickupHoverPoint: {
            left: 398,
            top: 275,
            width: 110,
            height: 200,
            title: "Bridge Pickup",
            pickups: [
                { type: "h", name: "Seymour Duncan JP" },
                { type: "s", name: "MONSTER" }
            ]
        },
        switchHoverPoint: {
            left: 675,
            top: 275,
            width: 80,
            height: 200,
            title: "Neck Pickup",
            desc: "This guitar has a <b>SCHECTER MONSTERTONE</b> pickup for the neck pickup!"
        },
        otherHoverPoints: [
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
                img: "img/content/guitars/ESPLogo.svg",
                desc: `
                    <p>Unlike the <i>20th Anniversary Edition</i>, the original version of this guitar has an ESP logo on its headstock.</p>
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
        title: "ESP STH-130",
        desc: "A <b>20th Anniversary edition</b> variant of the classic <i>ESP GL 'SONIC'</i>!",
        img: "img/content/guitars/GL-SONIC/FrontAnniversary.svg",
        imgBaseWidth: 2280.77,
        imgBaseHeight: 749.46,
        imgCentreOffset: -3
    },
    sonicii: {
        title: "ESP SONIC-II",
        desc: "The most common guitar Jun uses at Crush 40 shows, often used for any song!",
        img: "img/content/guitars/Sonic-II/Front.svg",
        imgBaseWidth: 2267.15,
        imgBaseHeight: 730.6,
        imgCentreOffset: 0,
    },
    sn25th: {
        title: "ESP SN-25th",
        desc: "A <b>25th Anniversary edition</b> variant of the <i>ESP SONIC-II</i>!",
        img: "img/content/guitars/Sonic-II/FrontAnniversary.svg",
        imgBaseWidth: 2281.16,
        imgBaseHeight: 730.6,
        imgCentreOffset: 0,
    },
    shadowii: {
        title: "ESP SHADOW-II",
        desc: "Jun's 'Shadow the Hedgehog' guitar, commonly used for tracks like 'I Am... All of Me' and 'Never Turn Back'!",
        img: "img/content/guitars/Shadow-II/Front.svg",
        imgBaseWidth: 2313.42,
        imgBaseHeight: 730.6,
        imgCentreOffset: 0,
    },
    sd15th: {
        title: "ESP SD-15th",
        desc: "A <b>25th Anniversary edition</b> variant of the <i>ESP SHADOW-II</i>!",
        img: "img/content/guitars/Shadow-II/FrontAnniversary.svg",
        imgBaseWidth: 2313.42,
        imgBaseHeight: 730.6,
        imgCentreOffset: 0,
    },
    shadow: {
        title: "ESP VIPER 'SHADOW'",
        desc: "An ESP 'Viper' guitar with a <i>Shadow the Hedgehog</i> symbol on it!",
        img: "img/content/guitars/ViperShadow/Front.svg",
        imgBaseWidth: 2281.16,
        imgBaseHeight: 730.6,
        imgCentreOffset: 2,
    },
    knight: {
        title: "ESP MR 'Black Knight'",
        desc: "An ESP 'MR' guitar with <i>Black Knight</i> graphics on it!",
        img: "img/content/guitars/BlackKnight/Front.svg",
        imgBaseWidth: 2281.16,
        imgBaseHeight: 730.6,
        imgCentreOffset: -3,
    },
    c82: {
        title: "ESP SEC '82 Custom'",
        desc: "An ESP 'SEC' guitar with parodies of already existing logos, in the theme of NASCAR Arcade!",
        img: "img/content/guitars/82/Front.svg",
        imgBaseWidth: 2281.16,
        imgBaseHeight: 730.6,
        imgCentreOffset: -3,
    }
};

window.addEventListener('load', () => {
    InitPage("navGear");

    gtrElem = document.querySelector("#gtrElem");
    gtrImg = document.querySelector("#gtrImg");
    gtrTitle = document.querySelector("#gtrTitle");
    gtrDesc = document.querySelector("#gtrDesc");
    gtrPickupDesc = document.querySelector("#gtrPickupDesc");
    gtrPickups = document.querySelector("#gtrPickups");
    otherJunGear = document.querySelector("#otherJunGear");
    selectImg = document.querySelector("#selectImg");
    selectTitle = document.querySelector("#selectTxt");
    selectDesc = document.querySelector("#selectDesc");
    selectInfo = document.querySelector("#selectInfo");
    selectBasicPage = document.querySelector("#selectBasicPage");
    selectPickupPage = document.querySelector("#selectPickupPage");
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
            if (currentGuitar == Guitars.noGtr)
            {
                gtrElem.classList.add('guitarNoBg');

                gtrImg.addEventListener('load', UpdateHoverPoints);
                window.addEventListener('resize', UpdateHoverPoints);
            }

            ChangeTo(Guitars[gtr.dataset.id]);
        });

    // Setup the "guitarless" view
    currentGuitar = Guitars.noGtr;
    ViewBasicDetails({ title: "Choose a guitar!", desc: "Choose a guitar above to view more details here!" })
    UpdateGtrMargin();

    window.addEventListener('resize', UpdateGtrMargin);
    gtrImg.addEventListener('load', UpdateGtrMargin);
});

function ChangeTo(gtr)
{
    currentGuitar = gtr;

    // Populate basic details
    PopulateBasicDetails(gtr);

    // Handle guitar details
    ViewDefaultDetails();
    belowGtr.classList.remove("noGtr");
    otherJunGear.classList.remove("noGtrAbove");

    // Handle hover points
    hoverPointsElem.replaceChildren();
    hoverPointsElem.appendChild(GenerateTouchPoint(gtr.pickupHoverPoint, d => ViewPickupDetails(d)));
    hoverPointsElem.appendChild(GenerateTouchPoint(gtr.switchHoverPoint, d => ViewSwitchDetails()));
    for (let hoverPoint of gtr.otherHoverPoints)
        hoverPointsElem.appendChild(GenerateTouchPoint(hoverPoint, d => ViewBasicDetails(d)));
}

function PopulateBasicDetails(gtr)
{
    gtrImg.src = gtr.img;
    gtrTitle.innerHTML = gtr.title;
    gtrDesc.innerHTML = gtr.desc;
}

function GenerateTouchPoint(data, clickHandler)
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

        clickHandler(data);
    });

    return elem;
}

function UpdateGtrMargin()
{
    let val = (gtrImg.offsetHeight / 2 + currentGuitar.imgCentreOffset) + "px";
    belowGtr.style.setProperty("--guitar-half-height", val);
    belowGtr.style.marginTop = "-" + val;
}

function UpdateHoverPoints()
{
    UpdateHoverPointPos(currentGuitar.pickupHoverPoint);
    UpdateHoverPointPos(currentGuitar.switchHoverPoint);
    for (let hoverPoint of currentGuitar.otherHoverPoints)
        UpdateHoverPointPos(hoverPoint);
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

function ViewDefaultDetails() { ViewBasicDetails({ title: "Tap something!", desc: "Tap something on the guitar to find out about it here!" })}
function ViewBasicDetails(point)
{
    ShowDetailsPage(selectBasicPage);

    if (point.img)
    {
        selectImg.classList.remove("hidden");
        selectImg.src = point.img;
    }
    else
        selectImg.classList.add("hidden");

    selectTitle.innerHTML = point.title;
    selectDesc.innerHTML = point.desc;
}

function ShowDetailsPage(focus)
{
    // Hide all the pages
    for (let page of selectInfo.querySelectorAll(".page"))
        page.classList.add("hidden");
    
    focus.classList.remove("hidden");
}

// Pickups
function ViewPickupDetails(data)
{
    ShowDetailsPage(selectPickupPage);

    gtrPickupDesc.innerHTML = "This guitar has a <b>" + data.title + "</b> layout for pickups.";

    gtrPickups.replaceChildren();
    for (let pickup of data.pickups)
    {
        // Create the pickup element
        let pickupEle = document.createElement('div');
        pickupEle.classList.add("pickup");

        // Pickup type
        let typeEle = document.createElement('p');
        typeEle.classList.add("type");
        typeEle.innerText = GetPickupTypeName(pickup.type);
        pickupEle.appendChild(typeEle);

        // Pickup title
        let titleEle = document.createElement('h3');
        titleEle.classList.add("title");
        titleEle.innerText = pickup.name;
        pickupEle.appendChild(titleEle);

        gtrPickups.appendChild(pickupEle);
    }
}

function GetPickupTypeName(type)
{
    switch (type)
    {
        case 'h':
            return "Humbucker";
        case 's':
            return "Single";
        default:
            return "Other";
    }
}

// Switch
function ViewSwitchDetails(data)
{

}