var timerE1 = document.getElementById('timer');
var mainE1 = document.getElementById('main');
var headerE1 = document.getElementById('header');
var timeLeft = 0;
var questionsAnswered = 0;
var selectionCnt = 0;
var score = 0;
//array to hold in local storage for high score table
var highScores = [];

// build array to hold all the questions and answers
var quizData = [
    {q: "Question #1", options: [{a:"option 1", isCorrect:false},{a:"option 2", isCorrect:false}, {a:"option 3", isCorrect:true}, {a:"option 4", isCorrect:false}]},

    {q: "Question #2", options: [{a:"option 1", isCorrect:false},{a:"option 2", isCorrect:false}, {a:"option 3", isCorrect:true}, {a:"option 4", isCorrect:false}]},
    
    {q: "Question #3", options: [{a:"option 1", isCorrect:false},{a:"option 2", isCorrect:false}, {a:"option 3", isCorrect:true}, {a:"option 4", isCorrect:false}]},
    
    {q: "Question #4", options: [{a:"option 1", isCorrect:false},{a:"option 2", isCorrect:false}, {a:"option 3", isCorrect:true}, {a:"option 4", isCorrect:false}]},
    
    {q: "Question #5", options: [{a:"option 1", isCorrect:false},{a:"option 2", isCorrect:false}, {a:"option 3", isCorrect:true}, {a:"option 4", isCorrect:false}]}
];

var btnHandler = function(event) {
    // determine which button has been pushed
    if (event.target.matches(".start")) {
        // start the clock
        countdown();

        //generate the first questions
        questionsAnswered = 0;
        nextQuestion(questionsAnswered);

    } else if (event.target.matches(".next-button")) {
        // when the next button is hit, generate the next question, quiz ends when time runs out or no questions are left
        if (!quizData[questionsAnswered]) {
            //there are no questions left, exit quiz to results page
            resultsPage();
            //window.alert("out of questions");
        } else {
            nextQuestion(questionsAnswered);
        };
    } else if (event.target.matches(".quizBtn") && selectionCnt == 0) {
        var answerE1 = event.target.closest(".quizBtn");
        var isCorrect = answerE1.getAttribute('isCorrect');
        var feedbackE1 = document.querySelector(".feedback");
        var nextBtnE1 = document.querySelector(".next-button");
        // let the user know if their answer was correct and display next button
        if (isCorrect === "true") {
            answerE1.setAttribute("style", "background: green");
            // assign appropriate text and display next button
            feedbackE1.textContent = "Congratulations! You have answered correctly."
            nextBtnE1.setAttribute("style", "display: block");
            score++
        } else {
            answerE1.setAttribute("style", "background: red");
            // assign appropriate text and display next button
            feedbackE1.textContent = "Sorry. That answer is not correct. 5s have been deducted from the clock!"
            nextBtnE1.setAttribute("style", "display: block");
            // deduct time
            timeLeft = timeLeft - 5;
        };
        // increment question counter by 1
        questionsAnswered++
        selectionCnt++
    } else if (event.target.matches(".initials-submit-btn")) {
        // when the initials submit button has been pressed, save the score to local storage and load high score screem
        // get local high scores
        highScores = localStorage.getItem("highScores");
        highScores = JSON.parse(highScores);
        // append new score to local high scores
        var initials = document.querySelector("input[name='initials']").value;
        var scoreInput = {name: initials, score: score};
        highScores.push(scoreInput);
        localStorage.setItem("highScores", JSON.stringify(highScores));
        //load high score screen
        highScoreScrn();
    } else if (event.target.matches(".back-btn")) {
        //if user clicks go back bttn on high score screen, return to home
        homeScrn();
    } else if (event.target.matches(".clear-btn")) {
        // clear high scores variable in local storage
        highScores = [{name: "", score: ""}];
        localStorage.setItem("highScores", JSON.stringify(highScores));
        // reload score table
        highScoreScrn();
    }
};

var headerBtnHandler = function(event) {
    //load the high score screen when the view high scores is clicked
    if (event.target.matches(".view-high-scores")) {
        highScoreScrn();
    };
};

var homeScrn = function() {
    //clear any existing elements in main
    mainE1.innerHTML = "";
    // load title, description, and start bttn
    // build Title element
    var titleE1 = document.createElement("h1");
    titleE1.className = "title";
    titleE1.textContent = "Theme Park Quiz";
    mainE1.appendChild(titleE1);

    // build description element
    var descE1 = document.createElement("p");
    descE1.className = "body-text quizDescription";
    descE1.textContent = "The ultimate test of your theme park knowledge! The quicker you answer, the better your score.";
    mainE1.appendChild(descE1);

    // build start button
    var startBtnE1 = document.createElement("button");
    startBtnE1.textContent = "Start Quiz!";
    startBtnE1.className = "btn start";
    mainE1.appendChild(startBtnE1);

    // reset timer and score
    timeLeft = 0;
    timerE1.textContent = "Time: " + timeLeft;
    score = 0;
};



