/*
 * @author: LUOCAN
 * @create: 2021-05-06 09:34 AM
 * @license: MIT
 * @lastAuthor: LUOCAN
 * @lastEditTime: 2021-05-14 11:46 AM
 * @desc:预约成功页面
 */
// 导入方法
import { get, getall } from "./public.js";

// TODO 加载数据
let alldata = []; //存放数据
window.onload = function () {
  axios
    .get("http://3961a5m073.qicp.vip/getAllBusinessInfo")
    .then(function (response) {
      // console.log(response.data);
      alldata = response.data; //存放数据中间变量
      Alldata(alldata); //声明方法使用数据
    })
    .catch(function (error) {
      console.log(error);
    });
};

// TODO 获取数据
let sucdata = []; //用于存放 审核成功的数据
let busdata = []; // 业务数据
// let userdata = []; // 用户数据
let active = []; //预约成功数据
/**
 *
 * @param {*} data 后台的数据
 */
function Alldata(data) {
  //把业务数据放入 数组中
  busdata = data[1];
  // 把用户数据放入 数组中
  // userdata = data[0];
  // 遍历出数据 找到status为2的数据为审核成功的
  busdata.forEach((ele) => {
    if (ele.status == 2) {
      ele.checked = false;
      sucdata.push(ele); // 存放到新的数组中进行遍历渲染
    }
  });
  busdata.forEach((ele) => {
    // 找出预约成功的数据
    if (ele.status == 4) {
      active.push(ele); // 存放到新的数组中
    }
  });
  // console.log(sucdata);
  rander();
  Active(active);
  breakPage();
}

// TODO 分页函数
// 默认的步长
let step = 10;
// 默认页码
let pageIndex = 0;
// 所有页数
let allPage = 0;
/**
 *  @param {*} breakPage 分页函数
 *  @param {*} page  审核成功的数据
 */
function breakPage() {
  if (sucdata.lenght % step == 0) {
    allPage = sucdata.length / step;
  } else {
    allPage = Math.ceil(sucdata.length / step); //向下取整数
  }
  get(".allpage").innerHTML = allPage; // 渲染总页数
  // console.log(allPage);
  rander();
}

// TODO 选择渲染的条数
let par = get(".page-items").parentNode;
par.onclick = function () {
  get(".number1").style.cssText = "display:block"; //显示出条数
};
par.onmouseleave = function () {
  get(".number1").style.cssText = "display:none"; //显示出条数
};

// 调用方法传参
select(".ber1", 10);
select(".ber2", 20);
select(".ber3", 50);

// 绑定点击渲染条数事件
/**
 *  @param {*} select 渲染条数事件
 *  @param {*} item  需要传值的元素
 *  @param {*} ste  需要渲染的条数
 */
function select(item, ste) {
  get(item).onclick = function () {
    get(".items").innerHTML = get(item).innerHTML; //页面赋值
    step = ste;
    pageIndex = 0;
    get(".num").innerHTML = pageIndex + 1;
    breakPage();
    get(".number1").style.cssText = "display:none";
  };
}

/**
 * @param {*} changepage 点击换页 页面渲染事件
 * @param {*} clas 传入类名
 */
function changepage(clas) {
  let index = 0;
  switch (clas) {
    case ".hpage":
      pageIndex = 0;
      breakPage();
      get(".num").innerHTML = pageIndex + 1;
      break;
    case ".pageup":
      index = pageIndex - 1;
      if (index >= 0) {
        pageIndex = index;
        breakPage();
      } else {
        get("#del-fenye").style.cssText = "display:block";
        get("#del-fy").innerHTML = "不能再减了";
        // console.log(111);
        // alert("不能再减了");
      }
      get(".num").innerHTML = pageIndex + 1;
      break;
    case ".pagenext":
      index = pageIndex + 1;
      if (index < allPage) {
        pageIndex = index;
        breakPage();
      } else {
        get("#del-fenye").style.cssText = "display:block";
        get("#del-fy").innerHTML = "不能再加了";
        // alert("不能再加了");
      }
      get(".num").innerHTML = pageIndex + 1;
      break;
    case ".pageend":
      index = allPage - 1;
      if (index >= 0) {
        pageIndex = index;
        breakPage();
      } else {
        get("#del-fenye").style.cssText = "display:block";
        get("#del-fy").innerHTML = "不能再减了";
        // alert("不能再减了");
      }
      get(".num").innerHTML = pageIndex + 1;
      break;
  }
}

