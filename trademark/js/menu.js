/*
 * @Author: your name
 * @Date: 2021-05-04 16:51:57
 * @LastEditTime: 2021-05-04 17:12:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \商标注册系统项目\js\menu.js
 */
  var select = $getNode(".select")
  var ul = document.querySelector(".selections");
  var menu = ul.querySelectorAll("li")
  var square = document.querySelector(".square")
  // 点击select ，square让下拉框显示
  menus(select, menu)
 // 选择下拉框里的某一个条目，让这个条目显示到页面上，同时让下拉框隐藏
  function menus(_node1,_menus){
    _node1.onclick = function(){
      ul.style.display = "block"
    }
    for (let i = 0; i < _menus.length; i++){
      _menus[i].onclick = function (){
        select.innerHTML = _menus[i].innerHTML;
        select.style.color = "#333333"
        ul.style.display = "display:none;"
      }
    }
  }
//   // 获取节点的工具函数
  function $getNode(_node) {
    return document.querySelector(_node)
  }
