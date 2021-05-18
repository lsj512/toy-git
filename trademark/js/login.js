/*
 * @author: TANG
 * @create: 2021-05-06 15:56 PM
 * @license: MIT
 * @lastAuthor: Spring
 * @lastEditTime: 2021-05-11 19:16 PM
 * @desc:
 */

function LoginFn(acc, pass) {
  axios
    .post("http://192.168.0.13:3000/login", {
      account: acc,
      password: pass,
    })
    .then(function (response) {
      if (response.data == "") {
        alert("登录失败，请输入正确的密码和账号");
      } else {
        console.log(1111);
        let obj=JSON.stringify(response.data)
        window.localStorage.setItem('accountInfo',obj)
        window.location.href="html/personal.html"
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}


function $(item) {
  return document.querySelector(item);
}

$("#login").onclick = function () {
  let account = $(".account").value;
  let password = $(".password").value;
  if (account == "" || password == "") {
    alert("不能为空");
  } else {
    LoginFn(account, password);
  }
};


