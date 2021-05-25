/*
 * @author: Alagon
 * @Date: 2021-05-07 14:54 PM
 * @license: MIT
 * @lastAuthor: LUOCAN
 * @lastEditTime: 2021-05-12 16:27 PM
 * @Description:
 */
"use strict";

// TODO 输入框内容规范判断
// TODO 输入框节点
let user = get(".input-one");
let userCard = get(".input-two");
let postal = get(".input-three");
let addressCard = get(".input-four");
let usern = get(".input-five");
let guard = get(".input-seven");

// TODO 提示内容节点
let userPrompt = get(".user-prompt");
let userId = get(".user-id");
let postalId = get(".postal-id");
let address = get(".address");
let username = get(".username");
let guardtext = get(".guard");

let newdata = {};

// TODO 输入框内容规范判断事件、函数
// ?用户名
user.addEventListener("blur", adduser);
function adduser() {
  let rj = /^[\u4e00-\u9fa5]+$/.test(user.value);
  if (user != "" && rj) {
    userPrompt.innerHTML = "用户名合法";
    newdata.username = user.value;
    console.log(newdata);
  } else {
    userPrompt.innerHTML = "用户名应为中文";
    user.style.border = "1px solid #ff6633";
    // user.value = "";
    console.log(newdata);
    delete newdata["username"];
  }
  addchang();
}

// ?身份证
userCard.addEventListener("blur", addusercard);
function addusercard() {
  let rg =
    /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(
      userCard.value
    );
  if (userCard.value != "" && rg && userCard.value.length == 18) {
    userId.innerHTML = "用户名合法";
    newdata.ID_card_num = userCard.value;
    console.log(newdata);
  } else {
    userId.innerHTML = "身份证应为17位数字加字母或数字";
    userCard.style.border = "1px solid #ff6633";
    // userCard.value = "";
    delete newdata["ID_card_num"];
  }
  addchang();
}

// ?邮政编码
postal.addEventListener("blur", addpostal);
function addpostal() {
  // let rn =/^[1-9]\\d{5}$/.test(postal.value)
  if (postal.value != "" && postal.value.length == 6) {
    postalId.innerHTML = "邮政编码合法";
    newdata.postcode = postal.value;
  } else {
    postalId.innerHTML = "邮政编码应为6位数字";
    postal.style.border = "1px solid #ff6633";
    // postal.value = "";
    delete newdata["postcode"];
  }
  addchang();
}

// ? 地址
addressCard.addEventListener("blur", AddressCard);
function AddressCard() {
  let ad = /^[\u4e00-\u9fa5]{0,}$/.test(addressCard.value);
  if (addressCard.value != "" && ad) {
    address.innerHTML = "内容合法";
    newdata.address = addressCard.value;
  } else {
    address.innerHTML = "地址应为中文";
    addressCard.style.border = "1px solid #ff6633";
    // addressCard.value = "";
    delete newdata["address"];
  }
  addchang();
}

// ?账号
usern.addEventListener("blur", addusern);
function addusern() {
  let um = /^[a-zA-Z0-9]/.test(usern.value);
  if (usern.value != "" && um) {
    username.innerHTML = "内容合法";
    newdata.account = usern.value;
  } else {
    username.innerHTML = "请输入正确动账号，可以为纯数字或纯字母";
    usern.style.border = "1px solid #ff6633";
    // newdata.usern = "";
    // usern.value = "";
    delete newdata["account"];
  }
  addchang();
}

// ?密保
guard.addEventListener("blur", addguard);
function addguard() {
  let gd = /\w||[\u4e00-\u9fa5]{0,}/.test(guard.value);
  if (guard.value != "" && gd) {
    guardtext.innerHTML = "内容合法";
    newdata.security_answer = guard.value;
    console.log(newdata);
  } else {
    guardtext.innerHTML = "内容不合法";
    guard.style.border = "1px solid #ff6633";
    // guard.value = "";
    delete newdata["security_answer"];
    console.log(newdata);
  }
  addchang();
}

// ?改变 按钮颜色
function addchang() {
  let newdataL = Object.keys(newdata);
  console.log(newdataL);
  if (newdataL.length == 6) {
    get(".footer").style.background = "skyblue";
  } else {
    get(".footer").style.background = "#999";
  }
}

// TODO 输入框有无值判断
get(".footer").addEventListener("click", addFinish);

// TODO 输入框有无值判断函数
function addFinish() {
  let inputFinish = gets(".inputFinish");
  let arr = [...inputFinish];
  let re = arr.every((element) => {
    return element.value != "";
  });
  if (re == false) {
    // alert("信息不完善");
    get(".alert").style.display = "block";
    get(".alert-tx").innerHTML = "请完善所有信息。";
    setTimeout(() => {
      get(".alert").style.display = "none";
    }, 2000);
  }

  let userdata = [];
  let username = window.localStorage.getItem("account");

  axios
    .get("http://3961a5m073.qicp.vip/getAllAccountInfo")
    .then(function (response) {
      console.log(response.data);
      userdata = response.data;
      console.log(userdata);
      addj(userdata);
    })
    .catch(function (error) {
      console.log(error);
    });

  function addj(userdata) {
    let passworda = [];
    console.log(userdata);
    userdata.forEach((element) => {
      if (element.account == username) {
        passworda = element.password;
      }
    });
    // ? 获取 select 的选中值
    let security = get(".input-six");
    let indexse = security.selectedIndex;
    let securitytext = security.options[indexse].text;
    let ID_card_type = window.localStorage.getItem("license");
    // let password = window.localStorage.getItem("password");
    newdata.ID_card_type = ID_card_type;
    newdata.password = passworda;
    newdata.security = securitytext;
    console.log(newdata);
    let newdataLL = Object.keys(newdata);
    if (re == true && newdataLL.length == 9) {
      console.log(1);
      axios
        .post("http://3961a5m073.qicp.vip/updateUserInfo", {
          account: newdata.account,
          password: newdata.password,
          username: newdata.username,
          ID_card_type: newdata.ID_card_type,
          ID_card_num: newdata.ID_card_num,
          postcode: newdata.postcode,
          address: newdata.address,
          security: newdata.security,
          security_answer: newdata.security_answer,
          upload_ID_Img: "0",
        })
        .then(function (response) {
          let data = response.data;
          console.log(data);
        })
        .catch(function (error) {
          console.log(error);
        });
      // 页面跳转，进入业务中心
      location.href = "../html/brand_subsequent.html";
    }
  }
}

// TODO 工具函数
function get(node) {
  return document.querySelector(node);
}
function gets(nodes) {
  return document.querySelectorAll(nodes);
}
