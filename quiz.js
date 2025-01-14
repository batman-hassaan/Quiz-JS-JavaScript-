
let questionnum = 0;
let countdownInterval;

function startCountdown() {
    let timeLeft = 10;
    const timerDisplay = document.querySelector(".sec");
    clearInterval(countdownInterval);
    timerDisplay.textContent = `${timeLeft}s`;

    countdownInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            timerDisplay.textContent = `${timeLeft}s`;
        } else {
            clearInterval(countdownInterval);
            timerDisplay.textContent = "Time's up!";
            handleTimeout()

        }
    }, 1000);
}



function displayquestion() {

    const currentQuestion = questions[questionnum];
    document.querySelector(".qnum").innerHTML = `${questionnum + 1} of ${questions.length} Question`
    document.querySelector('.question').innerHTML = currentQuestion.question;

    const optionsContainer = document.querySelector(".options");
    optionsContainer.innerHTML = "";
    currentQuestion.options.forEach(e => {
        const button = document.createElement("button");
        button.innerText = e;

        button.addEventListener("click", () => {
            console.log(`You clicked on: ${e}`);
            checkanswer(button, e)
        });
        optionsContainer.appendChild(button);
    });
    startCountdown();
}

const checkanswer = (selectedButton, option) => {
    clearInterval(countdownInterval);
    const correctAnswer = questions[questionnum].correctAnswer;
    const optionsContainer = document.querySelector(".options");

    // Find the button for the correct answer
    const correctButton = Array.from(optionsContainer.children).find(
        (button) => button.innerText === correctAnswer
    );

    if (option === correctAnswer) {
        console.log("Correct!");
        selectedButton.style.backgroundColor = "#ACE1AF";
    } else {
        console.log("Wrong!");
        selectedButton.style.backgroundColor = "#E32636";
        if (correctButton) correctButton.style.backgroundColor = "#ACE1AF";
    }
    questionnum++;
    if (questionnum < questions.length) {
        // displayquestion();
    } else {
        setTimeout(() => {
            alert("Quiz Complete!");
        }, 2000);
        questionnum = 0;
        // displayquestion();
    }

};

function handleTimeout() {
    const correctAnswer = questions[questionnum].correctAnswer;
    const optionsContainer = document.querySelector(".options");

    const correctbtn = Array.from(optionsContainer.children).find(
        (button) => button.innerHTML === correctAnswer
    );
    if (correctbtn) correctbtn.style.backgroundColor = "#ACE1AF";
    console.log("Time's up!");
    questionnum++;
}

document.querySelector(".next-btn").addEventListener("click", () => {
    displayquestion()
})


displayquestion()