// General
let page;
let title;
let description;
let statYear;
let statTracks;
let statLength;
let starText;
let trackList;
let trackListDvd;
let trackListSection;
let liveNotice;
let physical;
let physicalCD;
let physicalDVD;
let physicalCover;
let physicalBack;
let physicalSticker;
let physicalTray;
let physicalBooklet;
let physicalObiFront;
let physicalObiBack;
let bookletNavLeft;
let bookletNavRight;

window.addEventListener('load', () => {
    page = document.querySelector(".page");
    title = document.querySelector(".intro > .title");
    description = document.querySelector(".descriptionSection > .text");
    statYear = document.querySelector(".intro > .stats > .statYear > .statVal");
    statTracks = document.querySelector(".intro > .stats > .statTrackCount > .statVal");
    statLength = document.querySelector(".intro > .stats > .statLength > .statVal");
    starText = document.querySelector("#starText");
    trackList = document.querySelector("#cdTrackList");
    trackListDvd = document.querySelector("#dvdTrackList");
    trackListSection = document.querySelector("#trackList");
    liveNotice = document.querySelector("#liveNotice");
    physical = document.querySelector("#physical");
    physicalSticker = document.querySelector("#sticker");
    physicalCD = document.querySelector(".physical #cd");
    physicalDVD = document.querySelector(".physical #dvd");
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

    document.querySelector("#descriptionTab").addEventListener('click', () => page.classList.add("descOpen"));
    document.querySelector("#tracksTab").addEventListener('click', () => page.classList.remove("descOpen"));

    let physicalContent = document.querySelector(".physical #physicalContent");

    physical.addEventListener("scroll", () => UpdateDiscSpin(physical.scrollTop));
    physicalContent.addEventListener("scroll", () => UpdateDiscSpin(physicalContent.scrollLeft));

    window.parent.postMessage('!800px', '*');

    let afterQ = document.URL.split('?')[1].substring(2); // Trim off the "a="
    Populate(Albums[afterQ.toLowerCase()]);
});

function Populate(album)
{
    title.innerText = album.title;

    if (album.titleFont) title.style.fontFamily = album.titleFont;
    if (album.titleFontTransform) title.style.textTransform = album.titleFontTransform;
    if (album.titleFontStyle) title.style.fontStyle = album.titleFontStyle;

    description.innerHTML = album.description;
    statYear.innerText = album.releaseYear;
    statTracks.innerText = album.tracks.length;
    statLength.innerText = album.playbackLength;
    physical.style.backgroundImage = "url('" + album.physicalBg + "')";
    physicalCD.src = album.discImg;

    if (album.dvdImg)
    {
        physicalDVD.src = album.dvdImg;
    }

    if (!album.live)
    {
        liveNotice.style.position = 'absolute';
        liveNotice.style.visibility = 'collapse';
    }

    if (album.sticker)
    {
        physicalSticker.querySelector(".img").src = album.sticker;
    }
    else
    {
        physicalSticker.style.position = 'absolute';
        physicalSticker.style.visibility = 'collapse';
    }

    if (album.starText)
        starText.innerHTML = album.starText;

    if (album.dvdTracks)
    {
        trackListSection.classList.add("tracksWithSeparators");
        PopulateTrackList(trackListDvd, album.dvdTracks);
    }

    PopulateTrackList(trackList, album.tracks);

    PopulatePhysicalImgDetails(album.physicalCover, physicalCover);
    PopulatePhysicalImgDetails(album.physicalBack, physicalBack);
    PopulatePhysicalImgDetails(album.physicalTray, physicalTray);
    PopulateObiDetails(album.obiFront, physicalObiFront);
    PopulateObiDetails(album.obiBack, physicalObiBack);

    currentBooklet = album.bookletPages;
    currentBookletPageSourcePrefix = album.bookletPageSourcePrefix;
    currentBookletPageSourceExt = album.bookletPageSourceExtension;
    PopulateBookletInfo();
}

// Track List
function PopulateTrackList(elem, tracks)
{
    for (let track of tracks)
        elem.appendChild(CreateTrack(track));
}

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
    title.innerText = track.id ? Crush40Songs[track.id] : track.title;

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

    // Click
    if (track.id)
        newTrack.addEventListener('click', () => window.parent.postMessage('@songView?s=' + track.id, '*'));
    else
        newTrack.classList.add("noFocus");

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
        case "partial-rerelease":
            return CreateTagWith("tagReRelease", "Partial Rerelease");
        case "remix":
            return CreateTagWith("tagRemix", "Remix");
        case "instrumental":
            return CreateTagWith("tagInstrumental", "Instrumental");
        case "original":
            return CreateTagWith("tagOriginal", "Original");
        case "live":
            return CreateTagWith("tagLive", "Live Performance");
        case "lyric":
            return CreateTagWith("tagInstrumental", "Lyric Video");
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
    if (!obi)
    {
        elem.style.position = 'absolute'; // Remove effect on layout
        elem.style.visibility = 'collapse';
        return;
    }
    
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

// Disc Spin
function UpdateDiscSpin(scrollPos)
{
    physicalCD.style.transform = "rotate(" + scrollPos % 360 / 5 + "deg)";
    physicalDVD.style.transform = "rotate(" + scrollPos % 360 / 5 + "deg)";
}