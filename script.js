const questions = [
    {
        question:"The Correct acronym which HyperText Markup Language is used to create web pages",
        answers: [
            {text: "HTML", correct: true},
            {text: "CSS", correct: false},
            {text: "Bootstrap", correct:false} ,
            {text: "HTTP", correct:false}
        ]
    },
    {
        question:" Which style sheet language enables developers to apply styles such as colors, fonts positioning to HTML elements and enhancing the visual appearance.",
        answers: [
            {text: "HTML", correct: false},
            {text: "CSS", correct: true},
            {text: "Nepal", correct:false} ,
            {text: "Javascript", correct:false}
        ]
    },
    {
        question:" The interpreted programming language commonly used to create and control dynamic website content.",
        answers: [
            {text: "HTML", correct: false},
            {text: "CSS", correct: false},
            {text: "Javascript", correct: true} ,
            {text: "None", correct: false}
        ]
    },
    {
        question:"Which of the following is used to create an element that acts as a container for other HTML elements?",
        answers: [
            {text: "span", correct: false},
            {text: "div", correct:true},
            {text: "p", correct:false} ,
            {text: "a", correct:false}
        ]
    },

    {
        question:"Which CSS property is used to change the text color of an element?",
        answers: [
            {text: "font-color", correct: false},
            {text: "text-color", correct: false},
            {text: "color", correct: true} ,
            {text: "font-style", correct:false}
        ]
    },
    {
        question:"What is the purpose of the `alt` attribute in an `img` tag?",
        answers: [
            {text: "To provide a title for the image", correct: false},
            {text: "To specify the image source", correct: false},
            {text: " To provide alternative text for screen readers", correct: true} ,
            {text: "To link to another webpage", correct:false}
        ]
    },   
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("quiz");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);

    })
}


function resetState(){
    nextButton.style.display = "none";
   while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
   } 
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        alert('Correct!');
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
        alert('Wrong!');
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextButton.style.display = "block";
}
function showScore(){
    resetState();
    questionElement.innerHTML = `You score ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();