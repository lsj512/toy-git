/*
 * @author: LUOCAN
 * @create: 2021-05-07 09:29 AM
 * @license: MIT
 * @lastAuthor: LUOCAN
 * @lastEditTime: 2021-05-14 11:26 AM
 * @desc: 预约成功界面
 */
// 导入方法
import { get, getall } from "./public.js";
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
//用于存放 预约的数据
let acdata = [];
let busdata = []; // 业务数据
let userdata = []; // 用户数据
/**
 * @param {*} busdata 业务数据
 * @param {*} data 后台的数据
 * @param {*} userdata 用户数据
 */
function Alldata(data) {
  //把业务数据放入 数组中
  busdata = data[1];
  // 把用户数据放入 数组中
  userdata = data[0];
  // 遍历出数据 找到status为4的数据为预约成功的
  busdata.forEach((ele) => {
    if (ele.status == 4) {
      ele.checked = false;
      acdata.push(ele); // 存放到新的数组中进行遍历渲染
    }
  });
  console.log(acdata);
  rander(acdata);
  breakPage();
}

// TODO 分页函数
// 默认的步长
let step = 12;
// 默认页码
let pageIndex = 0;
// 所有页数
let allPage = 0;
/**
 *  @param {*} breakPage 分页函数
 *  @param {*} page  审核成功的数据
 */
function breakPage() {
  allPage = Math.ceil(acdata.length / step); //向下取整数
  get(".allpage").innerHTML = allPage; // 渲染总页数
  console.log(step);
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
select(".ber1", 6);
select(".ber2", 8);
select(".ber3", 12);

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
        console.log(111);
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
        get("#del-fy").innerHTML =
          "输入页数不符合规范,必须大于一小于等于总页数";
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
      get("#del-fy").innerHTML = "输入页数不符合规范";
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
    console.log(get(clas));
    changepage(clas);
  };
}

// 绑定换页事件
choose(".hpage"); // 首页
choose(".pageup"); // 上一页
choose(".pagenext"); // 下一页
choose(".pageend"); // 最后一页

/**
 * @param {*} rander 渲染数据方法
 *
 */
function rander() {
  // 获取审核成功的圆点
  let fal = get(".fal");
  if (acdata.length == 0) {
    fal.innerHTML = 0; // 写入当前成功的条数
  } else {
    fal.innerHTML = acdata.length; // 写入当前成功的条数
  }
  // 一页的数据
  const ranerdata = acdata.slice(pageIndex * step, (pageIndex + 1) * step);
  console.log(ranerdata);
  // 初始化页面
  getall(".serial2").forEach((ele) => {
    ele.remove();
  });
  let idx = pageIndex * step + 1;
  // 渲染一页的数据
  ranerdata.forEach((ele) => {
    // console.log(index);
    let tb = get(".tabbox"); //获取到页面存放数据的元素
    let div = document.createElement("div");
    div.classList.add("serial2"); // 添加类名
    tb.appendChild(div);
    div.innerHTML = `
      <div class="check">
        <input type="checkbox" class="gouxuan"  id="che${ele.order_id}" />
      </div>
      <div class="sernumber">
        <p id="oder${ele.order_id}">${idx++}</p>
      </div>
      <div class="oddnum">
        <p>${ele.order_id}</p>
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
    <p class="success">审核成功</p>
</div>
<div class="operate">
    <p><a href="#" class="order">查看详情</a></p>
</div>`;

    ch(ele.order_id);
  });
}

//TODO 点击数据列表复选框
function ch(id) {
  let newdata = acdata.slice(pageIndex * step, (pageIndex + 1) * step);
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
        console.log(get("#allche"));
      } else {
        get("#allche").checked = false;
      }
    });
  };
}

//TODO 点击全选框
get("#allche").onclick = function () {
  let newdata = acdata.slice(pageIndex * step, (pageIndex + 1) * step);
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
  let newdata = acdata.slice(pageIndex * step, (pageIndex + 1) * step);
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
  let newdata = acdata.slice(pageIndex * step, (pageIndex + 1) * step);
  const deldata = [...newdata];
  deldata.forEach((ele) => {
    if (ele.checked == true) {
      let index = acdata.indexOf(ele);
      acdata.splice(index, 1);
      //删除页面节点
      let chebo = get("#che" + ele.order_id);
      chebo.parentNode.parentNode.parentNode.removeChild(
        chebo.parentNode.parentNode
      );
      get("#allche").checked = false;
      rander();

      //!删除后台数据
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
    if (acdata.length == 0) {
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
  acdata = [];
  get(".fal").innerHTML = 0;
  allPage = 0;
  get(".allpage").innerHTML = allPage;
  get("#allche").checked = false;
  //!删除数据库所有数据
  axios
    .post("http://3961a5m073.qicp.vip/deleteAllBussinessStatus", {
      status: "4",
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