// TODO 点击跳转到指定的页面
get(".page-num").onkeypress = function () {
  if (event.keyCode == 13) {
    let f = 0;
    f = get(".page-num").value;
    pageIndex = 0;
    // console.log(f, pageIndex, allPage);
    if (f >= pageIndex + 1 && f <= allPage) {
      pageIndex = f - 1;
      get(".num").innerHTML = pageIndex + 1;
      breakPage();
    } else {
      get("#del-fenye").style.cssText = "display:block";
      get("#del-fy").innerHTML = "输入页数不符合规范,必须大于一小于等于总页数";
      // alert("输入页数不符合规范");
    }
  }
};

// 分页确认消失
get("#fycoform").onclick = function () {
  get("#del-fenye").style.cssText = "display:none";
};

/**
 * @param {*} choose 绑定点击换页事件
 * @param {*} clas 类名
 */
function choose(clas) {
  get(clas).onclick = function () {
    changepage(clas);
    // console.log(111);
  };
}

// 绑定换页事件
choose(".hpage"); // 首页
choose(".pageup"); // 上一页
choose(".pagenext"); // 下一页
choose(".pageend"); // 最后一页

/**
 * @param {*} rander 分页渲染数据方法
 *
 */
function rander() {
  // 获取审核成功的圆点
  let suc = get(".suc");
  if (sucdata.length == 0) {
    suc.innerHTML = 0;
  } else {
    // 写入当前成功的条数
    suc.innerHTML = sucdata.length;
  }
  // 一页的数据
  const ranerdata = sucdata.slice(pageIndex * step, (pageIndex + 1) * step);
  // 初始化页面
  getall(".serial2").forEach((ele) => {
    ele.remove();
  });
  let i = pageIndex * step + 1;
  // 渲染一页的数据
  ranerdata.forEach((ele) => {
    let tb = get(".tabbox"); //获取到页面存放数据的元素
    let div = document.createElement("div");
    div.classList.add("serial2"); // 添加类名
    tb.appendChild(div);
    div.innerHTML = `
    <div class="check">
      <input type="checkbox" class="gouxuan" id="che${ele.order_id}"/ >
    </div>
    <div class="sernumber">
      <p id="oder${ele.order_id}">${i++}</p>
    </div>
    <div class="oddnum">
      <p >${ele.order_id}</p>
    </div>
    <div class="applicantType">
      <p>${ele.certificate_type}</p>
    </div>
    <div class="appliName">
      <p>${ele.applicant_name}</p>
    </div>
    <div class="businesstype">
      <p>
      ${ele.business_type}
      </p>
    </div>
    <div class="status">
      <a href="javascript:;" class="success">审核成功</a>
    </div>
    <div class="operate">
      <a href="javascript:;" class="order" id ="${ele.order_id}">预约</a>
    </div>`;

    ch(ele.order_id);
  });

  // TODO 预约按钮
  let oder = getall(".order");
  let str = []; //存放缓存
  // TODO 点击出现提示框函数
  oder.forEach((ele) => {
    // console.log(ele);
    ele.onclick = function () {
      get(".choosetime").style.cssText = "display:block";
      //缓存
      localStorage.setItem("activ", ele.id); //缓存数据
    };
  });
}

// TODO 预约选择时间
//日期设置，不可选择今日之后的日期
/**
 * @param {*} datatime 预约选择时间事件
 */
