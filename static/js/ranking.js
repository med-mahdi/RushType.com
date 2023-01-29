const userName = document.querySelector("#userName").innerHTML;


var allParticipentsGb = document.querySelectorAll(".nm-prt-gb");
var allParticipentsRg = document.querySelectorAll(".nm-prt-rg");
var allRowsGb = document.querySelectorAll(".rw-gb");
var allRowsRg = document.querySelectorAll(".rw-rg");
var i = 0;
var j = 0;

console.log(userName)

//> This is For Style User In Global Table
for (i; i < allParticipentsGb.length ; i++){
    let participent = allParticipentsGb[i].innerHTML;
    if (participent == userName){
        allRowsGb[i].style.backgroundColor = "#df8b0d38";
    }
}

//> This is For Style User In Region Table
for (j; j < allParticipentsRg.length ; j++){
    let participent = allParticipentsRg[j].innerHTML;
    if (participent == userName){
        allRowsRg[j].style.backgroundColor = "#df8b0d38";
    }
}





