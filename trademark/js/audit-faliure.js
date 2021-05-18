/*
 * @author: wxw
 * @create: 2021-05-08 15:29 PM
 * @license: MIT
 * @lastAuthor: Spring
 * @lastEditTime: 2021-05-12 14:08 PM
 * @desc: 审核失败
 */
import {$,$1} from "./wquery.js";

// TODO 获取页面元素
let workList = $(".table-info"); // 列表
let fdPage = $(".leftBtn");      //页数向前
let backPage = $(".rightBtn");   //页数
let pNum = $(".pageNum");     //显示页数
let jumpPage = $(".jumpPage");   //跳转页数
let page = 1;   //默认第一页

//  TODO获取每页指定最大条数;
let optArr = ["每页20条", "每页30条", "每页40条", "每页50条"];
$("#paging").innerHTML = optArr[0]; //默认第一条
let maxNum = $("#paging").innerHTML.split("页")[1].split("条")[0]; //每页加载数据最大条数
localStorage.setItem("maxNum",maxNum);    //存入缓存
// console.log($("#paging"));
// 下拉框
function sel(data){
  $("#paging").onclick = function () {
    $(".select").style.display = "block";
    $(".select p").forEach(function (ele, idx) {
      ele.onclick = function () {
        //点那个就是哪个
        $("#paging").innerHTML = optArr[idx];
        $(".select").style.display = "none";
        //点那个将值赋给对于数组的哪个
        maxNum=optArr[idx].split("页")[1].split("条")[0];  
        localStorage.setItem("maxNum",maxNum);
        startPlay(data);
      };
    });
  };
}

  

//获取用户
let accountFail=JSON.parse(window.localStorage.getItem("accountInfo"))[0].account; 
// console.log(accountFail);

//请求审核失败数据
try {
    window.onload=function(){
      axios.post('http://192.168.0.13:3000/getBusinessInfoByStatus',{
        "account": `${accountFail}`,
        "status": "3"  
      
      })
      .then(function (res) {
          //获取数据，开始操作
          console.log(res.data);
          sel(res.data)
          startPlay(res.data);
      })
      .catch(function (error) {
        console.log(error);
        alert("服务器丢失")
      });
    }
  } catch (error) {
    console.log(error);
  }





// TODO 执行操作
function startPlay(failData) {
  // console.log(failData);
  maxNum=localStorage.getItem('maxNum');
  let maxPage = Math.ceil(failData.length / maxNum);   //加载最多页数
  console.log(maxPage);
  init(maxPage,failData);    //TODO初始化
  page1(maxPage,failData);   //TODO分页
  }
 
// 分页
function page1(maxPage,failData){
  //TODO 点击增加页数
  backPage.onclick =function() {
    console.log(failData.length);
    page++;
    if (page * maxNum <= failData.length) {
      render(page, page * maxNum, failData, maxPage);
    } else {
      if (page > maxPage) {
        //大于最大页数
        page = maxPage;
        return;
      }
      render(page, failData.length, failData, maxPage); //最后一页数据少于最大的显示条数
    }
  }

  //TODO 点击减少页数
  fdPage.onclick = function() {
    page--;
    if (page < 1) {
      page = 1;
      return;
    }
    render(page, page * maxNum, failData, maxPage);
  }
  
  //TODO 跳转页数  
  jumpPage.onblur =function() {
    //范围内输入
    if (Math.floor(this.value) >= 1 && Math.floor(this.value) < maxPage) {
      page=this.value;
      // console.log(this.value);
      if (Math.floor(this.value) == maxPage) {
        render(page, failData.length, failData, maxPage);
      } else {
        // console.log(page);
        render(page, page * maxNum, failData, maxPage);
      }
     }else if(this.value==""){
      this.value="";
    }else{   //不在范围内输入
      page=1;
      jumpPage.value=1;
     init(maxPage, failData);     //初始化
    }
  };  

  //TODO 双箭头左按钮
  $(".leftDBtn").onclick = function () {
    page = 1;
    init(maxPage, failData); //初始化
  };   

  //TODO 双箭头右按钮
  $(".rightDBtn").onclick=function() {
    page=maxPage;     
    render(page, failData.length, failData, maxPage);
  }
}

let delIts=$(".delete");
// console.log("🚀 ~ file: audit-faliure.js ~ line 135 ~ delIts", delIts);
let delAll=$(".all-delete");
// console.log("🚀 ~ file: audit-faliure.js ~ line 137 ~ delAll", delAll);


