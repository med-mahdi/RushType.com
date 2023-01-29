const alphabets = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","backspace"," ",".",":",",","?","!","","-","'",'"',"1","2","3","4","5","6","7","8","9","0","capslock","tab","escape"];




//> Return The Key Pressed On Window SCREEN
function keyPressed(event){
    return (event.key).toLowerCase();
}


//> Function For Style Pressed Key
function styleForPressedKey(key){

    if (key.innerHTML == " "){
        key.style.transition = '.7s easeIn'
        key.style.boxShadow = "0px 6px 33px #e2b51480"
        key.style.backgroundColor = '#e2b714';
        key.style.color = 'black';
    }

    else if (key.innerHTML != " "){
        key.style.transition = '.7s easeIn'
        key.style.transform = 'scale(1.05)'
        key.style.boxShadow = "0px 6px 33px #e2b51480"
        key.style.backgroundColor = '#e2b714';
        key.style.color = 'black';
    }
}



//> Function For Style unPressed Key
function styleForUnPressedKey(key){
    key.style.transition = '.7s easeIn'
    key.style.transform = 'scale(1)'
    key.style.boxShadow = "0px 6px 33px rgba(0, 0, 0, 0.11)"
    key.style.backgroundColor = '#3d3d3dea';
    key.style.color = '#e2a414b7';
}




//> This Execute The Main Functions (When The User Press A Key)
window.onkeydown = function(event){
    var key = keyPressed(event);

    var keyExist = alphabets.includes(key);
    if (keyExist){
        keyAnimation(key);
    }
}




//> Function For Keys Animations 
function keyAnimation(key){
    const allKeys = $(".keyboard li");
    key = key.toUpperCase()
    
    var i = 0;
    for (i ; i < allKeys.length ; i++){
        
        if (key == "ESCAPE"){
            var j = 0;
            for (j ; j < allKeys.length ; j++){
                if (allKeys[j].innerHTML == "ESC"){
                    styleForPressedKey(allKeys[j]);
                }
            }
        };



        if (key == "CAPSLOCK"){
            var j = 0;
            for (j ; j < allKeys.length ; j++){
                if (allKeys[j].innerHTML == "CAPS"){
                    styleForPressedKey(allKeys[j]);
                }
            }
        };


        if (key == "BACKSPACE"){
            var j = 0;
            for (j ; j < allKeys.length ; j++){
                if (allKeys[j].innerHTML == "BACK"){
                    styleForPressedKey(allKeys[j]);
                }
            }
        };

        if (allKeys[i].innerHTML == key){
            styleForPressedKey(allKeys[i])
        }

        else{
            styleForUnPressedKey(allKeys[i])
        }
    }

}









