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






// ---------------------------------------------- This For Form Submition ---------------------------------------------






//> This Function Give a PlaceHolder To Form Inputs
function placeHolderForm(){
    var username = document.getElementById("id_username");
    var password1 = document.getElementById("id_password1");
    var password2 = document.getElementById("id_password2");


    username.placeholder = "Your username (5 Chars,digits)"
    password1.placeholder = "Your password must contain at least 8 characters."
    password2.placeholder = "Enter the same password as before, for verification."


    document.getElementById("id_username").minLength = "5";
    document.getElementById("id_password1").minLength = "8";
    document.getElementById("id_password1").minLength = "8";
};placeHolderForm()





//> This Function Add Location DATA In Hidden Fields
function geoDataForm(lat,long){
    $("#latitude").val(lat)
    $("#longitude").val(long)
}



//> Function For Get Location DATA
function getLocationData(){
    var geo = navigator.geolocation;
    if (geo){
        geo.getCurrentPosition(function(pos){
            let lat = pos.coords.latitude;
            let long = pos.coords.longitude;

            geoDataForm(lat,long);
        });
    }
};
// getLocationData();





// This is Fucntion Prevernt for Showing (2 messages Error + processing Request)=> Refresh Page
setInterval(function(){
    let message = document.getElementById("error");
    if (message){
        var url = window.location.href;
        window.location.assign(url);
    }
},1000);






//> This To Prevernt The User From Click The Submit Button after He Submit The Form
    
document.getElementById("form-post").addEventListener("submit",function(){
    let submitCta = document.getElementById("submit-btn");
    let message = document.getElementById("msg-processing");

    setTimeout(function(){
        message.style.display = "block"
        message.style.transition = ".1s ease"
        message.style.backgroundColor = "#e09326";
        submitCta.style.backgroundColor = "#8c6f00";
        // submitCta.value = "Please Wait ...";
        submitCta.disabled = true
    },3000)
})




















