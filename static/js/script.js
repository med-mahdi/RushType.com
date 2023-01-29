const alphabetiques = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];





//> This Function Load The Keyboard after The Page Loaded; 
setTimeout(function () {
    var keyboard = document.querySelector(".keyboard");
    let leftSection = document.querySelector(".left-hero");

    keyboard.style.opacity = "1";
    leftSection.style.opacity = "1";
    leftSection.style.transition = ".5s ease";
    keyboard.style.transition = ".5s ease";
    typingAnimation(55);

},200)





//> This Function Get A Random Number
function randomNumber(myList){
    var randomNum = parseInt(Math.random() * 100);    
    var listLength = myList.length;
    if (randomNum > listLength-1){
        return randomNumber(myList);
    }
    else{
        return randomNum;
    }
}



//> This Function Genertae The Keys on Keyboard
function randomKeyboardKeys(){
    var allKeys = document.querySelectorAll(".keyboard li");
    var i = 0;

    for (i; i < allKeys.length ; i++){
        let ourLetter = allKeys[i];
        let random_number = randomNumber(alphabetiques);
        let randomCharacter = alphabetiques[random_number];
        ourLetter.innerHTML = randomCharacter;
    };
    
    
}
randomKeyboardKeys();




//> This Function Get Random 
function randomTyping(){
    let randomPressedKeys = randomNumber(alphabetiques);
    let characterPressed = alphabetiques[randomPressedKeys];
    stylePressedKey(characterPressed)
}
setInterval(randomTyping,800)



//> This Function For Typing Animation Take a (text as parameter and speed as parameter for animation speed)
function typingAnimation(speed){
    var text = "Enjoy Testing Your Speed Typing Skills";
    var count = 0;
    function typing(){
        if (count < text.length){
            var para = document.getElementById("heading");
            para.innerHTML += text[count];
            para.style.transition = ".5s ease";
            count++;
        }
        setTimeout(typing,speed);
    }
    typing();
}






//> This Function Acess The Key Pressed And Call THE Animation Function
window.addEventListener("keyup",function(event){
    var keyPressed = event.key
    keyPressed = keyPressed.toUpperCase()
    if (alphabetiques.indexOf(keyPressed) > -1 ){
        stylePressedKey(keyPressed);
    }
})




//> This Function For Key Pressed Animation
function stylePressedKey(key){
    var keyboard_keys = document.querySelectorAll(".keyboard li");
    let i = 0;
    for (i ; i < keyboard_keys.length ; i++){
        if (keyboard_keys[i].innerHTML == key){
            keyboard_keys[i].style.backgroundColor = "rgb(226, 183, 20)";
            keyboard_keys[i].style.color = "black";
            keyboard_keys[i].style.boxShadow = "rgb(226 181 20 / 50%) 0px 6px 33px";
            keyboard_keys[i].style.transform = "scale(1.05)";
        }
        else{
            keyboard_keys[i].style.backgroundColor = "var(--buttons-bgcolor)";
            keyboard_keys[i].style.color = "var(--buttons-color)";
            keyboard_keys[i].style.boxShadow = "none";
            keyboard_keys[i].style.transform = "scale(1)";
        }
    }
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