function datatime() {
  var now = new Date();
  var year = now.getFullYear();
  var month =
    now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1;
  var day = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
  document
    .querySelector("#startCreatetime")
    .setAttribute("max", year + "-" + month + "-" + day);
  document
    .querySelector("#endCreatetime")
    .setAttribute("max", year + "-" + month + "-" + day);
}
datatime();
// 时间选择框第一个
document.querySelector("#startCreatetime").onchange = function () {
  let startime = document.querySelector("#startCreatetime").value; //用户选择的时间
  let startime1 = document
    .querySelector("#startCreatetime")
    .getAttribute("max"); // 今天的日期
  // 截取日期进行对比
  let tips1 = get(".tips1"); // 提示信息

  console.log(startime.slice(0, 4));
  if (startime > startime1 && startime.slice(0, 4) < 2050) {
    document.querySelector("#startCreatetime").setAttribute("name", "true");
    tips1.innerHTML = "";
  } else {
    // alert("不能选择今天之前的日期,且年份要小于2050年");
    document.querySelector("#startCreatetime").removeAttribute("name", "true");
    tips1.innerHTML = "不能选择今天之前的日期,且年份要小于2050年";
  }
};
document.querySelector("#endCreatetime").onchange = function () {
  let startime = document.querySelector("#startCreatetime").value; //用户选择的时间
  let endtime = document.querySelector("#endCreatetime").value; //用户选择的时间
  let endtime1 = document.querySelector("#endCreatetime").getAttribute("max"); // 今天的日期
  let tips2 = get(".tips2"); // 提示信息
  // 截取日期进行对比
  if (endtime > endtime1 && startime < endtime && startime.slice(0, 4) < 2050) {
    document.querySelector("#endCreatetime").setAttribute("name", "true");
    tips2.innerHTML = "";
  } else {
    // alert("日期,时间不能小于之前的时间,且年份要小于2050年");
    document.querySelector("#startCreatetime").removeAttribute("name", "true");
    tips2.innerHTML = "日期,时间不能小于之前的时间,且年份要小于2050年";
  }
};

// TODO 获取页面button 按钮元素
let sub = get(".mb-btn-sub"); // 预约确认按钮
let res = get(".mb-btn-res"); // 取消按钮
let success = get(".yy-success-sub"); // 预约成功确认按钮
let ptime = get(".ptime"); // 时间赋值
let ptime1 = get(".ptime1"); // 时间赋值

// TODO 预约确认按钮事件
/**
 * @param {*} Active 预约成功的函数
 * @param {*} num 成功的数据
 */
function Active(num) {
  sub.onclick = function () {
    let sucnumber = get(".sucnumber"); // 预约个数
    let suctime = get(".success-time"); // 渲染年份
    let startime = document.querySelector("#startCreatetime").value; //用户选择的时间
    let endtime = document.querySelector("#endCreatetime").value; //用户选择的时间
    let startime1 = document.querySelector("#startCreatetime"); //用户选择的时间元素框
    let endtime1 = document.querySelector("#endCreatetime"); //用户选择的时间元素框
    if (
      startime1.getAttribute("name") == "true" &&
      endtime1.getAttribute("name") == "true"
    ) {
      get(".yy-success").style.cssText = "display:block";
      get(".choosetime").style.cssText = "display:none";
      ptime.innerHTML = startime.slice(11, 16); //预约成功时间赋值
      ptime1.innerHTML = endtime.slice(11, 16);
      suctime.innerHTML =
        +startime.slice(0, 4) +
        " 年" +
        startime.slice(5, 7) +
        "月" +
        startime.slice(8, 10) +
        "日--至" +
        endtime.slice(0, 4) +
        " 年" +
        endtime.slice(5, 7) +
        "月" +
        endtime.slice(8, 10);
    } else {
      get("#del-fenye").style.cssText = "display:block";
      get("#del-fy").innerHTML = "输入的日期或时间有问题";
      // alert("输入的日期或时间有问题");
    }
    // console.log(startime);
    // console.log(endtime);

    num.forEach((n, index) => {
      // 渲染预约成功的个数
      sucnumber.innerHTML = index + 2;
    });
  };
}
// TODO 取消按钮事件
res.onclick = function () {
  get(".choosetime").style.cssText = "display:none";
};

// TODO 预约成功确认按钮
success.onclick = function () {
  get(".choosetime").style.cssText = "display:none";
  get(".yy-success").style.cssText = "display:none";
  let olds = "2";
  let news = "4";
  let i = localStorage.getItem("activ"); //获取缓存的数据 id
  localStorage.clear;
  let id = i;
  // console.log(id);
  upt(id, olds, news);
};
/**
 * @param {*} upt 改变业务状态的方法
 * @param {*} id  改变数据的id
 * @param {*} olds  原始的数据状态
 * @param {*} news 新的数据状态
 */
