document.addEventListener('DOMContentLoaded', () => {
    let questions = [];

    const questionElement = document.getElementById('question');
    const statementElement = document.getElementById('statement');
    const cardElement = document.getElementById('card');
    const trueButton = document.getElementById('trueButton');
    const falseButton = document.getElementById('falseButton');

    let previousQuestion = null;

    async function fetchQuestions() {
        try {
            const response = await fetch('questions.json');
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            questions = await response.json();
            loadQuestion();
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }

    function getRandomQuestion() {
        let newQuestion;
        do {
            newQuestion = questions[Math.floor(Math.random() * questions.length)];
        } while (newQuestion === previousQuestion);
        previousQuestion = newQuestion;
        return newQuestion;
    }

    function loadQuestion() {
        const currentQuestion = getRandomQuestion();
        questionElement.textContent = currentQuestion.question;
        statementElement.innerHTML = `<p>${currentQuestion.statement}</p>`;
        cardElement.classList.remove('correct', 'incorrect', 'flipped');
        cardElement.removeAttribute('data-result');
        cardElement.style.transform = 'rotateY(0deg)'; // Reset the card rotation

        cardElement.removeEventListener('click', loadNextQuestion);
    }

    function checkAnswer(isTrue) {
        const currentQuestion = questions.find(q => q.statement === statementElement.textContent.trim());
        if (isTrue === currentQuestion.correct) {
            cardElement.classList.add('correct');
            cardElement.setAttribute('data-result', 'Ты прав!');
        } else {
            cardElement.classList.add('incorrect');
            cardElement.setAttribute('data-result', 'Ты ошибся!');
        }

        cardElement.classList.add('flipped');
        cardElement.addEventListener('click', loadNextQuestion, { once: true });
    }

    function loadNextQuestion() {
        loadQuestion();
    }

    trueButton.addEventListener('click', (e) => {
        e.stopPropagation();
        checkAnswer(true);
    });

    falseButton.addEventListener('click', (e) => {
        e.stopPropagation();
        checkAnswer(false);
    });

    fetchQuestions();
});
