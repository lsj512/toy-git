/*
 * @author: wxw
 * @create: 2021-05-07 17:55 PM
 * @license: MIT
 * @lastAuthor: wxw
 * @lastEditTime: 2021-05-11 16:56 PM
 * @desc: 个人信息1
 */
import { $,$1,$C} from "./wquery.js";

$(".selIdx").onclick=function(el){
  console.log(el.target.innerHTML);
}


let idxArr=["身份证","营业执照","其他"];
$("#paging").innerHTML=idxArr[0];    //默认第一条
// 下拉框
console.log($(".select"),$("#paging"));
$("#paging").onclick=function(){
   $(".select").style.display="block";    
   $(".select p").forEach(function(ele,idx){        
      ele.onclick=function(){        //点那个就是哪个
        $("#paging").innerHTML=idxArr[idx];  
         localStorage.setItem("idxArr1",idxArr[idx]);
        $(".select").style.display = "none"; 
      }
   })
}


export let idxImg="暂时没有";


//跳转
$(".clientName").onclick=function(){
  console.log(999);
  window.location.href="../personal.html";
}