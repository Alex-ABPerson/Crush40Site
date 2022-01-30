// Features
let features = [
    { 
        img: "PowerPlay1998.jpg",
        desc: "Hmm",
        tracks: [
            { t: "Open Your Heart" }
        ]
    },
    { img: "SongsWithAttitude.jpg" },
    { img: "10thAnniversary.jpg" },
    { img: "SA2VocalCollection.jpg" },
    { img: "MultiDimensionalSA2.jpg" },
    { img: "SegaCon.jpg" }
];

window.addEventListener('load', () => {
    UpdateNavbarPageSelection("navDiscography");

    let featureList = document.querySelector("#featureList");

    for (let i in features)
    {
        let newElem = document.createElement("li");
        newElem.classList.add("feature");
        newElem.dataset.index = i;

        let newElemImg = document.createElement("img");
        newElemImg.src = "img/content/discography/features/" + features[i].img;

        newElem.appendChild(newElemImg);
        featureList.appendChild(newElem);
    }
});