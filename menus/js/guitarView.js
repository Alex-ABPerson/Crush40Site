let gearPageNav;
let gtrList;
let performancesList;

let Guitars = {
    sonic: {
        title: "ESP GL 'SONIC'"
    },
    sonicii: {
        title: "ESP SONIC-II"
    }
};

window.addEventListener('load', () => {
    gearPageNav = document.querySelector("#gearPageNav");
    gtrList = document.querySelector("#guitarList");
    performancesList = document.querySelector("#performancesList");

    window.addEventListener('message', (e) => {
        if (e.data.includes("gear.php"))
            gearPageNav.classList.add("hiddenNav");
    });

    PopulateGtrList();

    let afterG = document.URL.split('?')[1].substring(2); // Trim off the "g="
    if (afterG != "") SelectGtrByID(afterG);

    window.parent.postMessage('!700px', '*');
});

function PopulateGtrList()
{
    gtrList.replaceChildren();

    for (let gtr of Object.keys(Guitars))
    {
        let newItm = document.createElement("li");
        newItm.addEventListener('click', () => {

            for (let gtrItm of gtrList.querySelectorAll("li"))
                gtrItm.classList.remove("selected");

            newItm.classList.add("selected");
            Populate(Guitars[gtr])
        });
        newItm.dataset.gtr = gtr; // Used for opening to a specific guitar

        let newItmPara = document.createElement("p");
        newItmPara.innerHTML = Guitars[gtr].title;

        newItm.appendChild(newItmPara);
        gtrList.appendChild(newItm);
    }
}

function SelectGtrByID(gtr)
{
    // Select the item in the guitar list
    let gtrItm = gtrList.querySelector("[data-gtr='" + gtr + "']");
    gtrItm.classList.add("selected");

    Populate(gtr);
}

function Populate(gtr)
{
    // Populate performances list

    
}