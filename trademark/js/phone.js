/*
 * @author: TANG
 * @create: 2021-05-11 11:13 AM
 * @license: MIT
 * @lastAuthor: TANG
 * @lastEditTime: 2021-05-11 18:49 PM
 * @desc:
 */
/**
 *
 * @param {*} item 节点的class值
 * @returns 返回获取的节点
 */
function $(item) {
  return document.querySelector(item);
}
// 定义特殊字符串并分割成数组用以后面判断
let reg = /\\|\/|\！|\~|\'|\=|\^|\#|\@|\!|\￥|\…|\&|\—|\(|\)|\（|\）|\，|\,|\。|\.|\+|\-|\·|\%|\~|\?|\？|\*|\"|\“|\”|\'|\‘|\’|\<|\>|\{|\}|\[|\]|\【|\】|\：|\；|\;|\:|\、|\^|\$|\!|\~|\`|\|/g;

//TODO电话号码
$(".phoneNum").onblur = function () {
  let phoneNum = $(".phoneNum").value;
  //去除多余空格
  phoneNum = phoneNum.trim();
  phoneNum = phoneNum.replace(/ /g, "");
  phoneNum = phoneNum.replace(reg, "");
  $(".phoneNum").value = phoneNum;
  //判断是否为空
  if (phoneNum == "") {
    alert("不能为空值");
  } else {
    if (isNaN(phoneNum) == true) {
      alert("只能输入数字");
      $(".phoneNum").value = "";
    } else {
      if (phoneNum.length == 11) {
        $(".phoneNum").value = phoneNum;
      } else {
        alert("只能输入11位");
        $(".phoneNum").value = "";
      }
    }
  }
};

$(".code").onblur = function () {
  let code = $(".code").value;
  //去除多余空格
  code = code.trim();
  code = code.replace(/ /g, "");
  code = code.replace(reg, "");
  $(".code").value = code;
  //判断是否为空
  if (code == "") {
    alert("不能为空值");
  } else {
    if (isNaN(code) == true) {
      alert("只能输入数字");
      $(".code").value = "";
    } else {
      if (code.length == 6) {
        $(".code").value = code;
      } else {
        alert("只能输入6位");
        $(".code").value = "";
      }
    }
  }
};

function LoginFn(acc, pass) {
  axios
    .post("http://192.168.0.13:3000/phone", {
      phone: acc,
      code: pass,
    })
    .then(function (response) {
      if (response.data == "") {
        alert("登录失败，请输入正确的密码和账号");
      } else {
        let obj = JSON.stringify(response.data[0].username);
        window.localStorage.setItem("accountInfo", obj);
        window.location.href="personal.html"
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
  let phoneNum = $(".phoneNum").value;
  let code = $(".code").value;
  if (phoneNum == "" || code == "") {
    alert("不能为空");
  } else {
    LoginFn(phoneNum, code);
  }
};
