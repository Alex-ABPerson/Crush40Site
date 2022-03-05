let songTitle;
let description;
let performancesList;
let lyricsSource;
let lyricsText;

let Song = {
   
};

let Songs = {
    wimo: {
        desc: {
            fan: `
            <p>"What I'm Made Of..." is the second Crush 40 track on Sonic Heroes, and has been remarked multiple times by Johnny as his favourite Crush 40 song of all time. 
            <p>Jun had already created a short demo of "What I'm Made Of..." before the title track of the game, Sonic Heroes, was even composed, but it was initially rejected by the team.</p>
            <p>Insisting that the song be used in the game, late into development it was decided it would be used as the track for the final boss; Jun then informed Johnny about the track (who was in the middle of a camping trip with his family), and how it was needed to be written quickly.</p>
            <p>And so, inside of a tour bus' kitchen area, Johnny began writing the lyrics to the track, and by Summer 2003 an early demo featuring background vocals was completed. By Fall 2003, the track was completely finished.</p>
            `,
            other: [
                { 
                    heading: "Jun Senoue", 
                    subHeading: "(Written by <a href='https://twitter.com/crush40/status/454934664549908480' target='_blank'>Jun on Twitter</a>, describing the 2 Nights 2 Remember setlist)", 
                    text:`
                        <p>For [the 2 Nights 2 Remember performance], I played "What I'm Made Of" with my "82" instead of my Sonic guitar for the first time - I just wanted to play my favourite song on that guitar!</p>
                        <p>One especially notable moment was at the end of the second day of the show, where the whole audience sang the final "What I'm Made Of..." in unison - it gave me goosebumps!</p>
                    ` }
            ]
        },
        lyrics: {
            src: "Driving Through Forever booklet",
            text: `
<p>I don't care what you're thinking<br/>
As you turn to me<br/>
Cause what I have in my two hands<br/>
Is enough to set me free<br/>
I could fight the feeling<br/>
To resist it over time<br/>
But when it's just too much to take<br/>
You sneak up from behind</p>
<p>Is it me, you say, you're looking for<br/>
Let me show you who I am and what I'm here for... here for...</p>
<p>Try to reach inside of me, try to drain my energy<br/>
Let me show you just what I'm made of<br/>
Simple curiosity tries to take a bite of me<br/>
Let me show you just what I'm made of now...</p>
<p>Like a million faces<br/>
I've recognized them all<br/>
And one by one they've all become<br/>
A black mark on the floor</p>
<p>Is it me, you say, you're looking for<br/>
Let me show you who I am and what I have in store.... in store...</p>
<p>Try to reach inside of me, try to drain my energy<br/>
Let me show you just what I'm made of<br/>
Simple curiosity tries to take a bite of me<br/>
Let me show you just what I'm made of now...</p>
<p>You can take another life long try<br/>
You can take another try...</p>
<p>Try to reach inside of me, try to drain my energy<br/>
Let me show you just what I'm made of<br/>
Simple curiosity tries to take a bite of me<br/>
Let me show you just what I'm made of now...</p>
<p>Try to reach inside of me, try to drain my energy<br/>
Let me show you just what I'm made of</p>
            `
        },
        performances: [
            { id: "tgs08" },
            { id: "sos10" },
            { id: "t11" },
            { id: "t12" },
            { id: "sb12" },
            { id: "jgmf13" },
            { id: "sb13" },
            { id: "twoNights" },
            { id: "expoTNT" },
            { id: "youmacon15" },
            { id: "sonic25th" },
            { id: "sos16" },
            { id: "tmg17" },
            { id: "mgc18" },
            { id: "puma18" },
            { id: "jgmf18" },
            { id: "tmg18" },
            { id: "mgc19" },
            { id: "tmg19" }
        ]
    }
};

window.addEventListener('load', () => {
    songTitle = document.querySelector("#songTitle");
    description = document.querySelector("#descText");
    lyricsSource = document.querySelector("#lyricsSource");
    lyricsText = document.querySelector("#lyricsText");
    performancesList = document.querySelector("#performancesList")

    let afterS = document.URL.split('?')[1].substring(2); // Trim off the "s="
    Populate(Crush40Songs[afterS.toLowerCase()], Songs[afterS.toLowerCase()]);

    window.parent.postMessage('!800px', '*');
});

function Populate(basicSong, song)
{
    songTitle.innerText = basicSong.t;
    PopulateDescription(song);
    PopulateLyrics(song);
    PopulatePerformances(song);
}

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