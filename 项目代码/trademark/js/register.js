/*
 * @author: TANG
 * @create: 2021-05-10 11:02 AM
 * @license: MIT
 * @lastAuthor: TANG
 * @lastEditTime: 2021-05-11 18:19 PM
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
console.log(11111);
// 定义特殊字符串并分割成数组用以后面判断
let reg = /\\|\/|\！|\~|\'|\=|\^|\#|\@|\!|\￥|\…|\&|\—|\(|\)|\（|\）|\，|\,|\。|\.|\+|\-|\·|\%|\~|\?|\？|\*|\"|\“|\”|\'|\‘|\’|\<|\>|\{|\}|\[|\]|\【|\】|\：|\；|\;|\:|\、|\^|\$|\!|\~|\`|\|/g;

let type = $("#selectA")[0].text;
let license = $("#selectB")[0].text;
$("#selectA").onclick = function () {
  let obj = document.getElementById("selectA");
  for (i = 0; i < obj.length; i++) {
    //下拉框的长度就是它的选项数.
    if (obj[i].selected == true) {
      type = obj[i].text; //获取当前选择项的文本.
    }
  }
};


$("#selectB").onclick = function () {
    let obj = document.getElementById("selectB");
    for (i = 0; i < obj.length; i++) {
      //下拉框的长度就是它的选项数.
      if (obj[i].selected == true) {
        license = obj[i].text; //获取当前选择项的文本.
      }
    }
  };


$('.nextButton').onclick = function(){
  if(type == '企业/单位申请'){
    type = "1";
  }else if(type == '自然人'){
    type = "2";
  }else{
    type = "3";
  }
  if(license == '身份证'){
    license = "1";
  }else if(license == '营业执照'){
    license = "2";
  }else{
    license = "3";
  }
    let Type = JSON.stringify(type);
    window.localStorage.setItem("Type", Type);
    let License = JSON.stringify(license);
    window.localStorage.setItem("License", License);
}
$('.showUser-img').onclick = function(){
  $('.personal-infomation-mation').style.cssText = 'display:block;';
}
$('#clear').onclick = function(){
  $('.personal-infomation-mation').style.cssText = 'display:none;';
  // console.log(111);
}
