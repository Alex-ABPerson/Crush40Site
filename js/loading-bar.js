// Loading Indicators
function StartLoading(loading) {
    loading.style.visibility = 'visible';
    loading.spinningElement = loading.querySelector(".spinning");
    loading.spinningElement.spinPos = 0;

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