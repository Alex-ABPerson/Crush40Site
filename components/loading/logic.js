// Loading Indicators
const messages = [
    "<b>Revvin' Up</b> the engines!",
    "<b>Load</b> & Learn!",
    "Thunder, rain and <b>loading</b>",
    "<b>Loading</b> down to the paradise",
    "It's time to get ready to <b>load</b>!",
    "In his world, <b>loading</b> does not exist!",
    "2 Nights 2 <b>Load</b>",
    "No <b>loading</b> to bring you down!"
];

const chooseRandMsg = function() {
    return messages[Math.floor(Math.random() * messages.length)];
}

var LoadingScreen = class {
    mainElem = null
    textElem = null
    spinnerElem = null
    intervalId = 0
    spinPos = 0

    constructor(comp) {
        comp.classList.add("_comp_loading");
        comp.innerHTML = `
            <p class="loading-text"><b>Revvin' Up</b> the engines!</p>
            <div class="spinning"></div>
        `;

        this.mainElem = comp;
        this.spinnerElem = comp.querySelector(".spinning");
        this.textElem = comp.querySelector(".loading-text");
    }

    Start() {
        this.mainElem.style.visibility = 'visible';
        this.spinPos = 0;
    
        // Choose a random message
        this.textElem.innerHTML = chooseRandMsg();

        let thisVal;
        this.intervalId = setInterval(() => {
            this.spinPos += 2;
            if (this.spinPos == 360)
                this.spinPos = 0;
    
            this.spinnerElem.style.transform = "rotateZ(" + this.spinPos + "deg)";
        }, 1);
    }

    Stop() {
        this.mainElem.style.visibility = 'collapse';
        clearInterval(this.intervalId);
    }
}