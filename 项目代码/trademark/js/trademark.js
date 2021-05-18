/*
 * @author: wxw
 * @create: 2021-04-30 09:52 AM
 * @license: MIT
 * @lastAuthor: Spring
 * @lastEditTime: 2021-05-12 14:20 PM
 * @desc:
 */
//    导入模块
import { $,$1,$C,dataArr} from "./wquery.js";

// TODO 获取页面元素
let workList = $(".table-info"); // 商标后续列表
let fdPage = $(".leftBtn");      //页数向前
let backPage = $(".rightBtn");   //页数
let pNum = $(".pageNum");     //显示页数
let jumpPage = $(".jumpPage");   //跳转页数
let page = 1;   //默认第一页
let optArr = ["每页20条", "每页30条", "每页40条", "每页50条"];
$("#paging").innerHTML=optArr[0];    //默认第一条
let maxNum =$("#paging").innerHTML.split("页")[1].split("条")[0];  //每页加载数据最大条数
localStorage.setItem("maxNum",maxNum);
// 下拉框
function sel(data){
  $("#paging").onclick=function(){
    $(".select").style.display="block";    
    $(".select p").forEach(function(ele,idx){        
       ele.onclick=function(){        //点那个就是哪个
         $("#paging").innerHTML=optArr[idx];  
         maxNum=optArr[idx].split("页")[1].split("条")[0];
         localStorage.setItem("maxNum",maxNum);
         $(".select").style.display = "none"; 
         start(data);
         
       }
    })
 }
}


// TODO 请求商标后续数据

try {
  window.onload=function(){
    axios.get('http://192.168.0.13:3000/getAllBusinessTypes')
    .then(function (res) {
      console.log(res.data);
      // sel(res.data)
      start(res.data)
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
function start(traData) {
  console.log(999);
  // console.log(traData);
  sel(traData);
  maxNum=localStorage.getItem("maxNum");
  let maxPage = Math.ceil(traData.length / maxNum);   //加载最多页数
  console.log(maxPage);
  init(traData,maxPage); //TODO 初始化
  event1(maxPage,traData);   //事件函数
  }
 
//事件函数
function event1(maxPage,traData){
  //TODO 点击增加页数
  backPage.onclick =function() {
    console.log(traData.length);
    page++;
    if (page * maxNum <= traData.length) {
      render(page, page * maxNum, traData, maxPage);
    } else {
      if (page > maxPage) {
        //大于最大页数
        page = maxPage;
        return;
      }
      render(page, traData.length, traData, maxPage); //最后一页数据少于最大的显示条数
    }
  }

  //TODO 点击减少页数
  fdPage.onclick = function() {
    page--;
    if (page < 1) {
      page = 1;
      return;
    }
    render(page, page * maxNum,traData);
  }
  
  //TODO 跳转页数  
  jumpPage.onblur =function() {
    //范围内输入
    if (Math.floor(this.value) >= 1 && Math.floor(this.value) <=maxPage) {
      page=this.value;
      // console.log(this.value);
      if (Math.floor(this.value) == maxPage) {
        render(page, traData.length, traData, maxPage);
      } else {
        // console.log(page);
        render(page, page * maxNum,traData,maxPage);
      }
    }else if(this.value==""){
      this.value="";
    }else{   //不在范围内输入
      page=1;
      jumpPage.value=1;
     init(traData, maxPage);     //初始化
     
    }
  };  

  //TODO 双箭头左按钮
  $(".leftDBtn").onclick=function() {
    page=1;
    init(traData, maxPage);
  }   

  //TODO 双箭头右按钮
  console.log($(".rightDBtn"));
  $(".rightDBtn").onclick=function() {
    console.log(999);
    page=maxPage;     
    render(page, traData.length, traData, maxPage);
  }
}

/**
 * 页面初始化
 */
function init(traData,maxPage) {
  // 如果第一页数据小于指定条数
  if (traData.length < maxNum) {
    render(1, traData.length, traData);
  } else {          //足够填满第一页
    render(page, page * maxNum, traData,maxPage); //page*maxNum为每页的最大条数
  }
 
}


// TODO 数据渲染
/**
 *
 * @param {*} page  页码数
 * @param {*} lastNum   最大条数
 * 
 */
function render(page, lastNum,traData,maxPage) {
  workList.innerHTML = ""; //每次清空列表
  for (let i = (page - 1) * maxNum; i < lastNum; i++) {
    workList.innerHTML += ` <li>
    <div class="num">${traData[i].id}</div>
    <div class="num-name">${traData[i].business_info}</div>
    <div class="for-applicants canKnow"><a href="javascript:;">申请须知</a></div>
    <div class="business-application applyIt" id="${traData[i].business_id}"><a href="javascript:;">申请</a></div>
    
</li>`;
  }
  pNum.innerHTML = page; //页数
  $(".sumPage").innerHTML=maxPage;  //总页数

  if(page==1){
      $(".leftDBtn").style.backgroundColor = "#f1f5f7";
      $(".leftBtn").style.backgroundColor = "#f1f5f7";    
  }else{
      $(".leftDBtn").style.backgroundColor = "#fff";
      $(".leftBtn").style.backgroundColor = "#fff";
  }
console.log(maxPage,page);
  if(page==maxPage){
      $(".rightDBtn").style.backgroundColor = "#f1f5f7";
      $(".rightBtn").style.backgroundColor = "#f1f5f7";  
  }else{
      $(".rightDBtn").style.backgroundColor = "#fff";
      $(".rightBtn").style.backgroundColor = "#fff";
  }

  //TODO 申请须知
  // console.log($(".canKnow"));
  $1(".canKnow").forEach(function(el){
  el.onclick=function(){
    window.location.href="../html/sureKnow.html";
  }
   })


  //TODO 申请
  $1(".applyIt").forEach(function(ele){
      ele.onclick=function(){  
        //读取缓存用户信息
        let account=localStorage.getItem("accountInfo");
        account=JSON.parse(account);
        // console.log(account);
        // console.log(account[0].upload_ID_Img);
        // 判断图片是否齐全
        if(account[0].upload_ID_Img==null||account[0].ID_card_num==null){
          console.log(555);
          //提示信息不完整
          $(".shade").style.display="block";
          $(".sure").onclick=function(){
          $(".shade").style.display="none";
            window.location.href="../html/proposerInfo.html";
          }
        }else{      //成功，弹出提示框
          $(".shade1").style.display="block";
        }


      }
  })

}

//关闭提示框
$ (".sureIt").onclick=function(){
  console.log(888);
  $(".shade1").style.display="none";
}

// 跳转

$(".my").onclick=function(){   //客户
  console.log(999);
  window.location.href="./html/audit.html";
}
$(".tou").onclick=function(){   //头像
  window.location.href="./personal.html";
}
$(".logo").onclick=function(){   //logo
  window.location.href="./index.html";
}
$(".header-nav-dss").onclick=function(){   //业务中心
  window.location.href="./register.html";
}









