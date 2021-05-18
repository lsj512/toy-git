/*
 * @author: TANG
 * @create: 2021-05-07 14:41 PM
 * @license: MIT
 * @lastAuthor: TANG
 * @lastEditTime: 2021-05-08 16:18 PM
 * @desc: 
 */

  function RegisterFn(acc, pass) {
    axios
      .post("http://192.168.0.13:3000/register", {
        account: acc,
        password: pass,
      })
      .then(function (response) {
        alert("注册成功！");
        window.location.href="../index.html"
        // console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  
  function SearchFn(acc,passs,repasss) {
    axios
      .post("http://192.168.0.13:3000/username", {
        account: acc,
      })
      .then(function (response) {
        if(response.data == '此账号已存在'){
          alert("此账号已存在，请重新输入")
        }
        else{
          RegisterFn(passs, repasss)
        }
        // console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  
  function $(item) {
    return document.querySelector(item);
  }
  
  
  $(".RegisterLogin").onclick = function () {
    let RegisterAccount = $(".RegisterAccount").value;
    let RegisterPassword = $(".RegisterPassword").value;
    let reRegisterPassword = $(".reRegisterPassword").value;
    if (
      RegisterAccount == 0 ||
      RegisterPassword == 0 ||
      reRegisterPassword == 0
    ) {
      alert("账号或密码不能为空！")
    }
    else{
      if (RegisterPassword == reRegisterPassword) {
        SearchFn(RegisterAccount,RegisterPassword,reRegisterPassword);
      } else {
        alert("密码不一致");
        $(".reRegisterPassword").value = "";
      }
    }
  };