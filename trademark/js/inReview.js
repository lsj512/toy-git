/*
 * @author: 小万
 * @create: 2021-05-07 16:02 PM
 * @license: MIT
 * @lastAuthor: 小万
 * @lastEditTime: 2021-05-12 14:25 PM
 * @desc: 
 */
// let obj = {
//     account: 'test1'
// }
// obj = JSON.stringify(obj)
// localStorage.setItem("json", obj);
// var value = localStorage.getItem("json");
// value = JSON.parse(value)
// console.log(value);
// let data=da;
//!获取缓存
var data = localStorage.getItem("da");
// 删除缓存
// localStorage.removeItem("da");
data = JSON.parse(data)
console.log(data);
window.onload = function () {
    $("#welcome").innerHTML=data.applicant_name.substr(0,1)+"客户欢迎你"
    $("#welcomes").innerHTML=data.applicant_name.substr(0,1)+"客户"
    
    // 联系人
    $("#contacts").innerHTML = data.contacts;
    // 申请国家
    // $("#application_country").innerHTML = data.application_country;
    // 申请姓名
    $("#applicant_name").innerHTML = data.applicant_name
    // 城市
    // $("#city").innerHTML = data.city;
    // 代理机构名称
    // $("#agency_name").innerHTML = data.agency_name;
    // 申请人地址地址
    $("#EN_address").innerHTML = data.EN_address;
    // 申请人姓名英文
    $("#EN_name").innerHTML = data.EN_name
    // 电话
    $("#phone").innerHTML = data.phone
    // 类别
    $("#applicant_type").innerHTML = data.applicant_type
    // 国内接收人
    $("#domestic_recipients").innerHTML = data.domestic_recipients
    // 申请说明
    $("#application_instructions").innerHTML = data.application_instructions
}
$("#ok").onclick = () => {
    $(".shade").style.display = "none";
}
// 对话框取消按钮
$("#cancel").onclick = () => {
    $(".shade").style.display = "none";
}
$(".nextButton").onclick=()=>{
    localStorage.removeItem("da");
}
// 绑定控件函数
function $(change) {
    return document.querySelector(change);
}

function $all(changeall) {
    return document.querySelectorAll(changeall);
}
// 页面跳转
$(".showUser").onclick=()=>{
    self.location='./setpassword.html'; 
}