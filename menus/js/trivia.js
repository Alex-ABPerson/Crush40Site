var pagePrompt;
var pageResults;

var questionPos;
var question;
var buttons;
var submit;
var pos = 0;
var currentChoice;

var resultsBarFilled;
var resultsBarPercentage;
var resultsBarQuote;
var resultsBarTryAgainMsg;
var resultsBarTryAgain;
var tryAgainButton;

var noCorrect = 0;

window.addEventListener('load', () => {
    question = document.querySelector(".question");
    questionPos = document.querySelector(".questionPos");
    submit = document.querySelector(".quizSubmit");
    buttons = document.querySelectorAll(".btnAnswer");

    pagePrompt = document.querySelector(".promptPage");
    pageResults = document.querySelector(".resultsPage");

    resultsBarFilled = document.querySelector(".correctBarFilled");
    resultsBarPercentage = document.querySelector(".correctBarPercentage");
    resultsBarQuote = document.querySelector(".quote");
    resultsBarTryAgainMsg = document.querySelector(".tryAgainPrompt");
    resultsBarTryAgain = document.querySelector(".resultsBarTryAgain");
    tryAgainButton = document.querySelector(".tryAgainBtn");
    
    pagePrompt.style.visibility = 'visible';
    pageResults.style.visibility = 'collapse';

    for (let button of buttons) {
        button.addEventListener('click', () => ChooseAnswer(button));
    }

    submit.addEventListener('click', () => Submit());
    tryAgainButton.addEventListener('click', () => TryAgain());

    LoadNext();
    window.parent.postMessage('400px', '*');
});

function Submit() {

    if (parseInt(currentChoice) == Questions[pos].correctAnswer)
        noCorrect++;

    pos++;
    LoadNext();
}

function LoadNext() {
    submit.style.visibility = 'hidden';

    if (pos >= Questions.length)
    {
        Finish();
        return;
    }

    let currentQ = Questions[pos];

    questionPos.innerText = (pos + 1) + " / " + Questions.length;
    question.innerText = currentQ.title;

    for (let i = 0; i < currentQ.answers.length; i++) {
        document.querySelector("[data-answer-idx='" + i + "']").innerText = currentQ.answers[i];
    }

    DeselectAllButtons();
}

function ChooseAnswer(btn) {
    DeselectAllButtons();
    btn.classList.add("selectedBtnAnswer");
    currentChoice = btn.dataset.answerIdx;
    submit.style.visibility = 'visible';
}

function DeselectAllButtons() {
    for (let btn of buttons)
        btn.classList.remove("selectedBtnAnswer");
}

function Finish() {
    let percentageScore = ((noCorrect / Questions.length) * 100);

    resultsBarPercentage.innerText = Math.round(percentageScore) + '% (' + noCorrect + "/" + Questions.length + ")";
    resultsBarFilled.style.width = percentageScore + "%";

    if (percentageScore == 0)
    {
        resultsBarQuote.innerText = "\"Wow.\" - Johnny";
    }
    else if (percentageScore < 20)
    {
        resultsBarQuote.innerText = "\"Yeah, tickles, pickles, I don't know the names of all these characters - I'm getting old!\" - Johnny";
    }
    else if (percentageScore < 40) 
    {
        
    }
    else if (percentageScore < 60)
    {
        resultsBarQuote.innerText = "\"So... We got a new record coming out soon, right? Well, at least that's what I heard - I don't know!\" - Johnny";
    }
    else if (percentageScore < 80)
    {
        resultsBarQuote.innerText = "\"Yeah, you guys know the lyrics better than I do.\"  - Johnny";
    }

    if (percentageScore == 100)
    {
        resultsBarQuote.innerText = "\"Yeah, yeah, yeah, yeah... Yeah. Yeah! YEAAAHHHH!\"  - Johnny";

    }

    pagePrompt.style.visibility = 'hidden';
    pageResults.style.visibility = 'visible';
}

function TryAgain()
{
    pos = 0;
    noCorrect = 0;
    LoadNext();

    pagePrompt.style.visibility = 'visible';
    pageResults.style.visibility = 'hidden';
}
