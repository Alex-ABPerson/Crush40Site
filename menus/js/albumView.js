// General
let title;
let description;
let statYear;
let statTracks;
let statLength;
let trackList;
let physicalCover;
let physicalBack;
let physicalTray;
let physicalBooklet;
let physicalObiImg;
let physicalObiRightTranslation;
let physicalObiMiddleTranslation;
let physicalObiLeftTranslation;
let bookletNavLeft;
let bookletNavRight;

let a = {
    title: "abc",
    description: "a",
    releaseYear: 2007,
    playbackLength: "34:24",
    tracks: 
    [
        { title: "Thing", playbackLength: "2:53", tags: [ 'rerelease', 'instrumental' ] }
    ],
    physicalCover: 
    {
        imgSrc: "../img/content/discography/SuperSonicSongs.png",
        backgrounds: [ { title: "A Test Background", link: "#abc"}],
        fonts: [ { title: "A Test Font", link: "#def"}]
    },
    physicalBack:
    {
        imgSrc: "../img/content/discography/physical/SSS/Back.jpg",
        backgrounds: [ { title: "A Test Background", link: "#abc"}],
        fonts: [ { title: "A Test Font", link: "#def"}]
    },
    physicalObi:
    {
        imgSrc: "../img/content/discography/physical/SSS/Obi.jpg",
        rightTranslation: `
            <p>This is the right translation</p>
        `,
        middleTranslation: `
            <p>This is the middle translation</p>
        `,
        leftTranslation: `
            <p>This is the left translation</p>
        `
    },
    physicalTray:
    {
        imgSrc: "../img/content/discography/physical/SSS/Tray.jpg",
        backgrounds: [ { title: "A Test Background", link: "#abc"}],
        fonts: [ { title: "A Test Font", link: "#def"}]
    },
    bookletPageSourcePrefix: '../img/content/discography/physical/SSS/',
    bookletPages:
    [
        {
            backgrounds: [ { title: "A Test Background", link: "#abc"}],
            fonts: [ { title: "A Test Font", link: "#def"}]
        },
        {
            backgrounds: [ { title: "Another Thing", link: "#abc"}],
            fonts: [ { title: "Another Font", link: "#def"}]
        },
        {
            backgrounds: [ { title: "Another Thing v2", link: "#abc"}],
            fonts: [ { title: "Another Font v2", link: "#def"}]
        },
    ]
};

window.addEventListener('load', () => {
    title = document.querySelector(".intro > .title");
    description = document.querySelector(".description > .text");
    statYear = document.querySelector(".intro > .stats > .statYear > .statVal");
    statTracks = document.querySelector(".intro > .stats > .statTrackCount > .statVal");
    statLength = document.querySelector(".intro > .stats > .statLength > .statVal");
    trackList = document.querySelector(".tracks > .trackList");
    physicalCover = document.querySelector(".physical #cover");
    physicalBack = document.querySelector(".physical #back");
    physicalObiImg = document.querySelector(".physical #obiImg");
    physicalObiRightTranslation = document.querySelector(".physical #obiRightText");
    physicalObiMiddleTranslation = document.querySelector(".physical #obiMiddleText");
    physicalObiLeftTranslation = document.querySelector(".physical #obiLeftText");
    physicalTray = document.querySelector(".physical #tray");
    physicalBooklet = document.querySelector(".physical #booklet");
    bookletNavLeft = document.querySelector(".physical #bookletNavLeft");
    bookletNavRight = document.querySelector(".physical #bookletNavRight");

    bookletNavLeft.addEventListener('click', () => {
        MovePrev();
    });

    bookletNavRight.addEventListener('click', () => {
        MoveNext();
    });

    window.parent.postMessage('800px', '*');

    Populate(a);
});

function Populate(album)
{
    title.innerText = album.title;
    description.innerHTML = album.description;
    statYear.innerText = album.releaseYear;
    statTracks.innerText = album.tracks.length;
    statLength.innerText = album.playbackLength;
    physicalObiImg.src = album.physicalObi.imgSrc;
    physicalObiRightTranslation.innerHTML = album.physicalObi.rightTranslation;
    physicalObiMiddleTranslation.innerHTML = album.physicalObi.middleTranslation;
    physicalObiLeftTranslation.innerHTML = album.physicalObi.leftTranslation;

    for (let track of album.tracks)
        trackList.appendChild(CreateTrack(track));

    PopulatePhysicalImgDetails(album.physicalCover, physicalCover);
    PopulatePhysicalImgDetails(album.physicalBack, physicalBack);
    PopulatePhysicalImgDetails(album.physicalTray, physicalTray);

    currentBooklet = album.bookletPages;
    currentBookletPageSourcePrefix = album.bookletPageSourcePrefix;
    PopulateBookletInfo();
}

