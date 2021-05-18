/*
 * @author: wxw
 * @create: 2021-05-07 18:59 PM
 * @license: MIT
 * @lastAuthor: wxw
 * @lastEditTime: 2021-05-12 13:41 PM
 * @desc:
 */

//导入模块
// $，$1都获取页面多个元素，$是获取时如果只有一个元素，这个元素不是数组，
// $1获取的都是数组,idxArr1是证件类型，idxImg为上一步传送的证件照片
import { $, $1 } from "./wquery.js"
import { idxImg } from "./proposerInfo.js"
// console.log(idxArr1,idxImg);
let idxArr1 = localStorage.getItem("idxArr1")
let objNew = {}
// console.log(idxImg);

//判断输入内容
Is()

objNew.ID_card_type = idxArr1 //将证件类型添加入对象
objNew.upload_ID_Img = idxImg //将证件图片添加入对象

function Is() {
  //TODO 姓名
  let reg = /^[\u4E00-\u9FA5]+$/ //检测中文字符的正则
  $(".youName").onblur = function () {
    //不全是汉字
    //  console.log(this.value.length);
    if (
      (!reg.test(this.value.trim()) && this.value != "") ||
      this.value.length > 12
    ) {
      this.style.border = "1px solid #ff6735"
      console.log()
      $(".bottom-tips1").innerHTML = "输入不规范,请输入汉字"
      $(".bottom-tips1").style.color = "red"
      console.log(888)
      this.value = ""
    } else {
      //全是汉字
      this.style.border = "1px solid #e2e2e2"
      $(".bottom-tips1").innerHTML = "请输入您的姓名，示例 : 张三"
      $(".bottom-tips1").style.color = "#ff6735"
      objNew.username = this.value
    }
  }

  // TODO证件号码
  $(".indexNum").onblur = function () {
    //规范输入
    if (
      (this.value.trim().length == 18 &&
        !isNaN(this.value.trim().substr(0, 17)) &&
        (!isNaN(this.value.trim().substr(17, 1)) ||
          this.value.trim().substr(17, 1) == "X") &&
        this.value.substr(0, 1) != 0) ||
      this.value == ""
    ) {
      this.style.border = "1px solid #e2e2e2"
      $(".bottom-tips2").innerHTML = "请输入您的身份证号码"
      $(".bottom-tips2").style.color = "#ff6735"
      objNew.ID_card_num = this.value
    } else {
      //不规范
      this.style.border = "1px solid #ff6735"
      $(".bottom-tips2").innerHTML = "输入不规范"
      $(".bottom-tips2").style.color = "red"
      this.value = ""
    }
  }

  // TODO邮政编码
  $(".ruteNum").onblur = function () {
    if (
      (this.value.trim().length == 6 && !isNaN(this.value.trim())) ||
      this.value == ""
    ) {
      this.style.border = "1px solid #e2e2e2"
      $(".bottom-tips3").innerHTML = "请输入邮政编码，示例 : 610000"
      $(".bottom-tips3").style.color = "#ff6735"
      objNew.postcode = this.value
    } else {
      this.style.border = "1px solid #ff6735"
      $(".bottom-tips3").innerHTML = "输入不规范"
      $(".bottom-tips3").style.color = "red"
      this.value = ""
    }
  }

  //TODO地址
  $(".address").onblur = function () {
    if (this.value.trim().length < 25 || this.value == "") {
      this.style.border = "1px solid #e2e2e2"
      $(".bottom-tips4").innerHTML =
        "请输入您的所在地，示例 : **省**市**区**街**号"
      $(".bottom-tips4").style.color = "#ff6735"
      objNew.address = this.value
    } else {
      this.style.border = "1px solid #ff6735"
      $(".bottom-tips4").innerHTML = "长度不能大于25"
      $(".bottom-tips4").style.color = "red"
      this.value = ""
    }
  }


  // TODO账号
  let account1 = localStorage.getItem("accountInfo") //获取缓存中账号
  let accountInfo=JSON.parse(account1)[0]
  $(".uNum").value = JSON.parse(account1)[0].account //填入数据
  objNew.account = JSON.parse(account1)[0].account //存入账号
  $(".uNum").disabled = true

  // $(".uNum").onblur=function(){
  //   if((/^[0-9a-zA-Z]*$/g).test(this.value.trim())){
  //     console.log(444);
  //     this.style.border="1px solid #e2e2e2";
  //     $(".bottom-tips5").innerHTML="请设置您的账号，不能与他人重复。建议 : 6个字符，字母+数字";
  //     $(".bottom-tips5").style.color="#ff6735";
  //     objNew.account=this.value;
  //   }else{
  //     this.style.border="1px solid #ff6735";
  //     $(".bottom-tips5").innerHTML="请注意输入规范";
  //     $(".bottom-tips5").style.color="red";
  //     this.value="";
  //   }
  // }

  // TODO保密问题
  $(".selections").onclick = function (el) {
    let ques = el.target.innerHTML
    objNew.security = ques
  }

  //TODO保密答案
  $(".rootPsd").onblur = function () {
    objNew.security_answer = this.value
  }
  //  console.log($(".youName"));
  let youName = $(".youName")
  let indexNum = $(".indexNum")
  let aderess1 = $(".aderess")
  let uNum = $(".uNum")
  //  let selections=objNew.security;

  let rootPsd = $(".rootPsd")

  //TODO 点击完成
  $(".nextButton").onclick = function () {
    console.log(objNew.ID_card_type)
    console.log(objNew)
    //必填项不为空
    if (
      youName.value != "" &&
      indexNum.value != "" &&
      aderess1.value != "" &&
      uNum.value != "" &&
      rootPsd.value != ""
    ) {
      this.style.backgroundColor = "#013D87"
      //TODO 向服务端发送完善填写信息数据
      try {
        console.log(objNew.ID_card_type)
        axios
          .post("http://192.168.0.13:3000/updateUserInfo", {
            account: `${objNew.account}`,
            username: `${objNew.username}`,
            ID_card_type:
              objNew.ID_card_type == "身份证"
                ? String(1)
                : objNew.ID_card_type == "营业执照"
                ? String(2)
                : String(3),
            ID_card_num: `${objNew.ID_card_num}`,
            postcode: `${objNew.postcode}`,
            address: `${objNew.address}`,
            security: `${objNew.security}`,
            security_answer: `${objNew.security_answer}`,
            upload_ID_Img: `${objNew.upload_ID_Img}`,
          })
          .then(function (res) {
            //新建对象数组存储更新缓存的用户信息
            let arr1=[];
            arr1[0]=objNew;
            arr1=JSON.stringify(arr1);
            localStorage.setItem("accountInfo",arr1);


          })
          .catch(function (error) {
            console.log(error)
            alert("服务器丢失")
          })
      } catch (error) {
        console.log(error)
      }
      alert("提交成功！")
    } else {
      //必填项存在控制
      this.style.backgroundColor = "#999"
      alert("经检测存在空值，请注意填写")
    }
  }
}
