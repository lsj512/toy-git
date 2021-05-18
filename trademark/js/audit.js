/*
 * @author: 小万
 * @create: 2021-05-06 14:59 PM
 * @license: MIT
 * @lastAuthor: Spring
 * @lastEditTime: 2021-05-12 15:12 PM
 * @desc:
 */
// !接收
import {
  ele,
  nextpage,
  lastpage,
  checkboxall,
  inputpage,
  firstpage,
  previouspage,
  The_current_page,
  maxpage,
  element,
  deleteok,
  creat,
  $,
  $all,
} from "./public.js"
// creat();
//! 获取满足条件接口数据
// localStorage.setItem("json", obj);
//TODO
var value = localStorage.getItem("accountInfo")
value = JSON.parse(value)[0]
console.log(value)
let user = []
axios
  .post("http://192.168.0.13:3000/getBusinessInfoByStatus", {
    account: value.account,
    status: "1",
  })
  .then(function (response) {
    console.log(response.data)
    // 所有数据状态为1数据
    let alldata = response.data
    // 获取姓名
    for (let i = 0; i < alldata.length; i++) {
      user.push(alldata[i].applicant_name)
    }
    todd(alldata)
    //
    if (value.username) {
      $("#welcome").innerHTML = value.username.substr(0, 1) + "客户欢迎你"
      $("#welcomes").innerHTML = value.username.substr(0, 1) + "客户"
    }

    // 删除按钮弹出对话框
    $(".delete").onclick = () => {
      $(".shade").style.display = "block"
    }
    //对话框确定删除按钮
    $("#ok").onclick = () => {
      deleteok(alldata, todd)
    }
    //对话框取消按钮
    $("#cancel").onclick = () => {
      $(".shade").style.display = "none"
    }
    //上一页
    $("#previouspage").onclick = () => {
      previouspage(alldata, todd)
    }
    //下一页
    $("#nextpage").onclick = () => {
      nextpage(alldata, todd)
    }
    //第一页
    $("#firstpage").onclick = () => {
      firstpage(alldata, todd)
    }
    //最后一页
    $("#lastpage").onclick = () => {
      lastpage(alldata, todd)
    }
    //输入页
    $("#inputpage").oninput = () => {
      inputpage(alldata, todd)
    }
    //查看详情
    $all(".operation").forEach((e, idx) => {
      e.onclick = () => {
        let data1 = alldata[idx - 1]
        // !存缓存
        data1 = JSON.stringify(data1)
        localStorage.setItem("da", data1)
        console.log(data1)
      }
    })
  })
  .catch(function (error) {
    console.log(error)
  })
// 渲染页面
function todd(alldata) {
  $(".table-info").innerHTML = ""
  if (maxpage * The_current_page > alldata.length) {
    for (let i = (The_current_page - 1) * maxpage; i < alldata.length; i++) {
      $(".table-info").innerHTML += ele(alldata, i)
    }
  } else {
    for (
      let i = (The_current_page - 1) * maxpage;
      i < maxpage * The_current_page;
      i++
    ) {
      $(".table-info").innerHTML += ele(alldata, i)
    }
  }
}