//!删除数据
function del(maxPage,failData){
  //选中删除
  let flag=0;
  let inpBox=$1(".ckBox");
  delIts.onclick=function(){
    inpBox.forEach(ele=> {
      if(ele.checked==true){
        flag++;
          try {
              axios.post('http://192.168.0.13:3000/deleteBusiness',{
                "orderID": `${ele.id}`
              })
              .then(function (res) {
              })
              .catch(function (error) {
                console.log(error);
                alert("服务器丢失")
              });
            
          } catch (error) {
            console.log(error);
          }
     
      }
    });
    location.reload();
  }
  
  
  //彻底删除
  delAll.onclick=function(){
    

    init(maxPage,failData);    //执行初始化
  }
}

//全选
$(".ckAll").onclick=function(){
  $1(".ckBox").forEach(function(el){
    if($(".ckAll").checked==true){
      el.checked=true;
    }else{
      el.checked=false;
    }
  })
}

//TODO修改数据
function upd(maxPage,failData){
$1(".change").forEach((ele,idx) => {
  ele.onclick=function(){
    console.log($1(".ckBox")[idx]);
    let orderId1=$1(".ckBox")[idx].id;
    //获取指定单号对应的全部信息的api接口
    localStorage.setItem("order_id",`${orderId1}`);
    location.href="../html/Auditfailure.html";
  }
});
}   

//失败原因
function whyFail(maxPage,failData){
  $1(".whyFail").forEach(function(el,idx){
    el.onclick=function(){
      $(".shade").style.display="block";
      //点击确认关闭弹框
      $(".sure").onclick=function(){
        console.log(888);
        $(".shade").style.display="none";
      }
    }
  })
}

/**
 * 页面初始化
 */
function init(maxPage,failData) {
  // 如果第一页数据小于指定条数
  if (failData.length < maxNum) {
    render(1, failData.length, failData,maxPage);
  } else {          //足够填满第一页
    render(page, page * maxNum, failData, maxPage); //page*maxNum为每页的最大条数
  }
}


// TODO 数据渲染
/**
 *
 * @param {*} page  页码数
 * @param {*} lastNum   最大条数
 * 
 */

function render(page, lastNum, failData, maxPage) {
  let str1="";   //拿来辅助渲染页面
  for (let i = (page - 1) * maxNum; i < lastNum; i++) {
  //   typeIt.forEach(function(el,idx){
  //     if(el.id==failData[i].applicant_type){
  //        let type=el.type;
  //        let typeId=el.type_id;
  //     }
  //   });
    str1+=`  <li>
    <div class="check"><input type="checkbox" class="ckBox" id=${failData[i].order_id}></div>
    <div class="num">${i+1}</div>
    <div class="order-no">${failData[i].order_id}</div>
    <div class="applicant">${failData[i].applicant_type==1?
      "企业/单位申请":failData[i].applicant_type==2?
      "自然人":
      "其他"}</div>
    <div class="applicant-name">${failData[i].applicant_name}</div>
    <div class="business-type">变更商标申请人/注册人名义/地址/变更集体商标/证明商标管理规则/集体成员名单</div>
    <div class="audit-status">审核失败</div>
    <div class="operation"><span><a href="javascript:;" class="whyFail">失败原因</a></span>
    <span><a class="change">修改</a></span></div>
   </li>`;
  }
  workList.innerHTML =str1;

  
  pNum.innerHTML = page; //页数
$(".sumPage").innerHTML=maxPage;   //总页数

  if (page == 1) {
    $(".leftDBtn").style.backgroundColor = "#f1f5f7";
    $(".leftBtn").style.backgroundColor = "#f1f5f7";
  } else {
    $(".leftDBtn").style.backgroundColor = "#fff";
    $(".leftBtn").style.backgroundColor = "#fff";
  }
  console.log(maxPage, page);
  if (page == maxPage) {
    $(".rightDBtn").style.backgroundColor = "#f1f5f7";
    $(".rightBtn").style.backgroundColor = "#f1f5f7";
  } else {
    $(".rightDBtn").style.backgroundColor = "#fff";
    $(".rightBtn").style.backgroundColor = "#fff";
  }

  del(maxPage, failData); //TODO删除数据
  upd(maxPage, failData); //TODO修改数据
  whyFail(maxPage, failData); //TODO 失败原因
}















