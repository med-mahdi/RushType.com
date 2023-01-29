const typingText = document.querySelector(".typing-text"),
inpField = document.querySelector(".wrapper .input-field"),
tryAgainBtn = document.querySelector(".content-box button"),
timeTag = document.querySelector(".time span b"),
mistakeTag = document.querySelector(".mistake span"),
wpmTag = document.querySelector(".wpm span"),
cpmTag = document.querySelector(".cpm span");
let accList = [];
var checkingInterval = setInterval(function(){checkEndGame(false)},1000);





let timer,
maxTime = 30,
timeLeft = maxTime,
charIndex = mistakes = isTyping = 0;

function loadParagraph() {
    const ranIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    paragraphs[ranIndex].split("").forEach(char => {
        let span = `<span>${char.toLowerCase()}</span>`;
        typingText.innerHTML += span;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}



function initTyping() {
    let characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if(charIndex < characters.length - 1 && timeLeft > 0) {
        if(!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
            // 
            console.log("Start typing")
            checkingInterval;
        }
        if(typedChar == null) {
            if(charIndex > 0) {
                charIndex--;
                if(characters[charIndex].classList.contains("incorrect")) {
                    mistakes--;
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        } else {
            if(characters[charIndex].innerText == typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");

        let wpm = Math.round(((charIndex - mistakes)  / 5) / (maxTime - timeLeft) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        
    } else {
        // This Case When Timing Hit 0
        checkEndGame(true);

        clearInterval(timer);
        inpField.value = "";
    }   
}

function initTimer() {
    if(timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
    } else {
        clearInterval(timer);
    }
}




//> Function That Reset The Game
function resetGame() {
    var url = window.location.href;
    window.location.assign(url);
}

loadParagraph();
inpField.addEventListener("keyup", caplockActivate);
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);







//> Function Return The Percentage Of The Correct Pressed Keys Based on Number of all Keys Pressed
function correctLettersPercentage(){
    var allLetters = (inpField.value).length;
    var correctLetters = document.querySelectorAll("span.correct").length;
    var percentage = 0;


    percentage = correctLetters * 100 / allLetters;
    if (percentage >= 0 && percentage <= 100){
        return percentage;
    }
    return 0;
}





//> Function That Return Game Data on Object Form
function getGameData(){
    //*! This Line Just Added Lately
    inpField.disabled = true;
    let wpm = Math.round(((charIndex - mistakes)  / 5) / (maxTime - timeLeft) * 60);
    let cpm = (charIndex - mistakes) * 2;
    let acc = parseInt(correctLettersPercentage());

    wpmTag.innerText = wpm;
    mistakeTag.innerText = mistakes;
    cpmTag.innerText = cpm;


    var userGame = {
        "wpm" : wpm,
        "mistake" : mistakes,
        "cpm": cpm,
        "acc": acc,
        "time" : timeLeft
    }
    return userGame;
}






//> Function That return Data When The Timing End and Request To Save The DATA;
function checkEndGame(endBeforeTime){
    var time = timeTag.innerHTML;

    if (time != 0 && endBeforeTime === true){
        let acceptAble = overPressTyping();
        
        if (acceptAble){
            var person = getGameData();
            console.log("DATA WILL SAVE AcceptAble");
            console.log(person.wpm,person.cpm,person.mistake,person.acc,person.time);

            clearInterval(checkingInterval)
            sendRequest(person.wpm,person.cpm,person.mistake,person.acc,person.time);
            confirm(`Your Score is ${person.wpm} WPM`);
            remindUserToLogin()
            return resetGame();
        }
        else{
            console.log("DATA WILL NOT SAVE not AcceptAble");
            confirm(`Your Score is ${person.wpm} WPM`)
            remindUserToLogin()
            return resetGame()
        }
    }


    if (time == 0 && endBeforeTime == false){
        var person = getGameData();
        var personWpm = person.wpm;
        var mistake = person.mistake;
        var characters = inpField.value.length

        // This Condition Help Us Prevent User Submiting Form while He Just over pressed Keys;
        if (mistake >= 100 && personWpm <= 15){
            clearInterval(checkingInterval);
            console.log(person.wpm,person.cpm,person.mistake,person.acc,person.time);
            confirm(`Your Score is ${person.wpm} WPM`);
            remindUserToLogin()
            return resetGame();
        }

        else{
            console.log("DATA Passed Now");
            clearInterval(checkingInterval);
            console.log(person.wpm,person.cpm,person.mistake,person.acc,person.time);
            sendRequest(person.wpm,person.cpm,person.mistake,person.acc,person.time);
            confirm(`Your Score is ${person.wpm} WPM`);
            remindUserToLogin()
            return resetGame();
        }   
    }
}





//> Function That Calculte The Percentage of User Over Pressing Keys (Calculate based on all Spans because in This case The user will Finish the text before Time);
function overPressTyping(){
    var spansLength = document.querySelectorAll(".typing-text span").length;
    var spanceIncorrect = document.querySelectorAll(".typing-text span.incorrect").length;
    var percentage = parseInt((spanceIncorrect * 100) / spansLength);

    // Worst Case (If Incorrect Words Over 70%)
    if (percentage >= 50){
        return false;
    }
    // Good Case
    else{
        return true;
    }
}





//> Function That Show You Activate CapLock or Not;
function caplockActivate(event){
    var textHelper = document.querySelector("span#capLock");
    var valueCap = event.getModifierState('CapsLock');

    if (valueCap == true){
        textHelper.style.opacity = 1;
    }
    else{
        textHelper.style.opacity = 0;
    }
}





//> Function That Submit The DATA To The Server;
function sendRequest(wpm,cpm,msk,acc,time){
    var xhr = new XMLHttpRequest();
    var csrfValue = document.querySelector("input[name=csrfmiddlewaretoken]").value;

    xhr.onload = function(){
        if (xhr.status == 200){
            console.log(xhr.responseText);
        }
    }
    //> Check if User Exist To Save Information
    if (userExist != "None"){
        xhr.open("POST","")
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
        xhr.send(`wpm=${wpm}&cpm=${cpm}&mistake=${msk}&acc=${acc}&time=${time}&csrfmiddlewaretoken=${csrfValue}`)
    }
    else{
        console.log("Data Has Been Saved on Local Storage");
    }
};






//> Function That Display THE Game Board
function cardBoard(wpm=0,cpm=00,mistake=00,time=00,chars,acc){
    if (mistake < 10){
        mistake = `0${mistake}`
    }
    else if (wpm < 10){
        wpm = `0${wpm}`
    }
    else if (cpm < 10){
        cpm = `0${cpm}`
    }
    else if (time < 10){
        time = `0${time}`
    }
    else if (chars < 10){
        chars = `0${chars}`
    }

    let content = document.querySelector(".wrapper");
    content.innerHTML = `<div class="card">
    <div class="card-container">
        <div class="heading">
            <h2>Game Over</h2>
            <p>Unfortunately you ran out of time</p>
        </div>

        <div class="imp-records">
            <div class="rec-block">
                <h4>wpm</h4>
                <h2>${wpm}</h2>
            </div>
            <div class="rec-block">
                <h4>cpm</h4>
                <h2>${cpm}</h2>
            </div>
            <div class="rec-block">
                <h4>Acc</h4>
                <h2>${acc}<span>%</span></h2>
            </div>
        </div>


        <div class="det-info">
            
            <div class="det-block">
                <p>characters</p>
                <h3>${chars}</h3>
            </div>
            <div class="det-block">
                <p>time</p>
                <h3>${time}s</h3>
            </div>
            <div class="det-block">
                <p>Best wpm</p>
                <h3>0</h3>
            </div>
            <div class="det-block">
                <p>mistakes</p>
                <h3>${mistake}</h3>
            </div>
        </div>


        <div class="test-guide">
            <span class="link">
                <img src="/static/media/4092564-about-mobile-ui-profile-ui-user-website_114033%20(4)%201.png" alt="">
                <a href="/profile/">Profile</a>
            </span>

            <span class="link">
                <img src="/static/media/1904671-arrow-arrow-right-change-direction-next-page-right_122521%20(1)%201.png" alt="">
                <a onclick="resetGame()">Next</a>
            </div>
        </div>

        </div>
    </div>`;
    content.style.transition = "10s ease"
}




//> This For unauthenticated user for Navigationg To Typing Page
try{
    var userName = document.querySelector("#profile-container a").innerHTML;
}
catch{
    var links = document.querySelectorAll(".nav-links a");
    links[0].innerHTML = "Typing";
    links[0].href = "/typing/";
}



//> This Function is Remind User each Game if He Register 
function remindUserToLogin(){
    try{
        var userName = document.querySelector("#profile-container a").innerHTML;
    }
    catch{
        alert("Sign in to save your result")
    }
}