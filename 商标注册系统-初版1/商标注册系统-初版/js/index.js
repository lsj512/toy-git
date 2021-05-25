/*
 * @author: Alagon
 * @Date: 2021-05-08 15:15 PM
 * @license: MIT
 * @lastAuthor: LUOCAN
 * @lastEditTime: 2021-05-12 17:15 PM
 * @Description:
 */
"use strict";

// TODO 登录点击事件
let btnd = get(".btnd");
btnd.onclick = addbtnd;
function addbtnd() {
  // ? input value
  let username = get(".username").value;
  // TODO 缓存
  let password = get(".password").value;
  let re = /^[a-zA-Z0-9_-]{4,16}$/.test(username);
  let rn = /^[a-zA-Z0-9_-]{4,16}$/.test(password);
  // ? 限制账号密码规范
  let data = [];
  if (!re) {
    get(".alert").style.display = "block";
    get(".alert-tx").innerHTML = "请输入正确的账号，可以是纯数字或者纯字母。";
    setTimeout(() => {
      get(".alert").style.display = "none";
    }, 2000);
    return;
  }
  if (!rn) {
    get(".alert").style.display = "block";
    get(".alert-tx").innerHTML = "请输入正确的密码，可以是纯数字或者纯字母。";
    setTimeout(() => {
      get(".alert").style.display = "none";
    }, 2000);
    return;
  }
  // ? 传数据
  axios
    .post("http://3961a5m073.qicp.vip/login", {
      account: username,
      password: password,
    })
    .then(function (response) {
      data = response.data;
      console.log(data);
      if (data.length > 0) {
        // alert("登录成功");
        location.href = "./center.html";
        window.localStorage.setItem("account", username);
        // window.localStorage.setItem("password", password);
        localStorage.clear;
      } else {
        get(".alert").style.display = "block";
        get(".alert-tx").innerHTML = "登录失败，请输入正确的账号、密码。";
        setTimeout(() => {
          get(".alert").style.display = "none";
        }, 2000);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

// TODO 手机号码登录
// ?显示手机号码登陆
let login = get(".phone_login");
login.addEventListener("click", addlogin);
function addlogin() {
  let account = get(".form_login");
  let fromLogin = get(".form_phone_login");
  account.style.display = "none";
  fromLogin.style.display = "block";
}
// ?显示手机登录
let phonelogin = get(".user_login");
phonelogin.addEventListener("click", addphonelogin);
function addphonelogin() {
  let account = get(".form_login");
  let fromLogin = get(".form_phone_login");
  account.style.display = "block";
  fromLogin.style.display = "none";
}

// TODO 手机号码登录点击事件
let phonebtn = get(".phone_login_btn");
let code = get(".code").value;

phonebtn.addEventListener("click", addphonebtn);
function addphonebtn() {
  let phonenum = get(".phone_num").value;
  let code = get(".code").value;
  let rp = /^1[3|4|5|7|8][0-9]{9}$/.test(phonenum);
  console.log(phonenum);
  if (!rp) {
    get(".alert").style.display = "block";
    get(".alert-tx").innerHTML = "请输入正确的手机号码。";
    setTimeout(() => {
      get(".alert").style.display = "none";
    }, 2000);
    return;
  } else {
    axios
      .post("http://3961a5m073.qicp.vip/phone", {
        phone: phonenum,
        code: code,
      })
      .then(function (response) {
        let data = response.data;
        console.log(data);
        if (data.length > 0) {
          location.href = "./center.html";
          window.localStorage.setItem("phone", phonenum);
        } else {
          get(".alert").style.display = "block";
          get(".alert-tx").innerHTML = "登录失败，请输入正确的手机号、验证码。";
          setTimeout(() => {
            get(".alert").style.display = "none";
          }, 2000);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

// TODO 工具函数
function get(node) {
  return document.querySelector(node);
}
function gets(nodes) {
  return document.querySelectorAll(nodes);
}
