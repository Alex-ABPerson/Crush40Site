let songTitle;
let description;
let performancesList;
let lyricsSource;
let lyricsText;

let Song = {
    title: "I Am... All Of Me",
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
    },
    performances: [
        { 
            id: "sb13",
            d: "Sad about that stream..."
        },
        {
            id: "jgmf13"
        },
        {
            id: "symphony"
        }
    ]
}

window.addEventListener('load', () => {
    songTitle = document.querySelector("#songTitle");
    description = document.querySelector("#descText");
    lyricsSource = document.querySelector("#lyricsSource");
    lyricsText = document.querySelector("#lyricsText");
    performancesList = document.querySelector("#performancesList");

    songTitle.innerText = Song.title;
    PopulateDescription(Song);
    PopulateLyrics(Song);
    PopulatePerformances(Song);

    window.parent.postMessage('!800px', '*');
});

function PopulateLyrics(song) 
{
    lyricsSource.innerHTML = "<p>(Sourced from the " + song.lyrics.src + ")</p>";
    lyricsText.innerHTML = song.lyrics.text;
}

function PopulatePerformances(song)
{
    for (let performance of song.performances)
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

function PopulateDescription(song)
{
    AppendDesc({ heading: "Fan Description", text: song.desc.fan });

    for (let i of song.desc.other)
        AppendDesc(i);
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