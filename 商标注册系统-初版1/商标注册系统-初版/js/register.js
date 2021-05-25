/*
 * @author: Alagon
 * @Date: 2021-05-08 16:34 PM
 * @license: MIT
 * @lastAuthor: LUOCAN
 * @lastEditTime: 2021-05-12 15:10 PM
 * @Description:
 */

let btn = get(".btn");
btn.onclick = addbtn;
function addbtn() {
  let username = get(".username").value;
  let password = get(".passworda").value;
  let passwordagain = get(".passwordagain").value;
  let phonenum = get(".phone_number").value;
  // ?正则表达式
  let re = /^[a-zA-Z0-9_-]{4,16}$/.test(username);
  let rn = /^[a-zA-Z0-9_-]{4,16}$/.test(password);
  let rg = /^[a-zA-Z0-9_-]{4,16}$/.test(passwordagain);
  let rp = /^[1][3,4,5,7,8][0-9]{9}$/.test(phonenum);

  if (!re) {
    // alert("账号不规范");
    get(".alert").style.display = "block";
    get(".alert-tx").innerHTML = "请输入正确的账号，可以是纯数字或者纯字母。";
    setTimeout(() => {
      get(".alert").style.display = "none";
    }, 2000);
    return;
  }
  if (!rn && !rg) {
    // alert("密码不规范");
    get(".alert").style.display = "block";
    get(".alert-tx").innerHTML = "请输入正确的密码，可以是纯数字或者纯字母。";
    setTimeout(() => {
      get(".alert").style.display = "none";
    }, 2000);
    return;
  }
  if (!rp) {
    // alert("请输入正确手机号码");
    get(".alert").style.display = "block";
    get(".alert-tx").innerHTML = "请输入正确的手机号码。";
    setTimeout(() => {
      get(".alert").style.display = "none";
    }, 2000);
    return;
  }

  // ? 传注册数据
  if (password == passwordagain) {
    axios
      .post("http://3961a5m073.qicp.vip/regis", {
        account: username,
        password: password,
        phone: phonenum,
      })
      .then(function (response) {
        console.log(response);
        data = response.data;
        console.log(data);
        if (data != "") {
          // alert("注册成功");
          location.href = "../index.html";
        } else {
          get(".alert").style.display = "block";
          get(".alert-tx").innerHTML = "注册失败，请重新尝试";
          setTimeout(() => {
            get(".alert").style.display = "none";
          }, 2000);
        }
      })
      .catch(function (error) {
        alert("账号已存在");
        console.log(error);
      });
  } else {
    // alert("两次密码输入不同");
    get(".alert").style.display = "block";
    get(".alert-tx").innerHTML = "两次密码输入不同，请重新尝试";
    setTimeout(() => {
      get(".alert").style.display = "none";
    }, 2000);
  }
}

// TODO 工具函数
function get(node) {
  return document.querySelector(node);
}
function gets(nodes) {
  return document.querySelector(nodes);
}