var nextQuestion = function(questionNumber) {
    // clear screen
    mainE1.innerHTML = "";

    // build question element
    var questionE1 = document.createElement("h1");
    questionE1.className = "question";
    questionE1.textContent = quizData[questionNumber].q;
    mainE1.appendChild(questionE1);
    // add answer options
    for (i in quizData[questionNumber].options) {
        var answerE1 = document.createElement("h1");
        answerE1.textContent = quizData[questionNumber].options[i].a;
        answerE1.className = "quizBtn";
        answerE1.setAttribute("isCorrect", quizData[questionNumber].options[i].isCorrect);
        mainE1.appendChild(answerE1);
    };

    // create a box at the bottom that will hold feedback for user after an answer is selected
    var feedbackE1 = document.createElement("div");
    feedbackE1.className = "feedback-container";
    var feedbackTextE1 = document.createElement("p");
    feedbackTextE1.className = "feedback";
    var nextBtnE1 = document.createElement("button");
    nextBtnE1.className = "btn next-button";
    nextBtnE1.textContent = "Next.";
    feedbackE1.appendChild(feedbackTextE1);
    feedbackE1.appendChild(nextBtnE1);

    // add feedback container to bottom of quiz
    mainE1.appendChild(feedbackE1);

    //reset selection counter, limits user to 1 response per questions
    selectionCnt = 0;
};

var countdown = function() {
    // counts down everytime function is called
    timeLeft = 30;
    var timeInterval = setInterval(function() {
        if (timeLeft >= 1) {
            timerE1.textContent = "Timer: " + timeLeft;
            timeLeft -= 1;
        } else {
            timerE1.textContent = "Timer: 0";
            clearInterval(timeInterval);
            resultsPage();
        }
    }, 1000);
};

var resultsPage = function() {
    // clear screen
    mainE1.innerHTML = "";

    //stop the clock
    timeLeft= 0;

    var titleE1 = document.createElement("h1");
    titleE1.className = "results-title";
    titleE1.textContent = "Quiz Has Ended!";
    mainE1.appendChild(titleE1);

    // build description element
    var descE1 = document.createElement("p");
    descE1.className = "body-text";
    descE1.textContent = "Your final score is " + score + ".";
    mainE1.appendChild(descE1);

    //input element for storing users initials
    var initialsE1 = document.createElement("form");
    initialsE1.className = "initials-input-form";

    var labelE1 = document.createElement("label");
    labelE1.setAttribute("for", "initials");
    labelE1.textContent = "Enter initials: ";

    var inputE1 = document.createElement("input");
    inputE1.setAttribute("type", "text");
    inputE1.setAttribute("name", "initials");

    var submitE1 = document.createElement("button");
    submitE1.className = "btn initials-submit-btn";
    submitE1.setAttribute("type", "submit");
    submitE1.textContent = "Submit";

    initialsE1.appendChild(labelE1);
    initialsE1.appendChild(inputE1);
    initialsE1.appendChild(submitE1);

    mainE1.appendChild(initialsE1);
}

var highScoreScrn = function() {
    // clear screen
    mainE1.innerHTML = "";

    // get local high scores
    highScores = localStorage.getItem("highScores");
    if (highScores) {highScores = JSON.parse(highScores)} else {
        // build an empty high score if no local storage object exists
        highScores = [{name: "", score: ""}];
        localStorage.setItem("highScores", JSON.stringify(highScores));
    }


    var titleE1 = document.createElement("h1");
    titleE1.className = "highScores-title";
    titleE1.textContent = "High Scores:";
    mainE1.appendChild(titleE1);

    // build display table for high scores
    var scoreTableE1 = document.createElement("div");
    scoreTableE1.className = "highScores-table";
    for (scr in highScores) {
        var scoreE1 = document.createElement("p");
        scoreE1.className = "score";
        let idx = parseInt(scr) + 1;
        scoreE1.textContent = idx.toString() + ". " + highScores[scr].name + " - " + highScores[scr].score;
        scoreTableE1.appendChild(scoreE1);
    };
    //if highScores is empty, create a blank div
    if (highScores == "[]"){
        var scoreE1 = document.createElement("p");
        scoreE1.className = "score";
        scoreE1.textContent =  "";
        scoreTableE1.appendChild(scoreE1);
    }
    mainE1.appendChild(scoreTableE1);

    // create back bttn and clear bttn
    var scoresBtnsE1 = document.createElement("div");
    var backBtnE1 = document.createElement("button");
    backBtnE1.className = "btn highScores-btn back-btn";
    backBtnE1.textContent = "Go Back";
    var clearBtnE1 = document.createElement("button");
    clearBtnE1.className = "btn highScores-btn clear-btn";
    clearBtnE1.textContent = "Clear High Scores";

    scoresBtnsE1.appendChild(backBtnE1);
    scoresBtnsE1.appendChild(clearBtnE1);
    mainE1.appendChild(scoresBtnsE1);
}

// set up function to initiate quiz when user clicks on start button
mainE1.addEventListener("click", btnHandler);
headerE1.addEventListener("click", headerBtnHandler);


// initial set up when page loads
homeScrn();

/// NEED TO STORE INITIALS TO LOCAL DATA AND CREATE HIGH SCORE SCREEN AND LINK VIEW HIGHSCORE IN TOP LEFT CORNER