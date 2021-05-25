/*
 * @author: jie
 * @create: 2021-05-08 11:45 AM
 * @license: MIT
 * @lastAuthor: jie
 * @lastEditTime: 2021-05-14 16:31 PM
 * @desc: 商标注册步骤一
 */
//TODO启用严格模式
"use strict";
 
//TODO 获取页面元素
let enterprise = get(".enterprise");
let license = get(".license");
//TODO 添加点击事件通过
get(".options").onclick = function(){
    enterprise.innerHTML = "企业/单位申请";
}

get(".options1").onclick = function(){
    enterprise.innerHTML = "自然人";
}

get(".options2").onclick = function(){
    enterprise.innerHTML = "其他";
}

get(".optio").onclick = function(){
    license.innerHTML = "身份证";
}

get(".optio1").onclick = function(){
    license.innerHTML = "营业执照";
}

get(".optio2").onclick = function(){
    license.innerHTML = "其他";
}

get("button").onclick = function(){
    const userdata = enterprise.innerHTML;
    const userdata1 = license.innerHTML;
    
    //?缓存
    let userdata2 = "";
    console.log(userdata);
    if(userdata1 == "身份证"){
        userdata2 = "1";
    }else if(userdata1 == "营业执照"){
        userdata2 = "2";
    }else{
        userdata2 = "3";
    }
    localStorage.setItem("enterprise", userdata); //缓存数据
    localStorage.setItem("license", userdata2);
    window.location.href = "brand_register_step2.html";
}

 //TODO 工具函数
 function get(item) {
    return document.querySelector(item);
}