//Function for Quiz App//
//Questions//
const quizData = [
    {
        question: "What was the first movie to introduce the Marvel Cinematic Universe?",
        options: ["Avengers", "Iron Man", "The Incredible Hulk", "Thor"],
        answer: "Iron Man"
    },
    {
        question: "Which is the first Marvel movie to star a black protagonist?",
        options: ["Luke Cage", "Iron Heart", "Black Panther", "Blade"],
        answer: "Blade"
    },
    {
        question: "Which movie of the Marvel Cinematic Universe was the first to gross over $1 Billion in the box office?",
        options: ["Avengers", "Black Panther", "Captain Marvel", "Thunderbolts"],
        answer: "Avengers"
    },
    {
        question: "How many Infinity Stones are there in the Marvel Universe?",
        options: ["6", "10", "3", "7"],
        answer: "6"
    },
    {
        question: "Who was able to lift Thor's hammer in Avengers: Endgame?",
        options: ["Star Lord", "Iron Man", "Hulk", "Captain America"],
        answer: "Captain America"
    },
    {
        question: "Who was the second actor to play Spider-Man in live action?",
        options: ["Tom Holland", "Andrew Garfield", "Tobey Maguire", "Chris Pine"],
        answer: "Andrew Garfield"
    },
    {
        question: "Who was the most recent actor to play Bruce Wayne/Batman?",
        options: ["Robert Pattinson", "Christian Bale", "Ben Affleck", "Adam West"],
        answer: "Robert Pattinson"
    },
    {
        question: "What is the birth name of Superman",
        options: ["Clark Kent", "Zod", "Kal-El", "Kon-El"],
        answer: "Kal-El"
    },
    {
        question: "What is the name of the island that Wonder Woman was born on?",
        options: ["Avalon", "Cuba", "Hawaii", "Themyscira"],
        answer: "Themyscira"
    },
    {
        question: "Who is now head of the current DC Cinematic Universe?",
        options: ["Zack Synder", "Russo Brothers", "James Gunn", "Jim Lee"],
        answer: "James Gunn"
    },
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

//Shuffle answers for each question//
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

//Displays each question along with 4 choices//
function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement('label');
    option.className = 'option';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz';
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

//Check entry on whether the anwser is correct or not//
function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

//Display the final result of questions answered// 
function displayResult() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

//Function to retry the quiz//
function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'none';
  resultContainer.innerHTML = '';
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';

  let incorrectAnswersHtml = '';
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
      </p>
    `;
  }

  resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();

//Back to top button//
// Get the button//
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button//
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document//
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}