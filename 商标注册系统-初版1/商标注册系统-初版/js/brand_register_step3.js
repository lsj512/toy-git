/*
 * @author: jie
 * @create: 2021-05-07 14:50 PM
 * @license: MIT
 * @lastAuthor: jie
 * @lastEditTime: 2021-05-14 15:37 PM
 * @desc: 商标注册步骤三
 */
//TODO启用严格模式
"use strict";

let stepArr = {}; //存放用户输入的注册信息
//TODO获取页面元素
let contac = get(".contacts"); //?联系人姓名
let contact1 = get(".contact"); //?联系人提示信息
let organization = get(".organization"); //?代理机构名称
let organizations = get(".organizations"); //?代理机构提示信息
let recipient = get(".recipient"); //?接收人
let recipients = get(".recipients"); //?接收人提示信息
let region = get(".region"); //? 地区
let regions = get(".regions"); //?地区提示信息
let date = get(".date"); //?展出日期
let dates = get(".dates"); //?展出时间提示信息
let number = get(".number"); //?商标类别编号
let btn = get("button"); //?获取按钮
let brand = get("textarea"); //?获取商标说明
let recip = get(".recip"); //?获取国内接收人地址
let affirm = get(".affirm"); //?获取点击确认时提交数据
let select = get(".select_content"); //?获取网点
let reg =
  /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/;
// console.log("🚀 ~ file: brand_register_step3.js ~ line 27 ~ brand", brand)
//? 判断用户再次点击修改并重新判断
function cont(keyser) {
  if (stepArr[keyser]) {
    delete stepArr[keyser];
  }
}

//TODO 添加失去焦点事件判断用户输入的格式是否正确

contac.onblur = function () {
  if (contac.value == "") {
    contact1.innerHTML = "您所输入的联系人姓名不能为空";
    cont("contac");
  } else if (!/[^\x00-\xff]/g.test(contac.value)) {
    contact1.innerHTML = "您所输入的联系人姓名格式错误";
    cont("contac");
  } else {
    contact1.innerHTML = "示例：张三";
    localStorage.setItem("contac", contac.value); //缓存数据
    stepArr.contac = contac.value;
  }
};
organization.onblur = function () {
  if (organization.value == "") {
    organizations.innerHTML = "您所输入的代理机构名称不能为空";
    cont("organization");
  } else if (!/[^\x00-\xff]/g.test(organization.value)) {
    organizations.innerHTML = "您所输入的代理机构名称格式错误";
    cont("organization");
  } else {
    organizations.innerHTML = "示例：成都商标受理窗口";
    localStorage.setItem("organization", organization.value); //缓存数据
    stepArr.organization = organization.value;
  }
};

recipient.onblur = function () {
  if (recipient.value == "") {
    recipients.innerHTML = "您所输入的外国申请人的国内接收人不能为空";
    cont("recipient");
  } else if (!/[^\x00-\xff]/g.test(recipient.value)) {
    recipients.innerHTML = "您所输入的外国申请人的国内接收人格式错误";
    cont("recipient");
  } else {
    recipients.innerHTML = "示例：李四";
    localStorage.setItem("recipient", recipient.value); //缓存数据
    stepArr.recipient = recipient.value;
  }
};

recip.onblur = function () {
  if (recip.value == "") {
    get(".recips").innerHTML = "您所输入的外国申请人的国内接收人不能为空";
    cont("recip");
  } else if (!/[^\x00-\xff]/g.test(recip.value)) {
    get(".recips").innerHTML = "您所输入的外国申请人的国内接收人格式错误";
    cont("recip");
  } else {
    get(".recips").innerHTML = "示例：北京市xx区xx街xx号";
    localStorage.setItem("recip", recip.value); //缓存数据
    stepArr.recip = recip.value;
  }
};

