var questionPos;
var question;
var buttons;
var submit;
var pos = 0;
var currentChoice;

var noCorrect = 0;

window.addEventListener('load', () => {
    question = document.querySelector(".question");
    questionPos = document.querySelector(".questionPos");
    submit = document.querySelector(".quizSubmit");
    buttons = document.querySelectorAll(".btnAnswer");

    for (let button of buttons) {
        button.addEventListener('click', () => ChooseAnswer(button));
    }

    submit.addEventListener('click', () => Submit());

    LoadNext();
    window.parent.postMessage('600px', '*');
});

function Submit() {

    if (parseInt(currentChoice) == Questions[pos].correctAnswer)
        noCorrect++;

    pos++;
    LoadNext();
}

function LoadNext() {
    if (pos >= Questions.length)
    {
        Finish();
        return;
    }

    let currentQ = Questions[pos];

    questionPos.innerText = (pos + 1) + " / " + Questions.length;
    question.innerText = currentQ.title;

    for (let i = 0; i < currentQ.answers.length; i++) {
        document.querySelector("[data-answer-idx='" + i + "']").text = currentQ.answers[i];
    }

    submit.style.visibility = 'hidden';

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
    
}