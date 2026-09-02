let currentQuestion = 0;
let score = 0;
let answered = false;

const questionNumber = document.getElementById("questionNumber");
const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("options");
const feedback = document.getElementById("feedback");
const nextButton = document.getElementById("nextButton");
const scoreText = document.getElementById("score");
const progressFill = document.getElementById("progressFill");
const quizContent = document.querySelector(".quiz-content");
const resultsContainer = document.getElementById("resultsContainer");

function showQuestion() {
  answered = false;

  const q = questions[currentQuestion];

  questionNumber.textContent =
    `Question ${currentQuestion + 1} of ${questions.length}`;

  questionText.textContent = q.question;

  optionsContainer.innerHTML = "";
  feedback.textContent = "";
  nextButton.style.display = "none";

  q.options.forEach((option, index) => {
    const button = document.createElement("button");

    button.className = "answer";
    button.textContent =
      `${String.fromCharCode(65 + index)}. ${option}`;

    button.onclick = () => selectAnswer(index);

    optionsContainer.appendChild(button);
  });

  scoreText.textContent = `Score: ${score}`;
  
  // Update progress bar
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  progressFill.style.width = progress + "%";
}

function selectAnswer(selected) {
  if (answered) return;

  answered = true;

  const correct = questions[currentQuestion].answer;
  const buttons = document.querySelectorAll(".answer");

  buttons.forEach((button, index) => {
    button.disabled = true;

    if (index === correct) {
      button.classList.add("correct");
    }

    if (index === selected && selected !== correct) {
      button.classList.add("wrong");
    }
  });

  if (selected === correct) {
    score++;
    feedback.textContent = "✅ Correct!";
    feedback.className = "feedback correctText";
  } else {
    feedback.textContent =
      `❌ Incorrect. Correct answer: ${String.fromCharCode(65 + correct)}`;
    feedback.className = "feedback wrongText";
  }

  scoreText.textContent = `Score: ${score}`;
  nextButton.style.display = "block";
}

function nextQuestion() {
  currentQuestion++;

  if (currentQuestion >= questions.length) {
    showResults();
  } else {
    showQuestion();
  }
}

function showResults() {
  const percentage = Math.round((score / questions.length) * 100);

  quizContent.style.display = "none";
  resultsContainer.style.display = "block";

  const finalScoreElement = document.getElementById("finalScore");
  const resultMessageElement = document.getElementById("resultMessage");
  const resultDetailsElement = document.getElementById("resultDetails");

  finalScoreElement.textContent = `🎯 Final Score: ${score}/${questions.length}`;
  
  resultMessageElement.textContent = `You scored ${percentage}%`;

  resultDetailsElement.innerHTML = `
    <p><strong>Performance:</strong></p>
    <p>${
      percentage >= 90
        ? "🏆 Outstanding! You're a quiz master!"
        : percentage >= 75
        ? "⭐ Great job! You did very well!"
        : percentage >= 50
        ? "👍 Good effort! Keep practicing!"
        : "📚 Keep learning! Try again to improve!"
    }</p>
  `;
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  answered = false;
  quizContent.style.display = "block";
  resultsContainer.style.display = "none";
  showQuestion();
}

// Initialize quiz on page load
showQuestion();
