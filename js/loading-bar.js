// Loading Indicators
let messages = [
    "<b>Revvin' Up</b> the engines!",
    "<b>Load</b> & Learn!",
    "Thunder, rain and <b>loading</b>",
    "<b>Loading</b> down to the paradise",
    "It's time to get ready to <b>load</b>!",
    "In his world, <b>loading</b> does not exist!",
    "2 Nights 2 <b>Load</b>",
    "No <b>loading</b> to bring you down!",
    "Step aside, I'll <b>load the page</b>!"
];

function StartLoading(loading) {
    loading.style.visibility = 'visible';
    loading.spinningElement = loading.querySelector(".spinning");
    loading.spinningElement.spinPos = 0;

    // Choose a random message
    loading.querySelector(".loading-text").innerHTML = ChooseRandMsg();

    loading.dataset.loadingId = setInterval(() => {
        loading.spinningElement.spinPos += 2;

        if (loading.spinningElement.spinPos == 360)
            loading.spinningElement.spinPos = 0;

        loading.spinningElement.style.transform = "rotateZ(" + loading.spinningElement.spinPos + "deg)";
    }, 1);
}

function StopLoading(loading) {
    loading.style.visibility = 'collapse';
    clearInterval(loading.dataset.loadingId);
}

function ChooseRandMsg() {
    return messages[Math.floor(Math.random() * messages.length)];
}
