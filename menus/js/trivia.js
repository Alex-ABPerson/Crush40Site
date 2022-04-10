let pagePrompt;
let pageResults;

let buttons;
let submit;
let reset;
let pos = 0;
let currentChoice;
let currentOrderChoices = [0, 0, 0, 0];
let currentOrderPos;

let resultsBarFilled;
let resultsBarPercentage;
let resultsBarQuote;
let resultsBarTryAgainMsg;
let resultsBarTryAgain;
let hundredPercentPrompt;
let tryAgainButton;
let questionsResults;

let noCorrect = 0;

window.addEventListener('load', () => {
    reset = document.querySelector(".quizReset");
    submit = document.querySelector(".quizSubmit");
    buttons = document.querySelectorAll(".btnAnswer");

    pagePrompt = document.querySelector(".promptPage");
    pageResults = document.querySelector(".resultsPage");

    resultsBarFilled = document.querySelector(".correctBarFilled");
    resultsBarPercentage = document.querySelector(".correctBarPercentage");
    resultsBarQuote = document.querySelector(".quote");
    resultsBarTryAgainMsg = document.querySelector(".tryAgainPrompt");
    resultsBarTryAgain = document.querySelector(".resultsBarTryAgain");
    hundredPercentPrompt = document.querySelector(".hundredPercent");
    tryAgainButton = document.querySelector(".tryAgainBtn");
    questionsResults = document.querySelector(".questions");
    
    pagePrompt.style.visibility = 'visible';
    pageResults.style.visibility = 'collapse';

    // Assign button presses
    for (let button of buttons)
        button.addEventListener('click', () => ChooseAnswer(button));

    submit.addEventListener('click', Submit);
    reset.addEventListener('click', Reload);
    tryAgainButton.addEventListener('click', TryAgain);

    Reload();
    window.parent.postMessage('!450px', '*');
});

function Reload() 
{
    submit.classList.add("hidden");

    // Load finish screen for last question
    if (pos >= Questions.length)
    {
        Finish();
        return;
    }

    let currentQ = Questions[pos];

    // Set labels
    document.querySelector("#questionPos").innerText = (pos + 1) + " / " + Questions.length;
    document.querySelector("#question").innerHTML = currentQ.title;

    for (let i = 0; i < currentQ.answers.length; i++)
        document.querySelector("[data-answer-idx='" + i + "']").innerHTML = "<p>" + currentQ.answers[i] + "</p>";

    // Handle image
    if (currentQ.img)
        ShowImg(currentQ.img);
    else
        HideImg();

    // Reset ordering
    currentOrderPos = 0;
    reset.classList.add('hidden');

    DeselectAllButtons();
}

function ShowImg(img)
{
    let questionImgElem = document.querySelector("#questionImg");
    questionImgElem.src = "../img/" + img;
    questionImgElem.classList.remove("hidden");
    document.querySelector("#clickToEnlarge").classList.remove("hidden");
}

function HideImg()
{
    document.querySelector("#questionImg").classList.add("hidden");
    document.querySelector("#clickToEnlarge").classList.add("hidden");
}

function ChooseAnswer(btn) {

    // Order questions
    if (Questions[pos].correctOrder)
    {
        // Ignore multiple presses
        if (btn.classList.contains("selectedBtnAnswer")) return;

        currentOrderChoices[currentOrderPos++] = btn.dataset.answerIdx;
        reset.classList.remove('hidden');
        
        // Add number to button
        let orderValElem = document.createElement("p");
        orderValElem.classList.add("orderVal");
        orderValElem.innerText = currentOrderPos;
        btn.appendChild(orderValElem);

        // Show "Submit" if last
        if (currentOrderPos == 4)
            submit.classList.remove('hidden');
    }
    else
    {
        DeselectAllButtons();
        currentChoice = btn.dataset.answerIdx;
        submit.classList.remove('hidden');
    }

    btn.classList.add("selectedBtnAnswer");
}

function DeselectAllButtons() 
{
    for (let btn of buttons)
        btn.classList.remove("selectedBtnAnswer");
}

function Submit() 
{
    // Check if correct
    // Order question
    if (Questions[pos].correctOrder)
    {
        if (currentOrderChoices.toString() == Questions[pos].correctOrder.toString())
        {
            noCorrect++;
            Questions[pos].prevAnswerCorrect = true;
        }

        let thisAnswer = "";
        for (let choice of currentOrderChoices)
        {
            // Add a comma before every first item
            if (thisAnswer) thisAnswer += ", ";
            thisAnswer += Questions[pos].answers[choice];
        }
        Questions[pos].prevAnswer = thisAnswer;
    }

    // Normal question
    else
    {
        if (parseInt(currentChoice) == Questions[pos].correctAnswer)
        {
            noCorrect++;
            Questions[pos].prevAnswerCorrect = true;
        }

        Questions[pos].prevAnswer = Questions[pos].answers[currentChoice];
    } 

    pos++;
    Reload();
}

// FINISH SCREEN:
function Finish() 
{
    let percentageScore = ((noCorrect / Questions.length) * 100);

    resultsBarPercentage.innerText = Math.round(percentageScore) + '% (' + noCorrect + "/" + Questions.length + ")";
    resultsBarFilled.style.width = percentageScore + "%";

    // Choose quote
    if (percentageScore == 0)
        resultsBarQuote.innerText = "\"Wow.\" - Johnny";
    else if (percentageScore < 20)
        resultsBarQuote.innerText = "\"Yeah, tickles, pickles, I don't know the names of all these characters - I'm getting old!\" - Johnny";
    else if (percentageScore < 40) 
    {
        
    }
    else if (percentageScore < 60)
        resultsBarQuote.innerText = "\"So... We got a new record coming out soon, right? Well, at least that's what I heard - I don't know!\" - Johnny";
    else if (percentageScore < 80)
        resultsBarQuote.innerText = "\"Yeah, you guys know the lyrics better than I do.\"  - Johnny";
    
    if (percentageScore == 100)
    {
        resultsBarQuote.innerText = "\"Yeah, yeah, yeah, yeah... Yeah. Yeah! YEAAAHHHH!\"  - Johnny";
        hundredPercentPrompt.classList.remove("hidden");
        questionsResults.classList.add("hidden");
    } 
    else
    {
        hundredPercentPrompt.classList.add("hidden");
        questionsResults.classList.remove("hidden");
        PopulateQuestionResults();
    }

    pagePrompt.style.visibility = 'hidden';
    pageResults.style.visibility = 'visible';
}

function PopulateQuestionResults()
{
    questionsResults.replaceChildren();
    for (let qu of Questions)
    {
        let newItm = document.createElement("li");

        let newItmP = document.createElement("p");
        newItmP.classList.add(qu.prevAnswerCorrect ? "correct" : "incorrect");
        newItmP.innerHTML = qu.prevAnswer;
        newItm.appendChild(newItmP);

        questionsResults.appendChild(newItm);
    }
}

function TryAgain()
{
    pos = 0;
    noCorrect = 0;
    Reload();

    pagePrompt.style.visibility = 'visible';
    pageResults.style.visibility = 'hidden';
}