region.onblur = function () {
  if (region.value == "") {
    regions.innerHTML = "您所输入的不能为空&nbsp;&nbsp;";
    cont("region");
  } else if (!/[^\x00-\xff]/g.test(region.value)) {
    regions.innerHTML = "您所输入的格式错误&nbsp;&nbsp;";
    cont("region");
  } else {
    regions.innerHTML = "示例：中国";
    localStorage.setItem("region", region.value); //缓存数据
    stepArr.region = region.value;
  }
};

//TODO 时间选择器 

function datatime() {
  var now = new Date();
  var year = now.getFullYear();
  var month =
    now.getMonth() + 1 < 10
      ? "0" + (now.getMonth() + 1)
      : now.getMonth() + 1;
  var day = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
  document
    .querySelector("#startCreatetime")
    .setAttribute("max", year + "-" + month + "-" + day);
}
datatime();
document.querySelector("#startCreatetime").onchange = function () {
  let startime = document.querySelector("#startCreatetime").value; //用户选择的时间
  let startime1 = document
    .querySelector("#startCreatetime")
    .getAttribute("max"); // 今天的日期
  // 截取日期进行对比
  console.log(startime.slice(0, 4));
  if (startime > startime1 && startime.slice(0, 4) < 2050) {
  document.querySelector("#startCreatetime").setAttribute("name", "true");
  localStorage.setItem("date", startime); //缓存数据
  stepArr.date = startime;
  console.log(startime);
  dates.innerHTML = "";
  } else {
    dates.innerHTML="您所选择的日期大于今天";
    cont("date");
  }
};
// date.onblur = function () {
//   if (date.value == "") {
//     dates.innerHTML = "您所输入的展出时间不能为空";
//     cont("date");
//   } else if (!reg.test(date.value)) {
//     dates.innerHTML = "您所输入的展出时间格式错误";
//     cont("date");
//   } else {
//     dates.innerHTML = "示例：2020-04-21 15:30:00";
//     localStorage.setItem("date", date.value); //缓存数据
//     stepArr.date = date.value;
//   }
// };

brand.onblur = function () {
  if (brand.value == "") {
    // alert("你所输入的不能为空");
    cont("brand");
  } else {
    localStorage.setItem("brand", brand.value); //缓存数据
    stepArr.brand = brand.value;
  }
};

number.onblur = function () {
  if (number.value.length != 6) {
    // alert("你所输入的不能为空");
    get(".mark1").innerHTML = "您所输入分为空或商标编号不为6位数"
    cont("brand");
  }else{
    localStorage.setItem("number", number.value); //缓存数据
    stepArr.number = number.value;
    get(".mark1").innerHTML = ""
  }
};
let radio = "";
if (get(".radio_left").checked == true) {
  radio = "集体商标";
  // console.log(radio);
}
get(".radio_left").onclick = function () {
  // console.log(get(".radio_left").checked);
  if (get(".radio_left").checked == true) {
    radio = "集体商标";
    // console.log(radio);
  }
};
get(".radio_right").onclick = function () {
  if (get(".radio_right").checked == true) {
    radio = "证明商标";
    // console.log(radio);
  }
};
//TODO 取出缓存
let enterprise1 = localStorage.getItem("enterprise"); // 获取申请人类型缓存数据
let license1 = localStorage.getItem("license"); // 获取有效执照缓存数据
let proposer1 = localStorage.getItem("proposer"); // 获取申请人缓存数据
let papers1 = localStorage.getItem("papers"); // 获取证件号码缓存数据
let site1 = localStorage.getItem("site"); // 获取地址信息缓存数据
// let conta2 = JSON.parse(localStorage.getItem("contact")); // 获取电话号码缓存数据
let username1 = localStorage.getItem("username"); // 获取申请人英文名缓存数据
let representative1 = localStorage.getItem("representative"); // 获取企业法人代表缓存数据
let address1 = localStorage.getItem("address"); // 获取英文地址缓存数据
let nationality1 = localStorage.getItem("nationality"); // 获取申请人国籍缓存数据
let postcode1 = localStorage.getItem("postcode"); // 获取邮政编码缓存数据

