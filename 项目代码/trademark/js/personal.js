/*
 * @author: lsj
 * @create: 2021-05-10 10:11 AM
 * @license: MIT
 * @lastAuthor: lsj
 * @lastEditTime: 2021-05-12 16:10 PM
 * @desc: 
 */
"use strict";//严格模式启用
//!获取缓存
let apa = localStorage.getItem("accountInfo");
apa = JSON.parse(apa);
console.log(apa[0].username);
let nemn = get("#neme");
nemn.innerHTML = apa[0].username.substr(0,1);
//?获取元素方法
function get(name) {
    return document.querySelector(name);
}
//TODO点击事件
let profile = get(".profile");
//?鼠标点击显示事件
profile.onclick = function () {
    let pim = get(".personal-infomation-mation");
    pim.style.display = "block";
}
//?鼠标移开隐藏事件
let pim = get(".personal-infomation-mation");
pim.onmouseleave = function () {
    pim.style.display = "none";
}
