/*
 * @author: LUOCAN
 * @create: 2021-05-07 16:32 PM
 * @license: MIT
 * @lastAuthor: LUOCAN
 * @lastEditTime: 2021-05-14 14:34 PM
 * @desc: 修改审核失败的数据
 */
// 导入方法
// import { get, getall } from "./public.js";

// TODO 获取元素方法
function get(name) {
  return document.querySelector(name);
}
function getall(e) {
  return document.querySelectorAll(e);
}

// TODO 加载数据
let alldata = []; //存放业务数据
window.onload = function () {
  axios
    .get("http://3961a5m073.qicp.vip/getAllBusinessInfo") // 业务数据
    .then(function (response) {
      console.log(response.data);
      //存放数据中间变量
      alldata = response.data;
      //声明方法使用数据
      Alldata(alldata);
    })
    .catch(function (error) {
      console.log(error);
    });
};

// TODO 获取数据
let busdata = []; // 业务数据
let userdata = []; // 用户数据
let faldata = [];
/**
 * @param {*} busdata 业务数据
 * @param {*} data 后台的数据
 * @param {*} userdata 用户数据
 */
function Alldata(data) {
  //把业务数据放入 数组中
  busdata = data[1];
  busdata.forEach((ele) => {
    if (ele.status == "3") {
      faldata.push(ele);
    }
  });
  // 把用户数据放入 数组中
  userdata = data[0];
  rander();
}
/**
 * @param {*} rander 渲染数据
 */
function rander() {
  if (faldata.length == 0) {
    get("#fail").innerHTML = 0;
  } else {
    // 写入当前成功的条数
    get("#fail").innerHTML = faldata.length;
  }
  let str = JSON.parse(localStorage.getItem("item")); // 获取缓存数据
  localStorage.clear; // 清楚缓存
  userdata.forEach((ele, index) => {
    if (str.account == ele.account) {
      //!把值为null的替换为无
      for (const obj in str) {
        if (str[obj] == null) {
          str[obj] = "无";
        }
      }
      // 判断点击的数据的用户账号和用户数据的用户账号进行对比
      let rt = get(".right");
      let div = document.createElement("div");
      div.classList.add("content"); // 添加类名
      rt.appendChild(div);
      div.innerHTML = `
      <form action="" method="post">
      <!-- 版权信息 -->
      <div class="message">
          <!-- 标题质权人信息 -->
          <div class="title">
              <div class="pledgee"> 质权人信息</div>
              <div class="otted"> </div>
              <div class="recompose" id="amendbtn">点击修改</div>
          </div>
          <!-- 15条信息 -->
          <ul>
              <li>
                  <span class="left-text">申请人名称（中文）</span>
                  <input type="text" class="modify-text amendinp ame" value="${str.applicant_name}" disabled="disabled"></input>
                  <span class="left-text new-style1">申请人名称（英文）</span>
                  <input type="text" class="modify-text amendinp ame" value="${str.EN_name}" disabled="disabled"></input>
              </li>
              <li>
                  <span class="left-text">申请人地址（中文）</span>
                  <input type="text" class="modify-text amendinp ame" value="${str.address}" disabled="disabled"></input>
                  <span class="left-text new-style1">申请人地址（英文）</span>
                  <input type="text" class="modify-text amendinp ame" value="${str.EN_address}" disabled="disabled"></input>
              </li>
              <li>
                  <span class="left-text">联系人</span>
                  <input type="text" class="modify-text amendinp ame" value="${str.contacts}" disabled="disabled"></input>
                  <span class="left-text new-style1">电话</span>
                  <input type="text" class="modify-text amendinp amen" value="${ele.phone}" disabled="disabled"></input>
              </li>
              <li>
                  <span class="left-text"> 邮政编码</span>
                  <input type="text" class="modify-text amendinp amen" value="${ele.postcode}" disabled="disabled"></input>
              </li>
              <li>
                  <span class="left-text">代理机构名称</span>
                  <input type="text" class="modify-text amendinp ame" value="${str.agency_name}" disabled="disabled"></input>
              </li>
              <li>
                  <span class="left-text">外国人申请人的国内接收人</span>
                  <input type="text" class="modify-text amendinp ame" value="${str.domestic_recipients}" disabled="disabled"></input>
              </li>
              <li>
                  <span class="left-text">国内接收人地址</span>
                  <input type="text" class="modify-text amendinp ame" value="${str.recipient_address}" disabled="disabled"></input>
              </li>
              <li>
                  <span class="left-text"> 邮政编码</span>
                  <input type="text" class="modify-text amendinp ame" value="${str.postal_code}" disabled="disabled"> </input>
              </li>
              <li>
                  <span class="left-text">商标申请声明</span>
                  <input type="text" class="modify-text amendinp ame" value="${str.application_instructions}" disabled="disabled"></input>
              </li>
              <li>
                  <span class="left-text">申请/展出国家/地区</span>
                  <input type="text" class="modify-text amendinp ame" value="${str.application_country}" disabled="disabled"></input>
              </li>
              <li>
                  <span class="left-text">申请号</span>
                  <input type="text" class="modify-text amendinp ame" value="${str.application_number}" disabled="disabled"></input>
              </li>
              <li>
                  <span class="left-text">类别</span>
                  <input type="text" class="modify-text amendinp ame" value="${str.trademark_type_id}" disabled="disabled"></input>
              </li>
              <li>
                  <span class="left-text">商品/服务项目</span>
                  <input type="text" class="modify-text amendinp  ame" value="${str.trademark_project}" disabled="disabled"></input>
              </li>
              <li>
                  <div class="left-text">有效执照</div>
                  <div class="identity">
                          <label type="button" class="btn">
                              <img src="../img/permit_01.png" id="show" class="image-mar"> 
                              <input type="file"  id="file" class="filepath amendinp" disabled="disabled">
                          </label>
                          <label type="button" class="btn ">
                              <img src="../img/permit_02.png" id="show" class="image-mar"> 
                              <input type="file"  id="file" class="filepath amendinp" disabled="disabled"> 
                          </label>
                  </div>
                  
                  <div class="businesst">
                      <label type="button" class="btn ">
                          <img src="../img/permit_03.png" alt="">
                          <input type="file"  id="file" class="filepath amendinp" disabled="disabled">
                      </label>
                  </div>
              </li>
          </ul>
      </div>
      <!-- 其他共同申请人名列表 -->
      <div class="elseemessage">
          <div class="b-title">
              <div class="b-pledgee"> 其他共同申请人名称列表</div>
              <div class="b-otted"> </div>
              <div class="b-recompose" id="b-recbtn">点击修改</div>
          </div>
          <!-- 下部分申请列表 -->
          <ul class="apply">
              <li>
                  <span class="request">申请企业名称</span>
                  <input type="text" class=" address" value="成都****有限公司" disabled="disabled"></input>
              </li>
              <li>
                  <span class="request">申请人地址</span>
                  <input type="text" class=" address" value="四川省成都市**区**街**号" disabled="disabled"></input>
              </li>
              <li>
                  <span class=" request">申请企业名称</span>
                  <input type="text" class=" address" value="成都****有限公司" disabled="disabled"></input>
              </li>
              <li>
                  <span class="request">申请人地址</span>
                  <input type="text" class=" address" value="四川省成都市**区**街**号" disabled="disabled"></input>
              </li>
          </ul>
      </div>
      <!-- 提交并审核<a href="audit_fail.html"> </a>-->
      <div class="check " id="subbtn"  type="submit"> 提交并审核 </div>
      </form>
        `;
    }
  });

  click();
  subClick();
}