function upt(id, olds, news) {
  axios
    .post("http://3961a5m073.qicp.vip/updateBusinessStatus", {
      orderID: id,
      oldstatus: olds,
      newstatus: news,
    })
    .then(function (response) {
      console.log(response);
      location.href = "../html/audit_success.html";
    })
    .catch(function (error) {
      console.log(error);
    });
}

//TODO 点击数据列表复选框
function ch(id) {
  let newdata = sucdata.slice(pageIndex * step, (pageIndex + 1) * step);
  get("#che" + id).onclick = function () {
    newdata.forEach((ele) => {
      // 如果点击传入的id等于当前数据的order_id，并且当前复选框为false
      if (ele.order_id == id && get("#che" + id).checked == false) {
        //把数据的checked属性改为false
        ele.checked = false;
        console.log(ele.checked);
      } else if (ele.order_id == id && get("#che" + id).checked == true) {
        ele.checked = true;
        console.log(ele.checked);
      }
      //如果每一个数据列表的checked属性都为true就把全选按钮变为选中状态
      if (
        newdata.every(function (item) {
          return item.checked == true;
        })
      ) {
        get("#allche").checked = true;
        // console.log(get("#allche"));
      } else {
        get("#allche").checked = false;
      }
    });
  };
}

//TODO 点击全选框
get("#allche").onclick = function () {
  let newdata = sucdata.slice(pageIndex * step, (pageIndex + 1) * step);
  newdata.forEach((ele) => {
    if (get("#allche").checked == true) {
      ele.checked = true;
      get("#che" + ele.order_id).checked = true;
    } else if (get("#allche").checked == false) {
      ele.checked = false;
      get("#che" + ele.order_id).checked = false;
    }
  });
};

//TODO 点击删除按钮
get("#chedel").onclick = function () {
  let newdata = sucdata.slice(pageIndex * step, (pageIndex + 1) * step);
  if (
    newdata.some((ele) => {
      return ele.checked == true;
    })
  ) {
    get("#del-cover").style.cssText = "display:block";
  } else {
    get("#del-coform").style.cssText = "display:block";
  }
};

// TODO 判断是否选择
get("#batcoform").onclick = function () {
  get("#del-coform").style.cssText = "display:none";
};

// TODO 点击删除确认按钮
get("#batchon").onclick = function () {
  let newdata = sucdata.slice(pageIndex * step, (pageIndex + 1) * step);
  const deldata = [...newdata];
  deldata.forEach((ele) => {
    if (ele.checked == true) {
      let index = sucdata.indexOf(ele);
      sucdata.splice(index, 1);
      //删除页面节点
      let chebo = get("#che" + ele.order_id);
      chebo.parentNode.parentNode.parentNode.removeChild(
        chebo.parentNode.parentNode
      );
      get("#allche").checked = false;
      rander();

      // ! 删除数据
      axios
        .post("http://3961a5m073.qicp.vip/deleteBusiness", {
          orderID: ele.order_id,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    if (sucdata.length == 0) {
      get("#allche").checked = false;
      get(".suc").innerHTML = 0;
    }
  });
  get("#del-cover").style.cssText = "display:none";
};

// TODO 点击删除取消按钮
get("#batchoff").onclick = function () {
  get("#del-cover").style.cssText = "display:none";
};

//TODO 点击彻底删除按钮
get("#alldel").onclick = function () {
  get("#del-covere").style.cssText = "display:block";
};

// TODO 点击彻底删除确认按钮
get("#batchone").onclick = function () {
  //删除页面节点
  let allserial2 = document.querySelectorAll(".serial2");
  allserial2.forEach((ele) => {
    ele.remove();
  });
  sucdata = [];
  get(".suc").innerHTML = 0;
  allPage = 0;
  get(".allpage").innerHTML = allPage;
  get("#allche").checked = false;
  //!删除数据库所有数据
  axios
    .post("http://3961a5m073.qicp.vip/deleteAllBussinessStatus", {
      status: "2",
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  get("#del-covere").style.cssText = "display:none";
};

// TODO 点击彻底删除取消按钮
get("#batchoffe").onclick = function () {
  get("#del-covere").style.cssText = "display:none";
};
