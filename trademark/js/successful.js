/*
 * @author: lsj
 * @create: 2021-05-08 16:27 PM
 * @license: MIT
 * @lastAuthor: lsj
 * @lastEditTime: 2021-05-14 10:35 AM
 * @desc:
 */
"use strict"; //严格模式

let apa = localStorage.getItem("accountInfo");
apa = JSON.parse(apa);
console.log(apa[0].username);
creat();
let nem = 0;
let arr = [];
//?创建空数组存放数据
let alldata = [];
//?步长
let step = 10;
//?初始页数
let iniPage = 1;
//?总页数
let allpag = 0;
function ass(all) {
  allpag = Math.ceil(all.length / step);
  console.log(alldata.length);
  console.log(allpag);
  console.log(alldata);
  Alldata(alldata);
}
//!获取页面元素
function get(name) {
  return document.querySelector(name);
}
function getall(name) {
  return document.querySelectorAll(name);
}

//!加载数据
window.onload = function () {
  //   let f = localStorage.getItem('accountInfor');//?获取缓存
  //  f = JSON.parse(f);
  axios
    .post("http://192.168.0.13:3000/getBusinessInfoByStatus", {
      account: apa[0].account,
      // account: "test1",
      status: "4",
    })
    .then(function (response) {
      // console.log(response.data);
      alldata = response.data;
      Alldata(alldata);
      ass(alldata);
      $(".sum").innerHTML = alldata.length;
      //?删除事件\

      let checke = get(".check");
      checke.onclick = () => {
        if ($("#ch").checked == true) {
          $all("#change").forEach((e) => {
            e.checked = true;
          });
        } else {
          $all("#change").forEach((e) => {
            e.checked = false;
          });
        }
      };

      $(".delete").onclick = () => {
        let num = [];
        // 多选删除
        $all("#change").forEach((e, idx) => {
          if (e.checked) {
            console.log(5132);
            num.push(idx);
          }
        });
        if (num.length > 1) {
          let arra = [];
          num.forEach((item) => arra.push(alldata[item].order_id));
          alldel(arra);
          location.reload();
        } else {
          // 单选删除
          $all("#change").forEach((e, idx) => {
            if (e.checked == true) {
              let id = alldata[idx].order_id;
              alldata.splice(idx, 1);
              console.log(id);
              Alldata(alldata);
              del(id);
            }
          });
        }
      };
      $all("#change").forEach((e) => {
        e.onclick=()=>{
          sel();
        }
       
      });
      function sel() {
        let la = 0;
        $all("#change").forEach((ele) => {
          if (ele.checked) la++;
          if ($all("#change").length == la) {
            $("#ch").checked = true;
          } else {
            $("#ch").checked = false;
          }
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};
let li = document.querySelector(".table-info");

function Alldata(alldata) {
  //!渲染页数数量的页面
  let page = get(".pagnum");
  console.log(page);
  page.innerHTML = iniPage;
  //!渲染确认回车跳转的页面
  // let temp = get(".temp");
  // temp.innerHTML = iniPage;
  //!渲染条数的页面
  li.innerHTML = "";
  console.log("iniPage:", iniPage);
  if (iniPage * step > alldata.length) {
    for (let i = (iniPage - 1) * step; i < alldata.length; i++) {
      //?渲染页面
      li.innerHTML += `
          <li>
              <div class="check"><input type="checkbox" id="change"></div>
              <div class="num">${i + 1}</div>
              <div class="order-no">${alldata[i].order_id}</div>
              <div class="applicant">${alldata[i].applicant_type}</div>
              <div class="applicant-name">${alldata[i].applicant_name}</div>
              <div class="business-type">${alldata[i].business_type}</div>
              <div class="audit-status">审核成功</div>
              <div class="operation"><a href="javascript:;">查看详情</a></div>
          </li>
       `;
    }
  } else {
    for (let i = (iniPage - 1) * step; i < iniPage * step; i++) {
      // console.log(1333);
      //?渲染页面
      li.innerHTML += `
        <li>
            <div class="check"><input type="checkbox" id="change"></div>
            <div class="num">${i + 1}</div>
            <div class="order-no">${alldata[i].order_id}</div>
            <div class="applicant">${alldata[i].applicant_type}</div>
            <div class="applicant-name">${alldata[i].applicant_name}</div>
            <div class="business-type">${alldata[i].business_type}</div>
            <div class="audit-status">审核成功</div>
            <div class="operation"><a href="javascript:;">查看详情</a></div>
        </li>
     `;
    }
  }
}
//TODO分页
let pagget = get(".pagget");
let pagleft = get(".pagleft");
let paghome = get(".paghome");
let pagtrailer = get(".pagtrailer");
let temp = get(".temp");
// let pagtz = get(".pagtz");
//?增加页面
pagget.onclick = () => {
  iniPage++;
  Alldata(alldata);
  console.log(111);
};
//?减少页面
pagleft.onclick = () => {
  iniPage--;
  Alldata(alldata);
};
//?点击首页
paghome.onclick = () => {
  iniPage = 1;
  Alldata(alldata);
};
//?点击尾页
pagtrailer.onclick = () => {
  iniPage = allpag;
  Alldata(alldata);
};
//?确认回车跳转页数失焦事件
temp.onblur = () => {
  iniPage = temp.value;
  Alldata(alldata);
  console.log(iniPage);
};
function creat(params) {
  axios
    .post("http://192.168.0.13:3000/createBusiness", {
      account: "test1",
      applicant_type: "1",
      applicant_name: "zs",
      valid_license: "1",
      certificate_ID: "51070311112222555",
      certificate_type: "1",
      address: "四川省成都市",
      phone: "13367890324",
      identity: "sc",
      city: "cd",
      EN_name: "jack",
      legal_person: "li",
      EN_address: "scccd",
      applicant_nationality: "china",
      postal_code: "621000",
      contacts: "bpl",
      agency_name: "wxkj",
      domestic_recipients: "wh",
      application_country: "中国",
      application_date: "5.7",
      application_instructions: "no",
      trademark_info: "no",
      trademark_type_id: "111",
      nets: "wxkj",
      business_type: "1",
    })
    .then(function (response) {})
    .catch(function (error) {
      console.log(error);
    });
}
//?获取页面元素
function $all(add) {
  return document.querySelectorAll(add);
}
function $(app) {
  return document.querySelector(app);
}

//?加载数据
function del(id) {
  axios
    .post("http://192.168.0.13:3000/deleteBusiness", {
      orderID: id,
    })
    .then(function (response) {})
    .catch(function (error) {
      console.log(error);
    });
}
let nemn = get("#neme");
let nemb = get("#nema");
nemn.innerHTML = apa[0].username.substr(0, 1);
nemb.innerHTML = apa[0].username.substr(0, 1);

let lao = get(".lao");
let shi = get(".shi");
let ji = get(".ji");
let lsa = get(".wrop-user");
let las = get(".lsa");
las.onclick = () => {
  self.location = "../html/personal.html";
};
lsa.onclick = () => {
  self.location = "../html/personal.html";
};
lao.onclick = () => {
  self.location = "../html/audit.html";
};
shi.onclick = () => {
  self.location = "../html/review-the-success.html";
};
ji.onclick = () => {
  self.location = "../html/audit-failure.html";
};
console.log(lao);

function alldel(id) {
  axios
    .post("http://192.168.0.13:3000/deleteMoreBusiness", {
      orderIDArr: id,
    })
    .then(function (response) {
      // console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

//?获取元素方法
function get(name) {
  return document.querySelector(name);
}
//TODO点击事件
let profile = get(".showUser-img");
//?鼠标点击显示事件
profile.onclick = function () {
  let pim = get(".personal-infomation-mation");
  pim.style.display = "block";
};
//?鼠标移开隐藏事件
let pim = get(".personal-infomation-mation");
pim.onmouseleave = function () {
  pim.style.display = "none";
};
