// Features
let features = [
    { 
        title: "SONICTEAM \"PowerPlay\"",
        desc: "This is a compilation of tracks produced by Sonic Team at the time - primilarly the songs they produced for the <i>Sega Saturn</i>.",
        img: "PowerPlay1998.jpg",
        tracks: [
            { t: "Open Your Heart", d: "This was featured as a <i>hidden track</i> on CD - as Sonic Adventure would not come out until another three weeks after." }
        ]
    },
    { 
        title: "SONICTEAM \"PowerPlay\"",
        desc: "This is a compilation of tracks produced by Sonic Team at the time - primilarly the songs they produced for the <i>Sega Saturn</i>.",
        img: "SongsWithAttitude.jpg",
        tracks: [
            { t: "Open Your Heart", d: "This was featured as a <i>hidden track</i> on CD - as Sonic Adventure would not come out until another three weeks after." }
        ]
    },
    { img: "10thAnniversary.jpg" },
    { img: "SA2VocalCollection.jpg" },
    { img: "MultiDimensionalSA2.jpg" },
    { img: "SegaCon.jpg" }
];

let featureInfo;
let featureInfoTitle;
let featureInfoDescription;
let featureInfoTracks;
let selectedFeatureItemTxt;

window.addEventListener('load', () => {
    UpdateNavbarPageSelection("navDiscography");

    featureInfo = document.querySelector("#featureInfo");
    featureInfoTitle = document.querySelector("#featureTitle");
    featureInfoDescription = document.querySelector("#featureDescription");
    featureInfoTracks = document.querySelector("#featureTracks");

    let featureList = document.querySelector("#featureList");

    for (let feature of features)
    {
        let newElem = document.createElement("li");
        newElem.classList.add("feature");

        let newElemImg = document.createElement("img");
        newElemImg.src = "img/content/discography/features/" + feature.img;
        newElem.appendChild(newElemImg);

        let newElemHover = document.createElement("div");
        newElemHover.classList.add("hover");

        // TODO: Add toggle closing!
        let newElemHoverTxt = document.createElement("p");
        newElemHoverTxt.innerText = "Expand";
        newElemHover.appendChild(newElemHoverTxt);

        newElem.appendChild(newElemHover);

        newElem.addEventListener('click', () => {

            // If it's already selected, close it.
            if (newElemHoverTxt == selectedFeatureItemTxt)
            {
                HideFeatureInfo();
                return;
            }

            // Deselect everyone
            DeselectFeatures();

            // Select this one
            selectedFeatureItemTxt = newElemHoverTxt;
            selectedFeatureItemTxt.innerText = "Close";
            newElem.classList.add("selected");

            // Display the details
            ViewFeatureDetails(feature);
        });

        document.querySelector("#featureInfoClose").addEventListener('click', HideFeatureInfo);

        featureList.appendChild(newElem);
    }
});

function DeselectFeatures()
{
    for (let itm of featureList.querySelectorAll("li"))
        itm.classList.remove("selected");

    if (selectedFeatureItemTxt)
        selectedFeatureItemTxt.innerText = "Expand";

    selectedFeatureItemTxt = null;
}

function ViewFeatureDetails(feature)
{
    ShowFeatureInfo();
    featureInfoTitle.innerText = feature.title;
    featureInfoDescription.innerHTML = feature.desc;
    
    featureInfoTracks.replaceChildren();
    for (let track of feature.tracks)
    {
        let newTrack = document.createElement("li");
        newTrack.classList.add("track");

        let trackTitle = document.createElement("h4");
        trackTitle.innerText = track.t;
        newTrack.appendChild(trackTitle);

        if (track.d)
        {
            let trackDescription = document.createElement("p");
            trackDescription.innerHTML = track.d;
            newTrack.appendChild(trackDescription);
        }

        featureInfoTracks.appendChild(newTrack);
    }
}

function ShowFeatureInfo()
{
    featureInfo.style.visibility = 'visible';
    featureInfo.style.width = "var(--open-width)";
}

function HideFeatureInfo()
{
    DeselectFeatures();

    featureInfo.style.visibility = 'collapse';
    featureInfo.style.width = "0";
}