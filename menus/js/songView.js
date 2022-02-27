let songTitle;
let description;
let lyricsSource;
let lyricsText;

let Song = {
    desc: {
        fan: "<p>abc</p>",
        other: [
            { heading: "Another Description", subHeading: "(Written by someone)", text:`
            <p>This is a mind-blowing description about how epic this song is.</p>
            <p>Just a whole load of text.</p>
            <p>Keep it going!</p>
            <p>Cool.</p>
            ` }
        ]
    },
    lyrics: {
        src: "2 Nights 2 Remember booklet",
        text: `
            <p>Thunder, rain and lightning</p> 
            <p>Danger, water rising</p>
            <p>...</p>
            <p>Revvin' Up</p>
        `
    }
}

window.addEventListener('load', () => {
    songTitle = document.querySelector("#songTitle");
    description = document.querySelector("#descText");
    lyricsSource = document.querySelector("#lyricsSource");
    lyricsText = document.querySelector("#lyricsText");

    PopulateDescription(Song);
    PopulateLyrics(Song);

    window.parent.postMessage('!800px', '*');
});

function PopulateDescription(song)
{
    AppendDesc({ heading: "Fan Description", text: song.desc.fan });

    for (let i of song.desc.other)
        AppendDesc(i);
}

function PopulateLyrics(song) 
{
    lyricsSource.innerHTML = "<p>(Sourced from the " + song.lyrics.src + ")</p>";
    lyricsText.innerHTML = song.lyrics.text;
}

function AppendDesc(desc)
{
    description.appendChild(document.createElement("hr"));
    
    let heading = document.createElement("h3");
    heading.classList.add("heading");
    heading.innerText = desc.heading;
    description.appendChild(heading);

    if (desc.subHeading)
    {
        let subHeading = document.createElement("p");
        subHeading.classList.add("subHeading");
        subHeading.innerHTML = desc.subHeading;
        description.appendChild(subHeading);
    }

    let text = document.createElement("div");
    text.classList.add("text");
    text.innerHTML = desc.text;
    description.appendChild(text);
}

function Populate()
{

}