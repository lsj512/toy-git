/*
 * @author: jie
 * @create: 2021-05-07 14:50 PM
 * @license: MIT
 * @lastAuthor: jie
 * @lastEditTime: 2021-05-14 15:51 PM
 * @desc: 商标注册步骤二
 */
//TODO启用严格模式
"use strict";
let userArr = {}; //存储用户输入的信息
//TODO获取页面元素
let proposer = get(".proposer"); //公司名称
let point = get(".proposers"); //公司名称提示信息
let papers = get(".papers"); //证件号码
let paper = get(".pointcontent"); //证件提示信息
let site = get(".site"); //地址信息
let sites = get(".sites"); //地址提示信息
let contact = get(".contact"); //手机号码
let contacts = get(".contacts"); //手机号码提示信息
let username = get(".username"); //申请人
let designation = get(".designation"); //申请人提示信息
let representative = get(".representative"); //企业法人代表
let representatives = get(".representatives"); //填写公司法人提示信息
let address = get(".address"); //地址
let addres = get(".addres"); //地址提示信息
let nationality = get(".nationality"); //国籍
let nationalitys = get(".nationalitys"); //国籍提示信息
let postcode = get(".postcode"); //邮编
let postcodes = get(".postcodes"); //邮编提示信息
let credentials = get(".credentials"); //证件类型
let province = get(".province"); //所属省份
let city = get(".city"); //所属城市
let reg = /^[0-9]+$/;
let reg1 =
  /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
// console.log(proposer);
//TODO 添加点击事件
let mid = 0;
get(".op").onclick = function () {
  credentials.innerHTML = "身份证";
  mid = 1;
};

get(".op1").onclick = function () {
  credentials.innerHTML = "营业执照";
  mid = 2;
};

// TODO 定义二级数组完成省市联动
let cityArr = [
  ["成都市", "德阳市", "绵阳市"],
  ["武汉市", "襄阳市", "随州市"],
  ["西安市", "汉中市", "咸阳市"],
];
// let optionAll = get('.option_all_top');
let optionLeft = document.querySelectorAll(".option_left");

// 获取省级元素框集合，填入innerHTML
let idx = 0;
optionLeft.forEach((ele, index) => {
  ele.onclick = function () {
    province.innerHTML = ele.innerHTML;
    console.log(province.innerHTML);
    idx = index;

    // 根据一级数组的下标填入二级数据的内容 先制空，再遍历
    city.innerHTML = "";
    get(".option_all_right").innerHTML = 
    `<div class="option opti option_right">${cityArr[idx][0]}</div>
      <div class="option opti1 option_right">${cityArr[idx][1]}</div>
      <div class="option opti2 option_right">${cityArr[idx][2]}</div>`;

    // 市级元素框集合，填入innerHTML
    let optionRight = document.querySelectorAll(".option_right");
    optionRight.forEach((ele) => {
      ele.onclick = function () {
        city.innerHTML = ele.innerHTML;
        console.log(city.innerHTML);
      };
    });
  };
});

//? 判断用户是否再次点击修改并重新判断
function cont(keyser) {
  if (userArr[keyser]) {
    delete userArr[keyser];
  }
}
// TODO 添加失焦事件判断用户输入是否符合要求
//!失去焦点判断用户输入的
proposer.onblur = function () {
  if (proposer.value == "") {
    point.innerHTML = "您所输入的不能为空";
    cont("proposer");
  } else if (!/[^\x00-\xff]/g.test(proposer.value)) {
    point.innerHTML = "您所输入的格式有其它字符,请输入中文";
    cont("proposer");
  } else {
    point.innerHTML =
      "提醒：主体名称：公司名称<br>示例：北京市×××网络科技有限公司/张三";
    localStorage.setItem("proposer", proposer.value); //缓存数据
    userArr.proposer = proposer.value;
  }
};

papers.onblur = function () {
  if (mid == 1) {
    if (papers.value == "") {
      paper.innerHTML = "您所输入的不能为空";
      cont("papers");
    } else if (!reg1.test(papers.value)) {
      paper.innerHTML = "您所输入的证件号码格式有误";
      cont("papers");
    } else {
      paper.innerHTML = "证件号码：身份证号码<br>身份证号码：5113251987112343";
      localStorage.setItem("papers", papers.value); //缓存数据
      userArr.papers = papers.value;
    }
  } else if (mid == 2) {
    if (papers.value == "") {
      paper.innerHTML = "您所输入的不能为空";
      cont("papers");
    } else if (!reg.test(papers.value) || !(papers.value.length == 16)) {
      paper.innerHTML = "您所输入的营业执照编号格式有误";
      cont("papers");
    } else {
      paper.innerHTML =
        "证件编号：营业执照编号<br>示例：营业执照编号:610103100025511";
      localStorage.setItem("papers", papers.value); //缓存数据
      userArr.papers = papers.value;
    }
  }
};

