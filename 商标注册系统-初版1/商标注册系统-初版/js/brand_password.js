/*
 * @author: LUOCAN
 * @create: 2021-05-10 15:12 PM
 * @license: MIT
 * @lastAuthor: LUOCAN
 * @lastEditTime: 2021-05-14 15:35 PM
 * @desc:修改密码
 */

// 导入方法
import { get, getall } from "./public.js";

let alldata = []; //存放业务数据
window.onload = function () {
  axios
    .get("http://3961a5m073.qicp.vip/getAllAccountInfo") // 业务数据
    .then(function (response) {
      console.log(response.data);
      //存放数据中间变量
      alldata = response.data;
      //声明方法使用数据
      Alldata(alldata);
    })
    .catch(function (error) {
      console.log(error);
    });
};

// TODO 获取用户名
let name = localStorage.getItem("account");
console.log(name);
// 获取输入密码
let old = get(".old-password");
let pasd = get(".new-password");
let cfpsd = get(".cofpwd");

/**
 * @param {*} Alldata 获取用户数据对比事件
 */
function Alldata() {
  old.onblur = function () {
    alldata.forEach((ele) => {
      if (ele.account == name) {
        if (ele.password != old.value) {
          old.style.cssText = "border-color: red";
          get("#del-fenye").style.cssText = "display:block";
          get("#del-fy").innerHTML = "输入的原始密码不对";
          old.removeAttribute("only");
        } else {
          old.style.cssText = "border-color: #d9d9d9";
          old.setAttribute("only", 99);
        }
      }
    });
  };
}

// ? 限制账号密码规范
pasd.onblur = function () {
  let re = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{5,16}$/.test(pasd.value);
  if (re && pasd.value !== old.value) {
    pasd.style.cssText = "border-color: #d9d9d9";
    pasd.setAttribute("only", 99);
  } else {
    pasd.style.cssText = "border-color: red";
    get("#del-fenye").style.cssText = "display:block";
    get("#del-fy").innerHTML =
      "输入的密码必须是6-16位, 包含数字和字母,且不能和原始密码一样";
    pasd.removeAttribute("only");
  }
};
// 确认密码对比
cfpsd.onblur = function () {
  if (pasd.value != cfpsd.value) {
    cfpsd.style.cssText = "border-color: red";
    get("#del-fenye").style.cssText = "display:block";
    get("#del-fy").innerHTML = "请输入和上次一样的密码";
    cfpsd.removeAttribute("only");
  } else {
    cfpsd.style.cssText = "border-color: #d9d9d9";
    cfpsd.setAttribute("only", 99);
  }
};

// TODO 确认按钮事件
let btn = get(".affirm1");
console.log(btn);
btn.onclick = function () {
  let all = getall(".allpwd");
  //   console.log(all);
  let arr = [...all];
  //   console.log(arr);
  console.log(old.value);
  console.log(pasd.value);
  console.log(cfpsd.value);
  console.log(name);
  if (
    arr.every((ele) => {
      return ele.getAttribute("only") == 99;
    })
  ) {
    upapassword(name, old.value);
    console.log(131321);
  } else {
    get("#del-fenye").style.cssText = "display:block";
    get("#del-fy").innerHTML = "密码格式有误，请重试";
    // alert("格式有误");
  }
  //   upapassword();
  //   xxx.setAttribute("only", 99);

  //     get();
  //     let arr = [...get()];
  //     if (arr.every((ele)=>{return ele.getAttribute("only") == 99})) {
  //         axios
  //     }
};

/**
 * @param {*} upapassword  修改密码事件
 * @param {*} act 用户帐号
 * @param {*} oldpd 原始密码
 * @param {*} newpd 新密码
 */
function upapassword(act, oldpd, newpd) {
  axios
    .post("http://3961a5m073.qicp.vip/changePWD", {
      account: act,
      oldPWD: oldpd,
      newPWD: newpd,
    })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

// TODO 判断是否输入正确
get("#fycoform").onclick = function () {
  get("#del-fenye").style.cssText = "display:none";
};
