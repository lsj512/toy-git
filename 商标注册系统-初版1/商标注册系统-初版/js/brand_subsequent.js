/*
 * @author: Alagon
 * @Date: 2021-05-07 15:29 PM
 * @license: MIT
 * @lastAuthor: LUOCAN
 * @lastEditTime: 2021-05-12 16:04 PM
 * @Description:
 */
let data = [];
// ?获取所以业务信息
window.onload = function () {
  axios
    .get("http://3961a5m073.qicp.vip/getAllBusinessTypes")
    .then(function (response) {
      data = response.data;
      console.log(data);
      add(data);
    })
    .catch(function (error) {
      console.log(error);
    });
};

// ?步长
let somepage = 10;
// ?页数
let temp = 1;
// ?获取业务名
// TODO 渲染
function add(data) {
  let newdata = data;
  // console.log(newdata);
  // ! slice 数组方法 以下标为参数（起始到末尾但不包括末尾）截取相应数组
  let newArr = newdata.slice(somepage * (temp - 1), temp * somepage);
  let tabbox = get(".tabbox");
  // ? 清除上一页的渲染
  let serial2 = gets(".serial2");
  serial2.forEach((element) => {
    element.parentNode.removeChild(element);
  });
  newArr.forEach((ele) => {
    tabbox.innerHTML += `<div class="serial2">
    <div class="sernumber">
      <p>${ele.id}</p>
    </div>
    <div class="businesstype">
      <P>${ele.business_name}</P>
    </div>
    <div class="status">
      <a href="brand_subsequent_application.html" class="xuzhi">申请须知</a>
    </div>
    <div class="operate">
      <a href="javascript:;" class="shenq" only='"${ele.business_id}"'>申请</a>
    </div>
  </div>  `;
  });
  // ?共多少页
  let b = Math.ceil(data.length / somepage);
  let paget = get(".page-t");
  paget.innerHTML = b;

  addx(data, newdata);
  addl(data, newdata);
  addpagenum(data);
  addclick(newArr);
  addfirst(data);
  addfin(data);
}

// ?选择步长
get(".page-items").onclick = () => {
  pageel.style.display = "block";
};

let pagew = get(".page-w");
let pagee = get(".page-e");
let pager = get(".page-r");
let pageel = get(".page-el");
let pageq = get(".page-q");

pagew.onclick = (a) => {
  // 阻止冒泡事件
  a.stopPropagation();
  somepage = 10;
  temp = 1;
  add(data);
  addn(temp)
  pageel.style.display = "none";
  // pageel.setAttribute("style", "display:none;");
  console.log(get(".page-el"));
  get(".page-eve").innerHTML = `每页${somepage}条`;
};
pagee.onclick = (a) => {
  // 阻止冒泡事件
  a.stopPropagation();
  somepage = 20;
  temp = 1;
  add(data);
  addn(temp)
  pageel.style.display = "none";
  get(".page-eve").innerHTML = `每页${somepage}条`;
};
pager.onclick = (a) => {
  // 阻止冒泡事件
  a.stopPropagation();
  somepage = 50;
  temp = 1;
  add(data);
  addn(temp)
  pageel.style.display = "none";
  get(".page-eve").innerHTML = `每页${somepage}条`;
};
pageq.onclick = (a) => {
  // 阻止冒泡事件
  a.stopPropagation();
  somepage = 100;
  temp = 1;
  add(data);
  addn(temp)
  pageel.style.display = "none";
  // pageel.setAttribute("style", "display:none;");
  console.log(get(".page-el"));
  get(".page-eve").innerHTML = `每页${somepage}条`;
};

// ? 当前页码
function addn(temp) {
  get(".num").innerHTML = temp;
}

// ?跳转 （失焦）
function addpagenum(data) {
  let pagenum = get(".page-num");
  let c = Math.ceil(data.length / somepage);
  pagenum.onblur = () => {
    if (pagenum.value > 0 && pagenum.value <= c) {
      temp = pagenum.value;
      add(data);
      addn(temp);
      pagenum.value = "";
    } else {
      pagenum.value = "";
    }
  };
}
// ?跳转 （键盘）
function addpagenumdown() {
  if (event.keyCode == 13) {
    let pagenum = get(".page-num");
    let c = Math.ceil(data.length / somepage);
    if (pagenum.value > 0 && pagenum.value <= c) {
      temp = pagenum.value;
      add(data);
      addn(temp);
      pagenum.value = "";
    } else {
      pagenum.value = "";
    }
  }
}

