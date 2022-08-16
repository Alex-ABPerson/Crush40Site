let gearPageNav;
let gtrList;

let Guitars = {
    sonic: {
        title: "ESP GL 'SONIC'"
    }
};

window.addEventListener('load', () => {
    gearPageNav = document.querySelector("#gearPageNav");
    gtrList = document.querySelector("#guitarList");

    window.addEventListener('message', (e) => {
        if (e.data.includes("gear.php"))
            gearPageNav.classList.add("hiddenNav");
    });

    let afterG = document.URL.split('?')[1].substring(2); // Trim off the "g="
    if (afterG != "") SelectGtrByID(gtr);

    PopulateGtrList();

    window.parent.postMessage('!700px', '*');
});

function PopulateGtrList()
{
    gtrList.replaceChildren();

    for (let gtr of Object.keys(Guitars))
    {
        let newItm = document.createElement("li");
        newItm.addEventListener('click', () => Populate(Guitars[gtr]));
        newItm.dataset.gtr = gtr; // Used for opening to a specific guitar

        let newItmPara = document.createElement("p");
        newItmPara.innerHTML = Guitars[gtr].title;

        newItm.appendChild(newItmPara);
        gtrList.appendChild(newItm);
    }
}

function SelectGtrByID(gtr)
{
    // Find the item in the guitar list
}

function Populate(gtr)
{
    
}