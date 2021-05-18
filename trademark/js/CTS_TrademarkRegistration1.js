/*
 * @author: TANG
 * @create: 2021-05-10 15:37 PM
 * @license: MIT
 * @lastAuthor: Spring
 * @lastEditTime: 2021-05-11 19:26 PM
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
let re = /\\|\！|\~|\'|\=|\^|\#|\@|\!|\￥|\…|\&|\—|\(|\)|\（|\）|\，|\,|\。|\.|\+|\-|\·|\%|\~|\?|\？|\*|\"|\“|\”|\'|\‘|\’|\<|\>|\{|\}|\[|\]|\【|\】|\：|\；|\;|\:|\、|\^|\$|\!|\~|\`|\|/g;
let reee = /\\|\~|\=|\^|\#|\@|\￥|\&|\+|\%|\~|\*|\<|\>|\^|\$|\~|\`|\|/g;

//TODO联系人姓名
$(".rname").onblur = function () {
  let rname = $(".rname").value;
  //去除多余空格
  rname = rname.trim();
  rname = rname.replace(/ /g, "");
  rname = rname.replace(reg, "");
  $(".rname").value = rname;
  //判断是否为空
  if (rname == "") {
    alert("不能为空值");
  } else {
    //判断是否
    if (rname.length < 20) {
    } else {
      alert("超长了好吧");
      $(".rname").value = "";
    }
  }
};

//TODO代理机构名称
$(".retName").onblur = function () {
  let retName = $(".retName").value;
  //去除多余空格
  retName = retName.trim();
  retName = retName.replace(/ /g, "");
  retName = retName.replace(reg, "");
  $(".retName").value = retName;
  //判断是否为空
  if (retName == "") {
    alert("不能为空值");
  } else {
    //判断是否
    if (retName.length < 20) {
    } else {
      alert("超长了好吧");
      $(".retName").value = "";
    }
  }
};

//TODO接收人
$(".receive").onblur = function () {
  let receive = $(".receive").value;
  //去除多余空格
  receive = receive.trim();
  receive = receive.replace(/ /g, "");
  receive = receive.replace(reg, "");
  $(".receive").value = receive;
  //判断是否为空
  if (receive == "") {
    alert("不能为空值");
  } else {
    //判断是否
    if (receive.length < 20) {
    } else {
      alert("超长了好吧");
      $(".receive").value = "";
    }
  }
};

//TODO申请区域
$(".reArea").onblur = function () {
  let reArea = $(".reArea").value;
  //去除多余空格
  reArea = reArea.trim();
  reArea = reArea.replace(/ /g, "");
  reArea = reArea.replace(reg, "");
  $(".reArea").value = reArea;
  //判断是否为空
  if (reArea == "") {
    alert("不能为空值");
  } else {
    //判断是否
    if (reArea.length < 20) {
    } else {
      alert("超长了好吧");
      $(".reArea").value = "";
    }
  }
};

//TODO申请日期
$(".reDate").onblur = function () {
  let reDate = $(".reDate").value;
  //去除多余空格
  reDate = reDate.trim();
  reDate = reDate.replace(/ /g, "");
  reDate = reDate.replace(reee, "");
  $(".reDate").value = reDate;
  //判断是否为空
  if (reDate == "") {
    alert("不能为空值");
  } else {
    if (reDate.length < 20) {
      if (
        isNaN(reDate.substring(0, 4)) == true ||
        reDate.substring(4, 5) != "-" ||
        isNaN(reDate.substring(5, 7)) == true ||
        reDate.substring(7, 8) != "-" ||
        isNaN(reDate.substring(8)) == true
      ){
        alert('输入规范地址，下面有提示！')
        $(".reDate").value = "";
      }
    } else {
      alert("超长了好吧");
      $(".reDate").value = "";
    }
  }
};

//TODO商标说明
$(".instructions").onblur = function () {
  let instructions = $(".instructions").value;
  //去除多余空格
  instructions = instructions.trim();
  instructions = instructions.replace(/ /g, "");
  instructions = instructions.replace(reee, "");
  $(".instructions").value = instructions;
  //判断是否为空
  if (instructions == "") {
    alert("不能为空值");
  } else {
    //判断是否
    if (instructions.length < 500) {
    } else {
      alert("超长了好吧");
      $(".instructions").value = "";
    }
  }
};

//TODO商标编号
$(".trademarkTyleId").onblur = function () {
  let trademarkTyleId = $(".trademarkTyleId").value;
  //去除多余空格
  trademarkTyleId = trademarkTyleId.trim();
  trademarkTyleId = trademarkTyleId.replace(/ /g, "");
  trademarkTyleId = trademarkTyleId.replace(reg, "");
  $(".trademarkTyleId").value = trademarkTyleId;
  //判断是否为空
  if (trademarkTyleId == "") {
    alert("不能为空值");
  } else {
    if (isNaN(trademarkTyleId) == true) {
      alert("只能输入数字");
      $(".trademarkTyleId").value = "";
    } else {
      if (trademarkTyleId.length == 6) {
        $(".trademarkTyleId").value = trademarkTyleId;
      } else {
        alert("输入位数不符合，只能输入6位数");
        $(".trademarkTyleId").value = "";
      }
    }
  }
};

$(".btn").onclick = function () {
  let rname = $(".rname").value;
  let retName = $(".retName").value;
  let receive = $(".receive").value;
  let reArea = $(".reArea").value;
  let reDate = $(".reDate").value;
  let instructions = $(".instructions").value;
  let trademarkTyleId = $(".trademarkTyleId").value;
  if (
    rname == "" ||
    retName == "" ||
    receive == "" ||
    reArea == "" ||
    reDate == "" ||
    instructions == "" ||
    trademarkTyleId == ""
  ) {
    alert("请完成所有必要信息");
  } else {
    let Rname, RetName, Receive, ReArea, ReDate, Instructions, TrademarkTyleId;
    let rname1 = "rname";
    let retName1 = "retName";
    let receive1 = "receive";
    let reArea1 = "reArea";
    let reDate1 = "reDate";
    let instructions1 = "instructions";
    let trademarkTyleId1 = "trademarkTyleId";
    fu(rname, Rname, rname1);
    fu(retName, RetName, retName1);
    fu(receive, Receive, receive1);
    fu(reArea, ReArea, reArea1);
    fu(reDate, ReDate, reDate1);
    fu(instructions, Instructions, instructions1);
    fu(trademarkTyleId, TrademarkTyleId, trademarkTyleId1);
    $('.cover').style.cssText='display:block';
    $('.all').style.cssText='display:block';
  }
};

let branches = $("#selectP")[0].text;
$("#selectP").onclick = function () {
    let obj = document.getElementById("selectP");
    for (i = 0; i < obj.length; i++) {
      //下拉框的长度就是它的选项数.
      if (obj[i].selected == true) {
        branches = obj[i].text;
      }
    }
  };
$('.queding').onclick = function(){
    let Branches;
    let branches1 = "branches";
    fu(branches,Branches,branches1);
    $('.all').style.cssText='display:none';
    $('.all2').style.cssText='display:block';
    let aa = JSON.parse(localStorage.getItem(''))
}

$('.quxiao').onclick = function(){
    $('.cover').style.cssText='display:none';
    $('.all').style.cssText='display:none';
}
$('.thir').onclick = function(){
    let aa = JSON.parse(localStorage.getItem('Type'));
    let bb = JSON.parse(localStorage.getItem('License'));
    let cc = JSON.parse(localStorage.getItem('Cname'));
    let dd = JSON.parse(localStorage.getItem('num'));
    let ee = JSON.parse(localStorage.getItem('Caddress'));
    let ff = JSON.parse(localStorage.getItem('phoneNum'));
    let gg = JSON.parse(localStorage.getItem('type'));
    let hh = JSON.parse(localStorage.getItem('provinces'));
    let ii = JSON.parse(localStorage.getItem('city'));
    let jj = JSON.parse(localStorage.getItem('Ename'));
    let kk = JSON.parse(localStorage.getItem('reprent'));
    let ll = JSON.parse(localStorage.getItem('Eaddress'));
    let mm = JSON.parse(localStorage.getItem('area'));
    let nn = JSON.parse(localStorage.getItem('adNum'));
    let oo = JSON.parse(localStorage.getItem('rname'));
    let pp = JSON.parse(localStorage.getItem('retName'));
    let qq = JSON.parse(localStorage.getItem('receive'));
    let rr = JSON.parse(localStorage.getItem('reArea'));
    let ss = JSON.parse(localStorage.getItem('reDate'));
    let tt = JSON.parse(localStorage.getItem('instructions'));
    let uu = JSON.parse(localStorage.getItem('trademarkTyleId'));
    let vv = JSON.parse(localStorage.getItem('branches'));
    let na = JSON.parse(localStorage.getItem('accountInfo'));
    
    console.log(na,"--------------------------------");
    na=na[0].account
    console.log(na,"--------------------------------");
    aa = aa + '';
    bb = bb + '';
    fn(aa,bb,cc,dd,ee,ff,gg,hh,ii,jj,kk,ll,mm,nn,oo,pp,qq,rr,ss,tt,uu,vv,na);
}

function fu(it, item, ite) {
  item = JSON.stringify(it);
  window.localStorage.setItem(ite, item);
}

function fn(aa,bb,cc,dd,ee,ff,gg,hh,ii,jj,kk,ll,mm,nn,oo,pp,qq,rr,ss,tt,uu,vv,na) {
    axios
      .post("http://192.168.0.13:3000/createBusiness", {
        "account": na,
        "applicant_type": aa,
        "applicant_name": cc,
        "valid_license": bb,
        "certificate_ID": dd,
        "certificate_type": gg,
        "address": ee,
        "phone": ff,
        "identity": hh,
        "city": ii,
        "EN_name": jj,
        "legal_person": kk,
        "EN_address": ll,
        "applicant_nationality": mm,
        "postal_code": nn,
        "contacts": oo,
        "agency_name": pp,
        "domestic_recipients": qq,
        "application_country": rr,
        "application_date": ss,
        "application_instructions": tt,
        "trademark_info": tt,
        "trademark_type_id": uu,
        "nets": vv,
        "business_type": '1'
      })
      .then(function (response) {
        window.location.href="../html/personal.html"
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  $('.showUser-img').onclick = function(){
    $('.personal-infomation-mation').style.cssText = 'display:block;';
  }
  $('#clear').onclick = function(){
    $('.personal-infomation-mation').style.cssText = 'display:none;';
    // console.log(111);
  }
