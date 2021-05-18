/*
 * @author: wxw
 * @create: 2021-05-08 19:32 PM
 * @license: MIT
 * @lastAuthor: Spring
 * @lastEditTime: 2021-05-11 19:54 PM
 * @desc: 社和失败修改
 */
import {$,$1} from "./wquery.js";
let applerName=$(".applerName");  //申请人名称（中文）
let EngName=$(".EngName");      //申请人地址（英文）
let applerAdress=$(".applerAdress");   //申请人地址（中文）
let EngAdress=$(".EngAdress");   //申请人地址（英文）
let contPeople=$(".contPeople");  //联系人
let phone=$(".phone");  //电话
let routeNum1=$(".routeNum1");  //邮政编码
let gradeName=$(".gradeName");  //代理机构名称
let savePeople=$(".savePeople");  //外国申请人的国内接收人
let savePeopleAdr=$(".savePeopleAdr");  //国内接收人地址
let routeNum2=$(".routeNum2");  //邮政编码
let markApply=$(".markApply");  //商标申请声明
let perApply=$(".perApply");  //要求优先权声明
let area=$(".area");  //申请/展出国家/地区
let applyNum=$(".applyNum");  //申请号
let typeIt=$(".typeIt");  //类别
let thingItem=$(".thing");  //商品/服务项目
let otherItName1=$(".otherItName1");  //申请企业名称1
let otherAdress1=$(".otherAdress1");  //申请人地址1
let otherItName2=$(".otherItName2");  //申请企业名称2
let otherAdress2=$(".otherAdress2");  //申请人地址2
console.log(999);

//禁用input框编辑
$("form input").forEach(ele => {
ele.disabled =true;   
ele.style.backgroundColor ="#fff";
});

$(".formOne").onclick = function(){
    $(".formOne input").forEach(ele =>ele.disabled=false);
}
$(".formTwo").onclick = function(){
    $(".formTwo input").forEach(ele =>ele.disabled=false);
}

//缓存的单号，用户
let orderId=localStorage.getItem("order_id");
let account=JSON.parse(localStorage.getItem("accountInfo"))
// 获取指定单号下的所有信息
window.onload=function(){
    try {
        axios.post('http://192.168.0.13:3000/getBusinessInfoByOrderID',{
          "orderID": `${orderId}`
        })
        .then(function (res) {
            //获取数据，开始操作
            start(res.data)
            console.log(res.data);
        })
        .catch(function (error) {
          console.log(error);
          alert("服务器丢失")
        });
      
    } catch (error) {
      console.log(error);
    }
    
}


function start(allData) {
    //TODO 初始化
    init(allData);
    //TODO 提交上传
    transmit(allData);

}





// 初始化
function init(allData) {
    applerName.value =allData[0].applicant_name;
    EngName.value=allData[0].EN_name;
    applerAdress.value=allData[0].address;
    EngAdress.value=allData[0].EN_address;
    contPeople.value=allData[0].contacts;
    phone.value=allData[0].phone;
    routeNum1.value=allData[0].postal_code;
    gradeName.value=allData[0].agency_name;
    savePeople.value=allData[0].domestic_recipients;
    savePeopleAdr.value=allData[0].routeNum2;
    routeNum2.value=allData[0].application_country;
    markApply.value=allData[0].application_instructions;
    area.value=allData[0].application_country;
    applyNum.value=allData[0].trademark_type_id;
    typeIt.value=allData[0].applicant_type;
    thingItem.value=allData[0].application_country;
}

//通过接口查找对应用户信息





// 上传
function transmit(allData){
//     console.log(orderId);
// console.log(account[0].account);
// console.log(typeIt.value);
// console.log(allData[0].valid_license==1?"身份证":allData[0].valid_license==2?
// "营业执照":allData[0].valid_license==3?"其他":allData[0].valid_license);
// console.log(allData[0].certificate_ID);
// console.log(allData[0].certificate_type==1?"身份证": allData[0].certificate_type==2?"营业执照":allData[0].certificate_type);
// console.log(applerAdress.value)
// console.log(phone.value)
// console.log( allData[0].identity)
// console.log(allData[0].city)
// console.log(EngName.value)
// console.log(allData[0].legal_person)
// console.log(allData[0].application_instructions)
// console.log(allData[0].application_date.split("T")[0])
// console.log(allData[0].application_date)
// console.log(applyNum.value);
// console.log(String(allData[0].business_type));

    $(".nextButton").onclick=function(){
        axios.post('http://192.168.0.13:3000/updateUserBusenessByOrder_id', {
            "orderId": orderId,
            "account": account[0].account,
            "applicant_type": typeIt.value,
            "applicant_name": applerName.value,
            "valid_license": String(allData[0].valid_license),
            "certificate_ID": allData[0].certificate_ID,
            "certificate_type": String(allData[0].certificate_type),
            "address": applerAdress.value,
            "phone": phone.value,
            "identity": allData[0].identity,
            "city": allData[0].city,
            "EN_name": EngName.value,
            "legal_person": allData[0].legal_person,
            "EN_address":  EngAdress.value,
            "applicant_nationality":allData[0].applicant_nationality,
            "postal_code": routeNum1.value,
            "contacts": contPeople.value,
            "agency_name": gradeName.value,
            "domestic_recipients":savePeople.value,
            "application_country":  thingItem.value,
            "application_date": allData[0].application_date.split("T")[0],
            "application_instructions": allData[0].application_instructions,
            "trademark_info": allData[0].trademark_info,
            "trademark_type_id":applyNum.value,
            "nets": allData[0].nets, 
            "business_type": String(allData[0].business_type)
 
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

            this.style.backgroundColor="#2C9DFC";
            $(".shade").style.display="block";
            

    }
    


}

// 点击确定退出
$(".sureIt").onclick=function(){
$(".shade").style.display="none";

}