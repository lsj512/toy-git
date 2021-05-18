/*
 * @author: lsj
 * @create: 2021-05-07 18:33 PM
 * @license: MIT
 * @lastAuthor: lsj
 * @lastEditTime: 2021-05-13 20:05 PM
 * @desc:
 */
"use strict";
// function ala(ele) {

//   ele.forEach(elem => {
//     console.log(elem.username);

//   });
// }
let alldata = [];
//TODO获取缓存
let apa = localStorage.getItem("accountInfo");
apa = JSON.parse(apa);
console.log(apa);
console.log(apa[0].account);
console.log(apa[0].username);
let nemn = get("#neme");
let nemb = get("#nema");
nemn.innerHTML = apa[0].username.substr(0, 1);
nemb.innerHTML = apa[0].username.substr(0, 1);
//TODO获取元素方法
function get(name) {
  return document.querySelector(name);
}
function getall(name) {
  return document.querySelectorAll(name);
}
//TODO获取input框
let input1 = get(".opassword");
let input2 = get(".npassword");
console.log(input2);
let input3 = get(".repassword");
let btn = get(".check");

window.onload = function () {};
//TODO获取原始密码
input1.onblur = function () {
  let value = input1.value;
  console.log(apa[0].account);
  console.log(value);
  axios
    .post("http://192.168.0.13:3000/login", {
      account: apa[0].account, //传参
      password: value,
    })
    .then(function (response) {
      if (response.data.length >= 1) {
        input1.style.cssText = "border: 1px solid #e7e7e7;";
        input1.setAttribute("atuname", "atuvalue");
      } else {
        confirm("原始密码错误");
        input1.value = "";
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};
//?获取input1焦点
input1.onfocus = function () {
  input1.style.cssText = "border: 1px solid #e7e7e7;";
};
//TODO插入数据
btn.onclick = function () {
  let atum = [];
  let atu = document.querySelectorAll(".all");
  atum = [...atu];
  // console.log(atum);
  let ao = atum.every((e) => {
    return e.getAttribute("atuname", "atuvalue");
  })
  console.log(ao);
  if (ao) {
    insert(apa[0].account, input1.value, input2.value);
    // alert("修改成功");
  } else {
    confirm("请输入完整的信息");
    // console.log(12);
  }
};

//?input2失焦事件
input2.onblur = function () {
  let patter = /^[a-zA-Z]\w{5,17}$/; //正则表达式，以字母开头，长度在6-18之间，只能包含字符、数字和下划线
  if (!patter.test(input2.value)) {
    // console.log(input2.value);
    input2.style.cssText = "border: 1px solid red;";
  } else {
    input2.style.cssText = "border: 1px solid #e7e7e7;";
    input2.setAttribute("atuname", "atuvalue");
  }
};
//?获取input2焦点
input2.onfocus = function () {
  input2.style.cssText = "border: 1px solid #e7e7e7;";
};

//?input3失焦事件
input3.onblur = function () {
  if (input3.value != input2.value) {
    confirm("The two passwords don't match(两次密码不一致)");
    input3.value = "";
  } else {
    input3.style.cssText = "border: 1px solid #e7e7e7;";
    input3.setAttribute("atuname", "atuvalue");
  }
};

//TODO加载数据
const insert = function (a, b, c) {
  axios
    .post("http://192.168.0.13:3000/changePWD", {
      acount: a, //传参
      oldPWD: b,
      newPWD: c,
    })
    .then(function (response) {
      console.log(response);
      alldata = response;
      if (response.status == 200) {
        confirm("Password changed successfully(修改成功)");
        location.href = "../index.html";
      }

      // Alldata(alldata);
    })
    .catch(function (error) {
      console.log(error);
    });
};

let lao = get(".lao");
let shi = get(".shi");
lao.onclick=()=>{
  self.location = "../html/register.html";
}
shi.onclick=()=>{
  self.location = "../html/trademark.html";
}
