var ipt3=document.querySelector("#input3")
var btn3=document.querySelector(".btn1")
btn3.onclick=function(){
    ipt3.value=btn3.value
}


var box4=document.querySelector(".box4")
var ipt4=document.querySelector("#input4")
var btn4=document.querySelector("#btn4")
btn4.onclick=function(){
    box4.innerHTML=ipt4.value
}


var box5=document.querySelector(".box5")
var btn5=document.querySelector("#btn5")
btn5.onblur=function(){
     box5.innerHTML=btn5.value
}



var box6=document.querySelector(".box6")
var ipt6=document.querySelector("#input6")
var box62=document.querySelector(".box6-2")
var ipt62=document.querySelector("#input6-2")
var btn6=document.querySelector("#btn6")
btn6.onclick=function(){
    box6.innerHTML=ipt6.value
    box62.innerHTML=ipt62.value
    console.log(ipt62.value);
}