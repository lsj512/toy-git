/*
 * @author: LUOCAN
 * @create: 2021-05-11 10:43 AM
 * @license: MIT
 * @lastAuthor: LUOCAN
 * @lastEditTime: 2021-05-12 17:11 PM
 * @desc:用户名称
 */
// 导入方法
import { get, getall } from "./public.js";

let userdata = []; //存放数据
// TODO 获取用户数据
axios
  .get("http://3961a5m073.qicp.vip/getAllAccountInfo")
  .then(function (response) {
    // console.log(response.data);
    userdata = response.data; //存放数据中间变量
    Userdata(userdata); //声明方法使用数据
  })
  .catch(function (error) {
    console.log(error);
  });

function Userdata(userdata) {
  // 用户名称
  let user = localStorage.getItem("account");
  userdata.forEach((ele) => {
    if (ele.account == user) {
      getall(".user").forEach((u) => {
        console.log(123);
        u.innerHTML = ele.username.slice(0, 1) + "客户";
      });
    }
  });
}

// TODO 退出清除缓存
let btn = get(".header_userinfor");
let btn1 = btn.children[2].children[0];
btn1.onclick = function () {
  localStorage.clear();
};
