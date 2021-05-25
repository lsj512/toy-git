/*
 * @author: kate
 * @create: 2021-05-06 09:23 AM
 * @license: MIT
 * @lastAuthor: Kate-sy
 * @lastEditTime: 2021-05-14 09:08 AM
 * @desc:
 */
//TODO 启用严格模式
"use strict";
//TODO 获取页面元素函数
/**
 * 获取页面一个元素
 * @param {*} doc 元素id或类名
 * @returns 返回的是获取的那个按钮本身
 */
function get(doc) {
  return document.querySelector(doc);
}

//TODO 加载页面完成，请求数据
window.onload = function () {
  axios
    .get("http://3961a5m073.qicp.vip/getAllBusinessInfo")
    .then(function (response) {
      alldata = response.data[1];
      each(alldata);
    })
    .catch(function (error) {
      console.log(error);
    });
  //获取用户的所有数据，用allinfo存储，在详情页调用这个数组
  axios
    .get("http://3961a5m073.qicp.vip/getAllAccountInfo")
    .then(function (response) {
      allinfo = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

//TODO 存放所有数据
let alldata = [];
//存储审核中数据
let auditdata = [];
//存储用户的所有数据
let allinfo = [];


//TODO 筛选出审核中状态的数据追加到新数组,并渲染页面
/**
 * 在axios请求数据时调用这个函数
 * @param {*} alldata 返回的response.data[1]
 */
function each(alldata) {
  alldata.forEach((ele) => {
    //筛选为审核中的数据
    if (ele.status == 1) {
      ele.checked = false;
      //审核状态为审核中的添加到行数组
      auditdata.push(ele);
    }
  });
  auditdata.forEach((ele, index) => {
    get("#mb-num").innerHTML = index + 1;
  });
  //TODO第一次渲染数据列表
  reneronepage();
}

//TODO 点击查看详情按钮
function vie(id) {
  auditdata.forEach((ele) => {
    allinfo.forEach((elem) => {
      if (id == ele.order_id && ele.account == elem.account) {
        //详情页出现的覆盖层
        get("#mb-allcover").style.display = "block";
        //数据列表消失
        get("#tbody").style.display = "none";
        get("#pabox").style.display = "none";
        get("#r-info").style.display = "none";
        //渲染详情页
        render(ele, elem);
        //详情页出现
        get("#con-mb").style.display = "block";
      }
    });
  });
}

//TODO 点击详情页的确定按钮
get("#mb-oder").onclick = function () {
  get("#mb-allcover").style.display = "none";
};

//TODO 审核中渲染查看详情页面
/**
 * 渲染查看详情页
 * @param {*} auda 审核中数据的每一条
 * @param {*} used 用户数据的每一条
 */
function render(auda, used) {
  for (const obj in auda) {
    if (auda[obj] == null) {
      auda[obj] = "无";
    }
  }
  let rimes = document.createElement("div");
  rimes.innerHTML = `
  <div class="content" id="con-mb">
    <!-- 版权信息 -->
    <div class="message">
        <!-- 标题质权人信息 -->
        <div class="title">
            <div class="pledgee"> 质权人信息</div>
            <div class="otted"> </div>
            <!-- <div class="recompose">点击修改</div>   -->
        </div>
        <!-- 15条信息 -->
        <ul>
            <li>
                <span class="left-text">申请人名称（中文）</span>
                <input type="text" class="modify-text" value="${auda.applicant_name}" disabled="disabled"></input>
                <span class="left-text new-style1">申请人名称（英文）</span>
                <input type="text" class="modify-text" value="${auda.EN_name}"  disabled="disabled"></input>
            </li>
            <li>
                <span class="left-text">申请人地址（中文）</span>
                <input type="text" class="modify-text" value="${auda.address}"  disabled="disabled"></input>
                <span class="left-text new-style1">申请人地址（英文）</span>
                <input type="text" class="modify-text" value="${auda.EN_address}"  disabled="disabled"></input>
            </li>
            <li>
                <span class="left-text">联系人</span>
                <input type="text" class="modify-text" value="${auda.contacts}"  disabled="disabled"></input>
                <span class="left-text new-style1">电话</span>
                <input type="text" class="modify-text" value="${used.phone}"  disabled="disabled"></input>
            </li>
            <li>
                <span class="left-text"> 邮政编码</span>
                <input type="text" class="modify-text" value="${auda.postal_code}"  disabled="disabled"></input>
            </li>
            <li>
                <span class="left-text">代理机构名称</span>
                <input type="text" class="modify-text" value="${auda.agency_name}"  disabled="disabled"></input>
            </li>
            <li>
                <span class="left-text">外国人申请人的国内接收人</span>
                <input type="text" class="modify-text" value="${auda.domestic_recipients}"  disabled="disabled"></input>
            </li>
            <li>
                <span class="left-text">国内接收人地址</span>
                <input type="text" class="modify-text" value="${auda.recipient_address}"  disabled="disabled"></input>
            </li>
            <li>
                <span class="left-text"> 邮政编码</span>
                <input type="text" class="modify-text" value="${used.postcode}"  disabled="disabled"> </input>
            </li>
            <li>
                <span class="left-text">商标申请声明</span>
                <input type="text" class="modify-text" value="${auda.application_instructions}"  disabled="disabled"></input>
            </li>
            <li>
                <span class="left-text">申请/展出国家/地区</span>
                <input type="text" class="modify-text" value="${auda.application_country}"  disabled="disabled"></input>
            </li>
            <li>
                <span class="left-text">申请号</span>
                <input type="text" class="modify-text" value="${auda.application_number}"  disabled="disabled"></input>
            </li>
            <li>
                <span class="left-text">类别</span>
                <input type="text" class="modify-text" value="${auda.trademark_type_id}"  disabled="disabled"></input>
            </li>
            <li>
                <span class="left-text">商品/服务项目</span>
                <input type="text" class="modify-text" value="${auda.trademark_project}" disabled="disabled"></input>
            </li>
            <li>
                <div class="left-text">有效执照</div>
                <div class="identity">
                    <label type="button" class="btn">
                        <img src="../img/permit_01.png" id="show" class="image-mar"> 
                        <!-- <input type="file"  id="file" class="filepath" > -->
                    </label>
                    <label type="button" class="btn ">
                        <img src="../img/permit_02.png" id="show" class="image-mar"> 
                        <!-- <input type="file"  id="file" class="filepath"> -->
                    </label>
                </div>
                <div class="businesst">
                    <label type="button" class="btn ">
                        <img src="../img/permit_03.png" alt="">
                        <!-- <input type="file"  id="file" class="filepath" > -->
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
            <!-- <div class="b-recompose">点击修改</div>   -->
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
    <div class="check Blue-style btnhover"> <a href="audit_active.html" name="retuppage">返回上一页</a> </div>
</div>
`;
  get("#right").appendChild(rimes);
  botthover();
}

//底部标签hover样式
function botthover() {
  get(".btnhover").onmouseenter = function () {
    get(".btnhover").style.cssText = "background:#2C9DFC";
  };
  get(".btnhover").onmouseleave = function () {
    get(".btnhover").style.cssText = "background:#013D87";
  };
}

//TODO 点击复选框
/**
 * 点击数据列表复选框函数
 * @param {*} id 点击复选框传入点击的复选框的order_id
 */
function ch(id) {
  let newdata = auditdata.slice(indpage * step, (indpage + 1) * step);
  newdata.forEach((ele) => {
    //如果点击传入的id等于当前数据的order_id，并且当前复选框为false
    if (ele.order_id == id && get("#che" + id).checked == false) {
      //把数据的checked属性改为false
      ele.checked = false;
    } else if (ele.order_id == id && get("#che" + id).checked == true) {
      ele.checked = true;
    }
  });
  //如果每一个数据列表的checked属性都为true就把全选按钮变为选中状态
  if (
    newdata.every(function (item) {
      return item.checked == true;
    })
  ) {
    get("#allche").checked = true;
  } else {
    get("#allche").checked = false;
  }
}

//TODO 点击删除按钮
get("#chedel").onclick = function () {
  //截取当前页的全部数据
  let newdata = auditdata.slice(indpage * step, (indpage + 1) * step);
  const dela = [];
  //判断当前页数据的checked属性
  newdata.forEach((ele) => {
    if (newdata.some(function(item){
     return item.checked == true;
    })) {
      get("#del-cover").style.display = "block";
    }else{
      get("#fenye-cover").style.display = "block";
      get("#del-plse").innerHTML = "至少选中一条才能删除！";
    }
    get("#fenye-on").onclick =function (){
      get("#fenye-cover").style.display = "none";
    }
    if (ele.checked == true) {
      //把为true的数据添加到一个新数组
      dela.push(ele);
      //如果为true的数据为一条就弹出删除一条的提示
      if (dela.length == 1) {
        get("#del-pls").innerHTML = "确定删除这条数据吗？";
      } else {
        get("#del-pls").innerHTML = "确定批量删除数据吗？";
      }
    }
  });
};

//TODO 点击覆盖层删除按钮的确定删除按钮
get("#batchon").onclick = function () {
  let newdata = auditdata.slice(indpage * step, (indpage + 1) * step);
  const deldata = [...newdata];
  deldata.forEach((ele) => {
    get("#del-cover").style.display = "block";
    if (ele.checked == true) {
      let index = auditdata.indexOf(ele);
      auditdata.splice(index, 1);
      let chebo = get("#che" + ele.order_id);
      chebo.parentNode.parentNode.parentNode.removeChild(
        chebo.parentNode.parentNode
      );
      get("#allche").checked = false;
      reneronepage();
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
  });
  //删除数据后改变红色圆点中的条数
  auditdata.forEach((elem, index) => {
    get("#mb-num").innerHTML = index + 1;
  });
  if (auditdata.length == 0) {
    get("#allche").checked = false;
    get("#mb-num").innerHTML = 0;
  }
  get("#del-cover").style.display = "none";
};

//TODO 点击覆盖层删除按钮的取消按钮
get("#batchoff").onclick = function () {
  get("#del-cover").style.display = "none";
};

//TODO 点击彻底删除
get("#alldel").onclick = function () {
  get("#del-covere").style.display = "block";
};

//!点击覆盖层彻底删除的确定按钮
get("#batchone").onclick = function () {
  get("#del-covere").style.display = "none";
  //删除页面节点
  let allserial2 = document.querySelectorAll(".serial2");
  allserial2.forEach((ele) => {
    ele.remove();
  });
  auditdata = [];
  get("#mb-num").innerHTML = 0;
  allpage = 0;
  get("#allpage").innerHTML = allpage;
  get("#allche").checked = false;
  //!删除数据库所有数据
  axios
    .post("http://3961a5m073.qicp.vip/deleteAllBussinessStatus", {
      status: "1",
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};

//!点击覆盖层彻底删除按钮的取消按钮
get("#batchoffe").onclick = function () {
  get("#del-covere").style.display = "none";
};

//TODO 点击全选复选框
get("#allche").onclick = function () {
  let newdata = auditdata.slice(indpage * step, (indpage + 1) * step);
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

//TODO 分页渲染
//步长
let step = 50;
//初始页码
let indpage = 0;
//所有页数
let allpage = 0;
/**
 * 用于取所有页数的函数和
 * 渲染页面函数
 */
function reneronepage() {
  //所有页数向上取
  allpage = Math.ceil(auditdata.length / step);
  get("#allpage").innerHTML = allpage;
  renderl();
}

//TODO 渲染数据列表
/**
 * 渲染数据列表函数
 */
function renderl() {
  //初始步长为12，截取下标为0到下标为12的数据
  let newdata = auditdata.slice(indpage * step, (indpage + 1) * step);
  //!显示页面序号
  let idx = indpage * step + 1;
  //先移除之前渲染的数据列表
  let allserial2 = document.querySelectorAll(".serial2");
  allserial2.forEach((ele) => {
    ele.remove();
  });
  //渲染新的数据列表
  newdata.forEach((ele) => {
    let rightli = document.createElement("div");
    rightli.classList.add("serial2");
    rightli.innerHTML = ` 
      <div class="check">
        <input type="checkbox" class="gouxuan"  onclick="ch('${
          ele.order_id
        }')" id="che${ele.order_id}" >
      </div>
      <div class="sernumber">
        <p id="oder${ele.order_id}">${idx++}</p>
      </div>
      <div class="oddnum">
        <P>${ele.order_id}</P>
      </div>
      <div class="applicantType">
        <P>${ele.certificate_type}</P>
      </div>
      <div class="appliName">
        <P>${ele.applicant_name}</P>
      </div>
      <div class="businesstype">
        <P>${ele.business_type}</P>
      </div>
      <div class="status">
        <a href="javascript:;" class="success" name="under-revia">审核中</a>
      </div>
      <div class="operate" onclick="vie('${ele.order_id}')">
        <a  class="order" name="view-deta">查看详情</a>
      </div>
      `;
    get("#tbody").appendChild(rightli);
  });
  //显示当前页的div
  get(".num").innerHTML = indpage + 1;
}

//TODO 输入框输入页数跳转函数
/**
 * 输入跳转页数函数
 */
function skip() {
  let numpage = get(".page-num").value - 1;
  if (numpage < allpage && 0 <= numpage) {
    indpage = numpage;
    renderl();
  } else {
    get("#fenye-cover").style.display = "block";
    get("#del-plse").innerHTML = "输入的数据不能大于总页数或者小于1！";
    get("#fenye-on").onclick = function () {
      get("#fenye-cover").style.display = "none";
    };
  }
}

//TODO 输入框输入页数回车事件
/**
 * 键盘按键事件函数
 */
function getenterkey() {
  if (event.keyCode == 13) {
    skip();
  }
}
//跳转页面失焦事件
get(".page-num").onblur = function () {
  skip();
};
//绑定点击事件
function click(doce) {
  get(doce).onclick = function () {
    chanpage(doce);
  };
}
//绑定页面改变页码元素
click(".pages");
click(".pageu");
click(".pagen");
click(".pagel");

/**
 * 切换页面点击事件函数
 * @param {*} doce 点击按钮传入的class名
 */
function chanpage(doce) {
  let i = 0;
  switch (doce) {
    //点击回到首页
    case ".pages":
      if (indpage != 0) {
        indpage = 0;
        renderl();
        get("#allche").checked = false;
      }
      break;
    //点击上一页
    case ".pageu":
      i = indpage - 1;
      if (i >= 0) {
        indpage = i;
        renderl();
        get("#allche").checked = false;
      } else {
        get("#fenye-cover").style.display = "block";
        get("#del-plse").innerHTML = "已经是第一页！";
        get("#fenye-on").onclick = function () {
          get("#fenye-cover").style.display = "none";
        };
      }
      break;
    //点击下一页
    case ".pagen":
      i = indpage + 1;
      console.log(i);
      if (indpage < allpage - 1) {
        indpage = i;
        get("#allche").checked = false;
        renderl();
      } else {
        get("#fenye-cover").style.display = "block";
        get("#del-plse").innerHTML = "已经是最后一页了！";
        get("#fenye-on").onclick = function () {
          get("#fenye-cover").style.display = "none";
        };
      }
      break;
    //点击跳到最后一页
    case ".pagel":
      if (indpage != allpage - 1) {
        indpage = allpage - 1;
        get(".num").innerHTML = allpage;
        renderl();
        get("#allche").checked = false;
      }
      break;
  }
}

//点击选择step的框出现选择显示条数列表
get("#pa-ite").onclick = function () {
  get("#select").style.display = "block";
};

//选择10条
Selcet(10, "selone");
//选择20条
Selcet(20, "seltwo");
//选择50条
Selcet(50, "selthree");
/**
 * onmouseout   onmouseover   进入之后，进入的元素存在更深层级，在层级间也会触发(冒泡)
 * onmouseleave  onmouseenter   只要进出就不会变,只有在进出时才会触发
 */
get("#select").onmouseleave = function () {
  get("#select").style.display = "none";
};
//TODO 点击每页显示条数执行函数
function Selcet(ste, clas) {
  get(`#${clas}`).onclick = function () {
    get("#xs").innerHTML = get(`#${clas}`).innerHTML;
    //阻止冒泡事件发生
    event.stopPropagation();
    get("#select").style.display = "none";
    step = ste;
    indpage = 0;
    reneronepage();
  };
}
