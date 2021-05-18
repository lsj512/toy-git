/*
 * @author: TANG
 * @create: 2021-05-07 16:24 PM
 * @license: MIT
 * @lastAuthor: TANG
 * @lastEditTime: 2021-05-11 18:22 PM
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

//TODO姓名失焦事件
$(".Cname").onblur = function () {
  let Cname = $(".Cname").value;
  //去除多余空格
  Cname = Cname.trim();
  Cname = Cname.replace(/ /g, "");
  //判断是否为空
  if (Cname == "") {
    alert("不能为空值");
  } else {
    //判断是否
    if (Cname.length < 30) {
      //设置中间值
      // let flag = 0;
      // for (let i = 0; i < specialChar.length; i++) {
      //   //遍历一下，判断值里有没有特殊符号
      //   if (Cname.indexOf(specialChar[i]) != -1) {
      //     //有特殊符号中间值就加一
      //     flag++;
      //   }
      // }
      // //如果中间值不为0，那么值里就有特殊字符
      // if (flag != 0) {
      //   alert("不能输入特殊字符，请修改！");
      // } else {
      //   $(".Cname").value = Cname;
      // }
      //替换所有特殊字符
      Cname = Cname.replace(reg, "");
      $(".Cname").value = Cname;
    } else {
      alert("超长了好吧");
      $(".Cname").value = "";
    }
  }
};

//TODO证件编号
$(".num").onblur = function () {
  let num = $(".num").value;
  //去除多余空格
  num = num.trim();
  num = num.replace(/ /g, "");
  num = num.replace(reg, "");
  $(".num").value = num;
  //判断是否为空
  if (num == "") {
    alert("不能为空值");
  } else {
    if (isNaN(num) == true) {
      alert("只能输入数字");
      $(".num").value = "";
    } else {
      if (num.length == 18) {
        $(".num").value = num;
      } else {
        alert("只能输入18位");
        $(".num").value = "";
      }
    }
  }
};

//TODO地址
$(".Caddress").onblur = function () {
  let Caddress = $(".Caddress").value;
  //去除多余空格
  Caddress = Caddress.trim();
  Caddress = Caddress.replace(/ /g, "");
  Caddress = Caddress.replace(reg, "");
  $(".Caddress").value = Caddress;
  //判断是否为空
  if (Caddress == "") {
    alert("不能为空值");
  } else {
    //判断是否
    if (Caddress.length < 30) {
    } else {
      alert("超长了好吧");
      $(".Caddress").value = "";
    }
  }
};

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

//TODO英文名
$(".Ename").onblur = function () {
  let Ename = $(".Ename").value;
  //去除多余空格
  Ename = Ename.trim();
  Ename = Ename.replace(/ /g, "");
  Ename = Ename.replace(reg, "");
  $(".Ename").value = Ename;
  if (Ename.length < 20) {
  } else {
    alert("超长了好吧");
    $(".Ename").value = "";
  }
};

//TODO法人代表
$(".reprent").onblur = function () {
  let reprent = $(".reprent").value;
  //去除多余空格
  reprent = reprent.trim();
  reprent = reprent.replace(/ /g, "");
  reprent = reprent.replace(reg, "");
  $(".reprent").value = reprent;
  if (reprent.length < 20) {
  } else {
    alert("超长了好吧");
    $(".reprent").value = "";
  }
};

//TODO英文地址
$(".Eaddress").onblur = function () {
  let Eaddress = $(".Eaddress").value;
  //去除多余空格
  Eaddress = Eaddress.trim();
  Eaddress = Eaddress.replace(/ /g, "");
  Eaddress = Eaddress.replace(reg, "");
  $(".Eaddress").value = Eaddress;
  if (Eaddress.length < 20) {
  } else {
    alert("超长了好吧");
    $(".Eaddress").value = "";
  }
};

//TODO申请人国籍地区
$(".area").onblur = function () {
  let area = $(".area").value;
  //去除多余空格
  area = area.trim();
  area = area.replace(/ /g, "");
  area = area.replace(reg, "");
  $(".area").value = area;
  if (area.length < 20) {
  } else {
    alert("超长了好吧");
    $(".area").value = "";
  }
};

//TODO邮政编码
$(".adNum").onblur = function () {
  let adNum = $(".adNum").value;
  //去除多余空格
  adNum = adNum.trim();
  adNum = adNum.replace(/ /g, "");
  adNum = adNum.replace(reg, "");
  $(".adNum").value = adNum;
  if (isNaN(adNum) == true) {
    alert("只能输入数字");
    $(".adNum").value = "";
  } else {
    if (adNum.length == 6) {
      $(".adNum").value = adNum;
    } else {
      alert("只能输入6位");
      $(".adNum").value = "";
    }
  }
};

let type = $("#selectA")[0].text;
let provinces = "";
let city = "";

$("#selectA").onclick = function () {
  let obj = document.getElementById("selectA");
  for (i = 0; i < obj.length; i++) {
    //下拉框的长度就是它的选项数.
    if (obj[i].selected == true) {
      type = obj[i].text;
    }
  }
};

$("#selectB").onclick = function () {
  let obj = document.getElementById("selectB");
  for (i = 0; i < obj.length; i++) {
    //下拉框的长度就是它的选项数.
    if (obj[i].selected == true) {
      if (i == 0) {
      } else {
        provinces = obj[i].text;
      }
    }
  }
};

$("#selectC").onclick = function () {
  let obj = document.getElementById("selectC");
  for (i = 0; i < obj.length; i++) {
    //下拉框的长度就是它的选项数.
    if (obj[i].selected == true) {
      if (i == 0) {
      } else {
        city = obj[i].text;
      }
    }
  }
};

//TODO提交
$(".nextButton-box").onclick = function () {
  if(type == '身份证'){
    type = "1";
  }else{
    type = "2";
  }
  let Cname = $(".Cname").value;
  let num = $(".num").value;
  let Caddress = $(".Caddress").value;
  let phoneNum = $(".phoneNum").value;

  let Ename = $(".Ename").value;
  let reprent = $(".reprent").value;
  let Eaddress = $(".Eaddress").value;
  let area = $(".area").value;
  let adNum = $(".adNum").value;
  if (
    city == "" ||
    provinces == "" ||
    Cname == "" ||
    num == "" ||
    Caddress == "" ||
    phoneNum == ""
  ) {
    alert("必要值还没填完呢！");
  } else {
    let cname = JSON.stringify(Cname);
    window.localStorage.setItem("Cname", cname);
    let numnum = JSON.stringify(num);
    window.localStorage.setItem("num", numnum);
    let caddress = JSON.stringify(Caddress);
    window.localStorage.setItem("Caddress", caddress);
    let phonenum = JSON.stringify(phoneNum);
    window.localStorage.setItem("phoneNum", phonenum);
    let Type = JSON.stringify(type);
    window.localStorage.setItem("type", Type);
    let Provinces = JSON.stringify(provinces);
    window.localStorage.setItem("provinces", Provinces);
    let City = JSON.stringify(city);
    window.localStorage.setItem("city", City);
    let ename = JSON.stringify(Ename);
    window.localStorage.setItem("Ename", ename);
    let Reprent = JSON.stringify(reprent);
    window.localStorage.setItem("reprent", Reprent);
    let eaddress = JSON.stringify(Eaddress);
    window.localStorage.setItem("Eaddress", eaddress);
    let Area = JSON.stringify(area);
    window.localStorage.setItem("area", Area);
    let AdNum = JSON.stringify(adNum);
    window.localStorage.setItem("adNum", AdNum);
    window.location.href="CTS_TrademarkRegistration1.html"
  }
};
$('.showUser-img').onclick = function(){
  $('.personal-infomation-mation').style.cssText = 'display:block;';
}
$('#clear').onclick = function(){
  $('.personal-infomation-mation').style.cssText = 'display:none;';
  // console.log(111);
}