let credentials1 = localStorage.getItem("credentials"); // 获取用户注册输入的证件类型缓存数据
let province1 = localStorage.getItem("province"); // 获取用户注册输入的所属省份缓存数据
let city1 = localStorage.getItem("city"); // 获取用户注册输入的所属城市缓存数据
let account1 = localStorage.getItem("account"); //获取 账号

//TODO 添加点击事件 判断用户输入的值是否符合格式
btn.onclick = function () {
  let useArr = Object.keys(stepArr);
  console.log(useArr);
  if (useArr.length == 8) {
    get(".black_veil").style.display = "block";
  } else {
    get(".black_veil1").style.display = "block";
  }
};
get(".confirm1").onclick = function () {
  get(".black_veil1").style.display = "none";
};
//TODO点击选择网点
get(".op").onclick = function () {
  select.innerHTML = "成都市双流区某某街道××号";
};
get(".op1").onclick = function () {
  select.innerHTML = "成都市武侯区某某街道xx号";
};
get(".op2").onclick = function () {
  select.innerHTML = "成都市高新区某某街道xx号";
};
//TODO 添加点击事件当点击确认时上传数据
get(".affirm").onclick = function () {
  if(select.innerHTML =="请选择网点"){
    get(".cls").innerHTML = "请选择网点";
  }else{
  let cont2 = localStorage.getItem("contac"); //获取联系人姓名缓存数据
  let organization2 = localStorage.getItem("organization"); //获取代理机构名称
  let recipient2 = localStorage.getItem("recipient"); //获取外国申请人的国内接收人
  let recip2 = localStorage.getItem("recip"); //获取国内接收人地址
  let region2 = localStorage.getItem("region"); //获取申请/展出国/地区
  let date2 = localStorage.getItem("date"); //获取申请/展出日期
  let brand2 = localStorage.getItem("brand"); //获取商标说明
  let number2 = localStorage.getItem("number"); //商标类别编号
  get(".point_out_window1").style.display = "none";
  get(".point_out_window2").style.display = "block";
  const select1 = select.innerHTML;
  date2 = date2 + ".00.000";
  console.log(date2);
  inner(
    account1,
    enterprise1,
    proposer1,
    license1,
    papers1,
    credentials1,
    site1,
    province1,
    city1,
    username1,
    representative1,
    address1,
    nationality1,
    postcode1,
    cont2,
    organization2,
    recipient2,
    recip2,
    region2,
    date2,
    radio,
    brand2,
    number2,
    select1
  );
  }
};

//TODO 绑定事件点击取消时返回上一级
get(".cancel").onclick = function () {
  get(".black_veil").style.display = "none";
  console.log(radio);
};

//TODO 插入数据
const inner = function (
  act,
  ent,
  pr,
  lic,
  ps,
  cr,
  sit,
  prce,
  cit,
  user,
  rep,
  add,
  nat,
  post,
  conc,
  org,
  rec,
  reci,
  reg,
  dat,
  rad,
  bran,
  ber,
  sele
) {
  axios
    .post("http://3961a5m073.qicp.vip/createBusiness", {
      account: act,
      applicant_type: ent,
      applicant_name: pr,
      valid_license: lic,
      certificate_ID: ps,
      certificate_type: cr,
      address: sit,
      identity: prce,
      city: cit,
      EN_name: user,
      legal_person: rep,
      EN_address: add,
      applicant_nationality: nat,
      postal_code: post,
      contacts: conc,
      agency_name: org,
      domestic_recipients: rec,
      recipient_address: reci,
      application_country: reg,
      application_date: dat,
      application_instructions: rad,
      application_priority: "1",
      trademark_info: bran,
      trademark_type_id: ber,
      nets: sele,
      trademark_project: "住所代理",
    })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};

//TODO 添加点击事件

get(".confirm").onclick = function () {
  // window.location.href = "brand_subsequent.html";
};
//TODO 工具函数
function get(item) {
  return document.querySelector(item);
}
