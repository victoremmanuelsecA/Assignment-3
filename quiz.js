const questions = [
    { prompt: 'Which club did Ronaldo join in 2003?', options: ['Manchester United', 'Real Madrid', 'Juventus', 'Sporting CP'], answer: 'Manchester United' },
    { prompt: 'How many Ballon d\'Or awards has Ronaldo won?', options: ['3', '5', '7', '6'], answer: '5' },
    { prompt: 'What is Ronaldo\'s full name?', options: ['Cristiano Ronaldo dos Santos Aveiro', 'Cristiano Ronaldo dos Santos Silva', 'Cristiano Ronaldo Aveiro Santos', 'Cristiano Ronaldo Silva Santos'], answer: 'Cristiano Ronaldo dos Santos Aveiro' },
    { prompt: 'In which year did Ronaldo win his first Champions League title?', options: ['2008', '2007', '2009', '2010'], answer: '2008' },
    { prompt: 'Which country is Ronaldo from?', options: ['Portugal', 'Spain', 'Brazil', 'Argentina'], answer: 'Portugal' },
    { prompt: 'How many goals did Ronaldo score for Real Madrid?', options: ['451', '400', '500', '350'], answer: '451' },
    { prompt: 'Which jersey number is famously associated with Ronaldo?', options: ['7', '10', '9', '11'], answer: '7' },
    { prompt: 'Which team did Ronaldo join in 2018?', options: ['Juventus', 'Real Madrid', 'Manchester United', 'Paris Saint-Germain'], answer: 'Juventus' },
    { prompt: 'Which award did Ronaldo win in 2016?', options: ['UEFA Best Player in Europe Award', 'Golden Foot', 'Best FIFA Men\'s Player', 'Ballon d\'Or'], answer: 'Ballon d\'Or' },
    { prompt: 'How many goals did Ronaldo score in the 2014/15 Champions League season?', options: ['10', '15', '12', '16'], answer: '16' },
    // Add more questions to make a total of 100
];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

let currentQuestionIndex = 0;
let time = 150;
let timerId;
let selectedQuestions = [];
let score = 0;

const questionsEl = document.querySelector("#questions");
const timerEl = document.querySelector("#time");
const choicesEl = document.querySelector("#options");
const feedbackEl = document.querySelector("#feedback");
const startBtn = document.querySelector("#start");
const submitBtn = document.querySelector("#submit-score");
const nameEl = document.querySelector("#name");

startBtn.addEventListener("click", quizStart);
submitBtn.addEventListener("click", saveHighScore);

function quizStart() {
    shuffle(questions);
    selectedQuestions = questions.slice(0, 10);
    currentQuestionIndex = 0;
    time = selectedQuestions.length * 15;
    score = 0;

    document.getElementById("start-screen").classList.add("hide");
    document.getElementById("question-container").classList.remove("hide");

    startTimer();
    showQuestion();
}

function startTimer() {
    timerId = setInterval(function() {
        time--;
        timerEl.textContent = time;
        if (time <= 0) {
            clearInterval(timerId);
            endQuiz();
        }
    }, 1000);
}

function showQuestion() {
    if (currentQuestionIndex >= selectedQuestions.length) {
        endQuiz();
        return;
    }

    const currentQuestion = selectedQuestions[currentQuestionIndex];
    questionsEl.textContent = currentQuestion.prompt;
    choicesEl.innerHTML = '';

    currentQuestion.options.forEach(function(option) {
        const button = document.createElement('button');
        button.textContent = option;
        button.setAttribute('class', 'option');
        button.setAttribute('data-answer', currentQuestion.answer);
        button.addEventListener('click', selectAnswer);
        choicesEl.appendChild(button);
    });
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.textContent === selectedButton.getAttribute('data-answer');

    if (correct) {
        score++;
        feedbackEl.textContent = "Correct!";
    } else {
        feedbackEl.textContent = "Wrong!";
    }

    feedbackEl.classList.remove("hide");

    setTimeout(function() {
        feedbackEl.classList.add("hide");
        currentQuestionIndex++;
        showQuestion();
    }, 1000);
}

function endQuiz() {
    clearInterval(timerId);

    document.getElementById("question-container").classList.add("hide");
    document.getElementById("end-screen").classList.remove("hide");

    document.getElementById("score-final").textContent = score;
}

function saveHighScore(e) {
    e.preventDefault();

    const name = nameEl.value.trim();
    if (name === '') return;

    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    const newScore = { score, name };
    highScores.push(newScore);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(10);

    localStorage.setItem('highScores', JSON.stringify(highScores));

    window.location.href = './highscore.html';
}
