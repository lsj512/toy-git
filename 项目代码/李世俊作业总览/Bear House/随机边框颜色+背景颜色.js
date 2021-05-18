/*
 * @author: DSCode
 * @create: 2021-03-22 08:47 AM
 * @license: MIT
 * @lastAuthor: DSCode
 * @lastEditTime: 2021-03-22 09:06 AM
 * @desc: 页面元素背景边框颜色随机
 */
const ele = document.getElementsByTagName("*");

for (let index = 0; index < ele.length; index++) {
  let color = "#" + Math.floor(Math.random() * 16777215).toString(16);
  ele[index].style = `border: 1px solid ${color};`;
  color = "#" + Math.floor(Math.random() * 16777215).toString(16);
  ele[index].style.background = color;
}
