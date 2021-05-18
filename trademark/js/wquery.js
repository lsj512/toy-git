/*
 * @author: wxw
 * @create: 2021-04-30 11:33 AM
 * @license: MIT
 * @lastAuthor: wxw
 * @lastEditTime: 2021-05-08 16:44 PM
 * @desc: 创建和获取元素
 */



 // 数据
 export let dataArr = [
    { id: 1, name: "商标专用权质权登记", dev: "申请须知", req: "申请" },
    { id: 2, name: "商标专用权质权登记", dev: "申请须知", req: "申请" },
    { id: 3, name: "商标专用权质权登记", dev: "申请须知", req: "申请" },
    { id: 4, name: "商标专用权质权登记", dev: "申请须知", req: "申请" },
    { id: 5, name: "商标专用权质权登记", dev: "申请须知", req: "申请" },
    { id: 6, name: "商标专用权质权登记", dev: "申请须知", req: "申请" },
    { id:7, name: "商标专用权质权登记", dev: "申请须知", req: "申请" },
    { id: 8, name: "商标专用权质权登记", dev: "申请须知", req: "申请" },
    { id: 9, name: "商标专用权质权登记", dev: "申请须知", req: "申请" },
    { id: 10, name: "商标专用权质权登记", dev: "申请须知", req: "申请" },
    { id: 11, name: "商标专用权质权登记", dev: "申请须知", req: "申请" },
    { id: 12, name: "商标专用权质权登记", dev: "申请须知", req: "申请" },
    { id: 14, name: "商标专用权质权登记", dev: "申请须知", req: "申请" },
    { id: 13, name: "商标专用权质权登记", dev: "申请须知", req: "申请" },
    { id: 15, name: "商标专用权质权登记", dev: "申请须知", req: "申请" },
    { id: 16, name: "商标专用权质权登记", dev: "申请须知", req: "申请" },
    { id: 17, name: "商标专用权质权登记", dev: "申请须知", req: "申请" },
    { id: 18, name: "商标专用权质权登记", dev: "申请须知", req: "申请" },
    { id: 19, name: "商标专用权质权登记", dev: "申请须知", req: "申请" },
    { id: 20, name: "商标专用权质权登记", dev: "申请须知", req: "申请" },
    { id: 21, name: "商标专用权质权登记", dev: "申请须知", req: "申请" },
    { id: 22, name: "商标专用权质权登记", dev: "申请须知", req: "申请" },
    { id: 23, name: "商标专用权质权登记", dev: "申请须知", req: "申请" },
    { id: 24, name: "商标专用权质权登记", dev: "申请须知", req: "申请" },
    { id: 25, name: "商标专用权质权登记", dev: "申请须知", req: "申请" }
  ];



/**
 * 
 * @param {*} _select 
 * @returns  获取页面元素
 */
export function $(_select) {
    let ele = document.querySelectorAll(_select);
    if (ele.length == 1) {
      return ele[0];
    } else {
      return ele;
    }
  }
export function $1(_select) {
  return document.querySelectorAll(_select);
  }

export function $C(_ele){
  return document.createElement(_ele);
}

