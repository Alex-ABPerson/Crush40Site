// Loading Indicators
let messages = [
    "<b>Revvin' Up</b> the engines!",
    "Load <b>& Learn</b>!",
    "<b>Thunder, rain and</b> loading",
    "Loading <b>down to the paradise</b>",
    "<b>It's time to get ready to</b> load!",
    "<b>In his world,</b> loading <b>does not exist</b>!",
    "<b>2 Nights 2</b> Load",
    "<b>No</b> loading <b>to bring you down!</b>"
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