// ? 跳转第一页
function addfirst(data) {
  get(".btn-a").addEventListener("click", first);
  function first() {
    temp = 1;
    add(data);
    addn(temp);
  }
}

// ?跳转尾页
function addfin(data) {
  let d = Math.ceil(data.length / somepage);
  get(".btn-b").addEventListener("click", fin);
  function fin() {
    temp = d;
    add(data);
    addn(temp);
  }
}

// ?下一页
function addx(data, newdata) {
  let pagebtn = get(".pager");
  pagebtn.onclick = () => {
    let a = Math.ceil(newdata.length / somepage);
    console.log(a);
    if (temp >= 1 && temp < a) {
      temp++;
      console.log(temp);
      addn(temp);
      add(data);
    } else if (temp == a) {
      get(".batch-del").style.display = "block";
      get("#del-pls").innerHTML = "已经是最后一页";
      get(".batch-del-on").onclick = () => {
        get(".batch-del").style.display = "none";
      };
      get(".batch-del-off").onclick = () => {
        get(".batch-del").style.display = "none";
      };
    } else {
      temp = Math.ceil(newdata.length / somepage);
      console.log(a);
    }
  };
}
// ?上一页
function addl(data, newdata) {
  let pagel = get(".pagel");
  pagel.onclick = () => {
    let a = Math.ceil(newdata.length / somepage);
    if (temp > 1 && temp <= a) {
      temp--;
      console.log(a);
      console.log(temp);
      add(data);
      addn(temp);
    } else if ((temp = 1 && temp <= a)) {
      get(".batch-del").style.display = "block";
      get("#del-pls").innerHTML = "已经是第一页";
      get(".batch-del-on").onclick = () => {
        get(".batch-del").style.display = "none";
      };
      get(".batch-del-off").onclick = () => {
        get(".batch-del").style.display = "none";
      };
    } else {
      temp = 1;
    }
  };
}

// ? 点击事件封装
function addclick(newArr) {
  // TODO 点击事件
  let application = gets(".shenq");
  // console.log(application);
  application.forEach((element, index) => {
    element.onclick = function () {
      let businessName = newArr[index].business_name;
      window.localStorage.setItem("businessName", businessName);
      // ?传参
      // ?点击事件函数
      let alldata = [];

      // 获取所有用户数据 对比当前用户的数据用于使用
      axios
        .get("http://3961a5m073.qicp.vip/getAllAccountInfo")
        .then(function (response) {
          console.log(response.data);
          alldata = response.data;
          addcl(alldata);
        })
        .catch(function (error) {
          console.log(error);
        });

      // TODO 用户信息完整性判断
      function addcl(alldata) {
        alldata.forEach((ele) => {
          if (ele["account"] == localStorage.getItem("account")) {
            //  当内存用户与当前用户匹配时判断关键内容是否为空 空则跳转信息补充，否则直接进入审核
            if (ele["ID_card_num"] != null && ele["address"] != null) {
              console.log(1);
              let numberr = Math.ceil(Math.random() * 1000);
              // ? 点击传参
              let account = window.localStorage.getItem("account");
              axios
                .post("http://3961a5m073.qicp.vip/intoAuditStatus", {
                  application_number: String(numberr),
                  business_type: businessName,
                  status: "1",
                  account: account,
                })
                .then(function (response) {
                  nalldata = response.data;
                  console.log(nalldata);
                  addcl(alldata);
                })
                .catch(function (error) {
                  console.log(error);
                });

              location.href = "audit_active.html";
            } else {
              get(".sweet-plac").style.display = "block";
            }
          }
        });
      }
    };
  });
}

// TODO 工具函数
function get(node) {
  return document.querySelector(node);
}
function gets(nodes) {
  return document.querySelectorAll(nodes);
}
