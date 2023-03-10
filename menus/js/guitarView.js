let gearPageNav;
let gtrList;
let performancesList;

let Guitars = {
    gl_sonic: {
        title: "ESP GL 'SONIC'",
        performances: [
            { id: "sap" },
            { id: "tgs08" },
            { id: "sos10" },
            { id: "sb11" },
            { id: "t11" },
            { id: "t12" },
            { id: "sb12" },
            { id: "sos12" },
            { id: "jgmf13" },
            { id: "sb13" },
            { id: "twoNights" },
            { id: "expoTNT" },
            { id: "joypolis15" },
            { id: "youmacon15", d: "He used a fans' guitar here!" },
            //{ id: "sonic25th" },
            //{ id: "sos16" },
            //{ id: "puma18" },
            { id: "jgmf18" }, // ??
            //{ id: "sega60th" },
            { id: "symphony" }
        ]
    },
    ii_sonic: {
        title: "ESP SONIC-II",
        performances: [
            { id: "tgs08" },
            { id: "sos10" },
            { id: "sb11" },
            { id: "t11" },
            { id: "t12" },
            { id: "sb12" },
            { id: "sos12" },
            { id: "jgmf13" },
            { id: "sb13" },
            { id: "twoNights" },
            { id: "expoTNT" },
            { id: "joypolis15" },
            { id: "youmacon15", d: "He used a fans' guitar here!" },
            //{ id: "sonic25th" },
            //{ id: "sos16" },
            //{ id: "puma18" },
            { id: "jgmf18" }, // ??
            //{ id: "sega60th" },
            { id: "symphony" }
        ]
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

    // Don't select if we were for whatever given an invalid ID.
    if (gtrItm == null) return;
    gtrItm.classList.add("selected");

    Populate(gtr);
}

function Populate(gtr)
{
    // Populate performances list
    PopulatePerformances(gtr);
    
}

function PopulatePerformances(gtr)
{
    performancesList.replaceChildren();
    
    for (let performance of gtr.performances)
    {
        let gig = Crush40Performances[performance.id];

        let newPerf = document.createElement("li");
        newPerf.classList.add("performance");

        let main = document.createElement("div");
        main.classList.add("main");

        // Title
        let title = document.createElement("p");
        title.classList.add("title");
        title.innerText = gig.n;
        main.appendChild(title);

        // Year
        let year = document.createElement("p");
        year.classList.add("year");
        year.innerHTML = "<b>" + gig.y + "</b>";
        main.appendChild(year);

        newPerf.appendChild(main);

        // Description
        if (performance.d)
        {
            let desc = document.createElement("p");
            desc.classList.add("description");
            desc.innerHTML = performance.d;
            newPerf.appendChild(desc);
        }

        performancesList.appendChild(newPerf);
    }
}