site.onblur = function () {
  if (site.value == "") {
    sites.innerHTML = "您所输入的不能为空";
    cont("site");
  } else if (!/[^\x00-\xff]/g.test(site.value)) {
    console.log("888888");
    sites.innerHTML = "您所输入的格式有其它字符,请输入中文";
    cont("site");
  } else {
    console.log("999999999");
    sites.innerHTML = "提醒： XX省+营业执照地址-致<br>示例：北京市xx区xx街xx号";
    localStorage.setItem("site", site.value); //缓存数据
    userArr.site = site.value;
  }
};

contact.onblur = function () {
  if (contact.value == "") {
    contacts.innerHTML = "您所输入的不能为空";
    cont("contact");
  } else if (!reg.test(contact.value) || !(contact.value.length == 11)) {
    contacts.innerHTML = "您所输入的手机号或座机号格式错误";
    cont("contact");
  } else {
    contacts.innerHTML = "提醒： 请填写 手机号 或 座机号<br>示例：13135256570";
    localStorage.setItem("contact", contact.value); //缓存数据
    userArr.contact = contact.value;
  }
};

username.onblur = function () {
  if (!/^[a-zA-Z]+$/.test(username.value)) {
    designation.innerHTML = "您所输入的格式有误或为空";
  } else {
    designation.innerHTML = "提醒：申请人若无中文名，请填写<br>示例：Michael";
    localStorage.setItem("username", username.value); //缓存数据
  }
};

representative.onblur = function () {
  if (!/^[a-zA-Z]+$/.test(representative.value)) {
    representatives.innerHTML = "您所输入的格式有误或为空";
  } else {
    representatives.innerHTML =
      "提醒：申请公司，请填写公司法人<br>示例：Michael";
    localStorage.setItem("representative", representative.value); //缓存数据
  }
};

address.onblur = function () {
  if (!/^[a-zA-Z\s]{4,50}$/.test(address.value)) {
    addres.innerHTML = "您所输入的格式有误或为空";
  } else {
    addres.innerHTML = "Xx Street xx in Beijing xx District";
    localStorage.setItem("address", address.value); //缓存数据
  }
};

nationality.onblur = function () {
  if (!/[^\x00-\xff]/g.test(nationality.value)) {
    nationalitys.innerHTML = "您所输入的格式错误或为空";
  } else {
    nationalitys.innerHTML = "示例：中国";
    localStorage.setItem("nationality", nationality.value); //缓存数据
  }
};

postcode.onblur = function () {
  if (!reg.test(postcode.value) || !(postcode.value.length == 6)) {
    postcodes.innerHTML = "您所输入的邮政编码格式错误或为空";
  } else {
    postcodes.innerHTML = " 示例：610000";
    localStorage.setItem("postcode", postcode.value); //缓存数据
  }
};

//TODO 添加点击事件 点击下一页传入用户输入的数据
console.log(userArr);
get("button").onclick = function () {
  //缓存用户注册输入的证件类型
  let credentials1 = "";
  if (credentials.innerHTML == "身份证") {
    credentials1 = "1";
  } else {
    credentials1 = "2";
  }
  // ! 选填信息
  let str = "暂无";

  localStorage.setItem("username", str); //缓存数据
  localStorage.setItem("representative", str); //缓存数据
  localStorage.setItem("address", str); //缓存数据
  localStorage.setItem("nationality", str); //缓存数据
  localStorage.setItem("postcode", str); //缓存数据

  console.log(credentials1);
  localStorage.setItem("credentials", credentials1); //缓存数据
  // 缓存用户注册输入的所属省份
  localStorage.setItem("province", province.innerHTML); //缓存数据
  if(city.innerHTML == ""){
  }else if(city.innerHTML == "选择城市"){
  }else{
    // 缓存用户注册输入的所属城市
    localStorage.setItem("city", city.innerHTML); // 缓存数据
    userArr.city = city.innerHTML;
  }
  
  //?判断用户注册输入是否为合法
  let useArr = Object.keys(userArr);
  if (useArr.length == 5) {
    window.location.href = "brand_register_step3.html";
  } else {
    get(".black_veil").style.display = "block";
  }
};
get(".confirm").onclick = function () {
  get(".black_veil").style.display = "none";
};
//TODO 工具函数
function get(item) {
  return document.querySelector(item);
}