//TODO 点击修改按钮
/**
 * 点击修改按钮
 */
function click() {
  //点击上面的修改按钮
  get("#amendbtn").onclick = function () {
    let allinp = getall(".amendinp");
    allinp.forEach((ele) => {
      ele.disabled = false;
      ele.style.border = "1px solid #999";
      ele.style.padding = "2px";
    });
  };
  //点击下面的修改按钮
  get("#b-recbtn").onclick = function () {
    let allinpb = getall(".address");
    allinpb.forEach((ele) => {
      ele.disabled = false;
      ele.style.border = "1px solid #999";
      ele.style.padding = "2px";
    });
  };
}

//TODO 点击提交并审核按钮
/**
 * 点击提交并审核按钮
 */
function subClick() {
  get("#subbtn").onmouseover = function () {
    get("#subbtn").style.background = "#7DC3FF";
  };
  get("#subbtn").onmouseleave = function () {
    get("#subbtn").style.background = "#C3C3C3";
  };
  get("#subbtn").onclick = function () {
    let allintvalue = [];
    let allint = getall(".ame");
    allint.forEach((ele) => {
      allintvalue.push(ele.value);
    });
    console.log(allintvalue);
    let str = JSON.parse(localStorage.getItem("item"));
    console.log(str);
    axios
      .post("http://3961a5m073.qicp.vip/updateBusiness", {
        applicant_name: allintvalue[0],
        EN_name: allintvalue[1],
        address: allintvalue[2],
        EN_address: allintvalue[3],
        contacts: allintvalue[4],
        agency_name: allintvalue[5],
        domestic_recipients: allintvalue[6],
        recipient_address: allintvalue[7],
        postal_code: allintvalue[8],
        application_instructions: allintvalue[9],
        application_country: allintvalue[10],
        application_number: allintvalue[11],
        trademark_type_id: allintvalue[12],
        trademark_project: allintvalue[13],
        status: "1",
        order_id: str.order_id,
      })
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });
    // 用户数据
    let uadata = [];
    let allints = getall(".amen");
    allints.forEach((elem) => {
      uadata.push(elem.value);
    });
    console.log(uadata);
    axios
      .post("http://3961a5m073.qicp.vip/updateUser", {
        phone: uadata[0],
        postcode: uadata[1],
        account: str.account,
      })
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });
    location.href = "../html/audit_active.html";
  };
}