// Track List
function CreateTrack(track)
{
    // <li class="track"><div class="main">...</div><ul class="tags">...</ul></li>
    let newTrack = document.createElement("li");
    newTrack.classList.add("track");

    // Main Details:
    let trackMain = document.createElement("div");
    trackMain.classList.add("main");

    let title = document.createElement("h3");
    title.classList.add("title");
    title.innerText = track.title;

    let playbackLen = document.createElement("p");
    playbackLen.classList.add("length");
    playbackLen.innerText = track.playbackLength;

    trackMain.appendChild(title);
    trackMain.appendChild(playbackLen);

    // Tags:
    let tags = document.createElement("ul");
    tags.classList.add("tags");

    for (let tagId of track.tags)
        tags.appendChild(CreateTag(tagId));

    newTrack.appendChild(trackMain);
    newTrack.appendChild(tags);
    return newTrack;
}

function CreateTag(id)
{
    switch (id)
    {
        case "rerelease":
            return CreateTagWith("tagReRelease", "Rerelease");
        case "remix":
            return CreateTagWith("tagRemix", "Remix");
        case "instrumental":
            return CreateTagWith("tagInstrumental", "Instrumental");
        case "original":
            return CreateTagWith("tagOriginal", "Original");
        case "live":
            return CreateTagWith("tagLive", "Live Performance");
        case "notC40":
            return CreateTagWith("tagNotC40", "Not Crush 40");
        default:
            throw "Invalid id in data's tags";
    }
}

function CreateTagWith(clas, text)
{
    let tag = document.createElement("li");
    tag.classList.add("tag");
    tag.classList.add(clas);

    let txt = document.createElement("p");
    txt.innerText = text;

    tag.appendChild(txt);
    return tag;
}

// Physical
function PopulatePhysicalImgDetails(info, elem)
{
    let img = elem.querySelector(".img");
    img.src = info.imgSrc;

    let facts = elem.querySelector(".facts");
    PopulateFacts(info, facts);
}

function PopulateFacts(info, elem)
{
    elem.replaceChildren();
    
    if (info.backgrounds.length > 0)
    {
        let fact = CreateFact('../img/icons/background.svg', 'Backgrounds');

        for (let back of info.backgrounds)
            fact.contents.appendChild(CreateFactItem(back.title, back.link));

        elem.appendChild(fact.parent);
    }

    if (info.fonts.length > 0)
    {
        let fact = CreateFact('../img/icons/font.svg', 'Fonts');

        for (let fnt of info.fonts)
            fact.contents.appendChild(CreateFactItem(fnt.title, fnt.link));
            
            elem.appendChild(fact.parent);
    }
}

function CreateFact(iconSrc, title)
{
    let fact = document.createElement("div");
    fact.classList.add("fact");

    let icon = document.createElement("img");
    icon.src = iconSrc;
    icon.classList.add("icon");

    let titleElem = document.createElement("h4");
    titleElem.innerText = title;
    titleElem.classList.add("title");

    let contents = document.createElement("ul");
    contents.classList.add("contents");
    contents.classList.add("contentsList");

    fact.appendChild(icon);
    fact.appendChild(titleElem);
    fact.appendChild(contents);

    return { parent: fact, contents: contents };
}

function CreateFactItem(text, link)
{
    let newItm = document.createElement("li");
    let newLink = document.createElement("a");
    newLink.classList.add("contentsLink");
    newLink.href = link;

    let newPara = document.createElement("p");
    newPara.innerText = text;

    newLink.appendChild(newPara);
    newItm.appendChild(newLink);
    
    return newItm;
}

// Physical - Booklet Experience
var currentBookletPos = 0;
var currentBooklet;
var currentBookletPageSourcePrefix;

function PopulateBookletInfo()
{
    bookletNavLeft.style.visibility = currentBookletPos == 0 ? 'hidden' : 'visible';
    bookletNavRight.style.visibility = currentBookletPos == currentBooklet.length - 1 ? 'hidden' : 'visible';

    let currentPage = currentBooklet[currentBookletPos];
    currentPage.imgSrc = currentBookletPageSourcePrefix + 'Booklet' + currentBookletPos + ".png";
    PopulatePhysicalImgDetails(currentPage, physicalBooklet);
}

function MovePrev()
{
    currentBookletPos--;
    PopulateBookletInfo();
}

function MoveNext()
{
    currentBookletPos++;
    PopulateBookletInfo();
}