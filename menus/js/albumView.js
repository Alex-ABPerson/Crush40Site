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
let physicalObiFront;
let physicalObiBack;
let bookletNavLeft;
let bookletNavRight;

window.addEventListener('load', () => {
    title = document.querySelector(".intro > .title");
    description = document.querySelector(".description > .text");
    statYear = document.querySelector(".intro > .stats > .statYear > .statVal");
    statTracks = document.querySelector(".intro > .stats > .statTrackCount > .statVal");
    statLength = document.querySelector(".intro > .stats > .statLength > .statVal");
    trackList = document.querySelector(".tracks > .trackList");
    physicalCover = document.querySelector(".physical #cover");
    physicalBack = document.querySelector(".physical #back");
    physicalTray = document.querySelector(".physical #tray");
    physicalBooklet = document.querySelector(".physical #booklet");
    physicalObiFront = document.querySelector(".physical #obiFront");
    physicalObiBack = document.querySelector(".physical #obiBack");
    bookletNavLeft = document.querySelector(".physical #bookletNavLeft");
    bookletNavRight = document.querySelector(".physical #bookletNavRight");

    bookletNavLeft.addEventListener('click', () => {
        MovePrev();
    });

    bookletNavRight.addEventListener('click', () => {
        MoveNext();
    });

    window.parent.postMessage('!800px', '*');
    Populate(Albums["thrill"]);
});

function Populate(album)
{
    title.innerText = album.title;
    description.innerHTML = album.description;
    statYear.innerText = album.releaseYear;
    statTracks.innerText = album.tracks.length;
    statLength.innerText = album.playbackLength;

    for (let track of album.tracks)
        trackList.appendChild(CreateTrack(track));

    PopulatePhysicalImgDetails(album.physicalCover, physicalCover);
    PopulatePhysicalImgDetails(album.physicalBack, physicalBack);
    PopulatePhysicalImgDetails(album.physicalTray, physicalTray);
    PopulateObiDetails(album.obiFront, physicalObiFront);
    
    if (album.obiBack)
        PopulateObiDetails(album.obiBack, physicalObiBack);
    else
        physicalObiBack.style.visibility = 'collapse';

    currentBooklet = album.bookletPages;
    currentBookletPageSourcePrefix = album.bookletPageSourcePrefix;
    currentBookletPageSourceExt = album.bookletPageSourceExtension;
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

    newTrack.appendChild(trackMain);

    // Tags
    if (track.tags)
    {
        let tags = document.createElement("ul");
        tags.classList.add("tags");
    
        for (let tagId of track.tags)
            tags.appendChild(CreateTag(tagId));

        newTrack.appendChild(tags);
    }

    // Description
    if (track.description)
    {
        let description = document.createElement("p");
        description.classList.add("description");
        description.innerHTML = track.description;

        newTrack.appendChild(description);
    }

    return newTrack;
}

function CreateTag(id)
{
    switch (id)
    {
        case "first":
            return CreateTagWith("tagFirst", "First Release");
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
        case "cover":
            return CreateTagWith("tagCover", "Cover");
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
function PopulateObiDetails(obi, elem)
{
    elem.querySelector(".img").src = obi.imgSrc;
    elem.querySelector(".obiRightText").innerHTML = obi.rightTranslation;
    elem.querySelector(".obiMiddleText").innerHTML = obi.middleTranslation;
    elem.querySelector(".obiLeftText").innerHTML = obi.leftTranslation;
}

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
    
    if (info.backgrounds)
    {
        let fact = CreateFact('../img/icons/background.svg', 'Backgrounds');

        for (let back of info.backgrounds)
            fact.contents.appendChild(CreateFactItem(back.title, back.link));

        elem.appendChild(fact.parent);
    }

    if (info.fonts)
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
    newLink.target = "_blank";
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
var currentBookletPageSourceExt;

function PopulateBookletInfo()
{
    bookletNavLeft.style.visibility = currentBookletPos == 0 ? 'hidden' : 'visible';
    bookletNavRight.style.visibility = currentBookletPos == currentBooklet.length - 1 ? 'hidden' : 'visible';

    let currentPage = currentBooklet[currentBookletPos];
    currentPage.imgSrc = currentBookletPageSourcePrefix + 'Booklet' + currentBookletPos + currentBookletPageSourceExt;
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