const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

console.log("Beginning")
// console.log(question,choices,progresstext,scoreText,progressBarFull);

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionsCounter = 0
let availableQuestions = []

let questions = [
    {
        question:"Chappal Waddi is the highest mountain of Nigeria. What state is it located in?",
        choice1:"Taraba",
        choice2:"Sokoto",
        choice3:"Oyo",
        choice4:"Kano",
        answer: 1
    },
    {
        question:"What is the capital of Nigeria?",
        choice1:"Lagos",
        choice2:"Port Harcourt",
        choice3:"Kaduna",
        choice4:"Abuja",
        answer: 4
    },
    {
        question:"The national anthem of Nigeria has been Arise, O Compatriots since 1978. What was the previous national anthem?",
        choice1:"Arise O fellow Nigerians",
        choice2:"Nigeria We Hail Thee",
        choice3:"Nigeria We love thee",
        choice4:"Our dear country Nigeria",
        answer: 2
    },
    {
        question:"What is the capital of Kwara State?",
        choice1:"Niger",
        choice2:"Oyo",
        choice3:"Ilorin",
        choice4:"Osun",
        answer: 3
    },
    {
        question:"Nigeria is divided into 36 states. Which one is the largest by area?",
        choice1:"Lagos",
        choice2:"Niger",
        choice3:"Oyo",
        choice4:"Kano",
        answer: 2
    },
    {
        question:"Whose face is on the 20 Naira Note?",
        choice1:"Nnamdi Azikwe",
        choice2:"Tafawa Balewa",
        choice3:"Yakubu Gowon",
        choice4:"Murtala Muhammed",
        answer: 4
    },
    {
        question:"Nigeria's flag consists of two colors. What are they?",
        choice1:"White and Yellow",
        choice2:"Yellow and Grey",
        choice3:"Grey and White",
        choice4:"White and Green",
        answer: 4
    },
    {
        question:"Nigeria achieved independence in 1960 from which country?",
        choice1:"UK",
        choice2:"US",
        choice3:"USSR",
        choice4:"UAE",
        answer: 1
    },
    {
        question:"What is the capital of Abia state?",
        choice1:"Aba",
        choice2:"Akwa",
        choice3:"Umuahia",
        choice4:"Owerri",
        answer: 3
    },
    {
        question:"What natural physical feature was Nigeria named after?",
        choice1:"River Nigeria",
        choice2:"River Nile",
        choice3:"River Benue",
        choice4:"River Niger",
        answer: 2
    },
    {
        question:"Nigerians Wole Soyinka, Ben Okri and Chinua Achebe have all achieved renown in which field?",
        choice1:"Mathematics",
        choice2:"Medicine",
        choice3:"Literature",
        choice4:"Journalism",
        answer: 3
    },
    {
        question:"Who was Olusegun Obasanjo's Vice President during his first term as elected president?",
        choice1:"Atiku Bagudu",
        choice2:"Atiku Abubakar",
        choice3:"Goodluck Jonathan",
        choice4:"Umar Musa Yar'dua",
        answer: 2
    }
];

const SCORE_POINTS = 10;
const MAX_QUESTIONS = 12;


let startGame = () => {
    questionsCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
    console.log("Game started")
}


let getNewQuestion = () => {
    
    /*Console.log used every where to really get how Js is excuting the code */

    console.log("Getting QUestions")
    if(availableQuestions.length === 0 || questionsCounter > MAX_QUESTIONS){
        localStorage.setItem("mostRecentScore",score)

        return window.location.assign("/end.html")
    }
    questionsCounter++
    progressText.innerText = `Question ${questionsCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionsCounter/MAX_QUESTIONS)*100}%`


    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]

    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice'+ number]
    })

    availableQuestions.splice(questionsIndex,1)
    acceptingAnswers = true
}
choices.forEach(choice=>{
    choice.addEventListener('click', e => {
        if(!acceptingAnswers)return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']
        console.log(selectedAnswer)
        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'
        console.log(classToApply)
    
        if(classToApply === 'correct'){
            incrementScore(SCORE_POINTS)
        }
        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(()=>{
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})


incrementScore = num => {
    score += num
    scoreText.innerText = score

}
console.log("Game about to start")
startGame()
