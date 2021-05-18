/*
 * @author: LUOCAN
 * @create: 2021-04-22 15:14 PM
 * @license: MIT
 * @lastAuthor: lsj
 * @lastEditTime: 2021-04-28 14:03 PM
 * @desc:购物车
 */
"use strict";
// TODO 获取商品列表框
let shop = get("ul");
// TODO 获取购物车列表框
let bodylist = get(".car-body");
// TODO 创建空数组保存所有数据
let alldata = [];
// TODO 创建数组保存购物车里的数据
let shopdata = [];
//  TODO 获取页面元素
function get(name) {
  return document.querySelector(name);
}

function getall(name) {
  return document.querySelectorAll(name);
}

// 加载数据
window.onload = function () {
  axios
    .post("http://24123z8o79.zicp.vip/getAllGoods", {})
    .then(function (response) {
      console.log(response.data);
      alldata = response.data;
      Alldata(alldata);
    })
    .catch(function (error) {
      console.log(error);
    });
};

// TODO 页面加载

function Alldata(alldata) {
  alldata.forEach((ele) => {
    ele.num = 1;
    ele.checked = true;
    let li = document.createElement("li");
    shop.appendChild(li);
    li.innerHTML = `<div class="img">
        <img src="./img/3.jpg" alt="" />
      </div>
      <div class="title">
        <span>&yen;${ele.price}</span> <br />
        <article class="hover">
          ${ele.desc}
        </article>
        <div class="tag">
          黑色
        </div>
        <div class="eve">
          <b>${ele.evaNum}+</b>
          <p>条评价</p>
        </div>
        <div class="shopname">${ele.merchant}</div>
        <div class="botton display">
          <div class="a">
            <input type="checkbox" />
            对比
          </div>
          <div class="b">
            关注
          </div>
          <div class="c" onclick = "addShopCar('${ele.goodsID}')">
            <span class="iconfont">&#xe635;</span>
            加入购物车
          </div>
        </div>
      </div>`;
  });
}


function rander(Data) {
  let div = document.createElement("div");
  bodylist.appendChild(div);
  // ! 动态生成 ID
  div.innerHTML = `
          <div class="body-shop discenter">
          <input type="checkbox" checked class="ckb ${Data.goodsID}" onclick ="check('${Data.goodsID}',this)" />
          <span>${Data.merchant}</span>
         </div>
        <div class="list"></div>
        <div class="shop-data display">
        <input type="checkbox" checked class= "xz ckb ${Data.goodsID}" onclick = "check('${Data.goodsID}',this)" />
          <div class="data display">
            <div><img src="./img/5.jpg" alt="" /></div>
            <div class="data-title">
              ${Data.desc}
            </div>
            <div class="data-tag">
              黑色：<br/>HL
            </div>
            <div class="price">&yen;${Data.price}</div>
            <div class="num display">
              <button onclick = "jian('${Data.goodsID}')">-</button>
              <div class="NUM" id='${Data.goodsID}NumIpt'>${Data.num}</div>
              <button  onclick = "jia('${Data.goodsID}')">+</button>
            </div>
            <div class="xjprice" id='${Data.goodsID}XJ'>￥${Data.xiaoji}</div>
            <div class="bodycz">
              <span class="hover del" onclick="del('${Data.goodsID}')">删除</span>
              <section class="hover">移除关注</section>
            </div>
          </div>
        </div>
          `;
}
// TODO 创建购物车点击事件方法
const addShopCar = function (id) {
  // ! 存放 id 相同的数据
  let goodsData = "";
  alldata.forEach((item) => {
    if (id === item.goodsID) goodsData = item;
  });
  // TODO 判断购物车数组里是否有值 没有放入数据
  if (shopdata.length == 0) {
    shopdata.push(goodsData);
    shopdata[0].xiaoji = goodsData.num * goodsData.price;
    rander(goodsData);
    xiaoji()
    finallprice()
  } else {
    // 标志商品是否在购物车中
    let isIn = false;
    shopdata.forEach((ele) => {
      ele.xiaoji = ele.num * ele.price;
      if (ele.goodsID == goodsData.goodsID) {
        ele.num++;
        let id = ele.goodsID + "NumIpt";
        let NumIpt = document.getElementById(id);
        NumIpt.innerHTML = ele.num;
        isIn = true;
        let xj = ele.goodsID + "XJ";
        let price = document.getElementById(xj);
        ele.xiaoji = ele.num * ele.price;
        price.innerHTML = "&yen;" + ele.xiaoji;
        xiaoji()
        finallprice()
      }
    });
    if (!isIn) {
      shopdata.push(goodsData);
      shopdata.forEach((ele) => {
        ele.xiaoji = ele.num * ele.price;
      });
      rander(goodsData);
      xiaoji()
      finallprice()
    }
  }
  console.log(shopdata);
};

// TODO 数量加号事件
function jia(id) {
  shopdata.forEach((ele) => {
    if (ele.goodsID == id) {
      ele.num++;
      let id = ele.goodsID + "NumIpt";
      let NumIpt = document.getElementById(id);
      NumIpt.innerHTML = ele.num;
      let xj = ele.goodsID + "XJ";
      let price = document.getElementById(xj);
      ele.xiaoji = ele.num * ele.price;
      price.innerHTML = "&yen;" + ele.xiaoji;
      xiaoji()
      finallprice()
    }
  });
}

// TODO 数量减号事件
function jian(id) {
  shopdata.forEach((ele) => {
    if (ele.goodsID == id) {
      if (ele.num > 1) {
        ele.num--;
        let id = ele.goodsID + "NumIpt";
        let NumIpt = document.getElementById(id);
        NumIpt.innerHTML = ele.num;
        let xj = ele.goodsID + "XJ";
        let price = document.getElementById(xj);
        ele.xiaoji = ele.num * ele.price;
        price.innerHTML = "￥" + ele.xiaoji;
        xiaoji()
        finallprice()
      }
    }
  });
}
// TODO 删除事件
function del(id) {
  shopdata.forEach((ele, index) => {
    if (ele.goodsID == id) {
      //删除点击的那一项数据
      shopdata.splice(shopdata[index], 1);
      //删除元素所在的div
      bodylist.children[index].remove();
      ele.num = 1;
      finallprice()
      xiaoji()
    }
  });
}

//单选选中
function check(id, t) {
  // console.log(t.checked);
  shopdata.forEach((ele) => {
    if (id == ele.goodsID) {
      ele.checked = t.checked;
    }
  });
  // 获取带有id 属性的 check框
  let Check = document.getElementsByClassName(id);
  // console.log(Check);
  //循环出每个拥有id属性的 check框 再把改变的值传给他
  for (let index = 0; index < Check.length; index++) {
    console.log(Check[index].checked);
    Check[index].checked = t.checked;
  }
  finallprice();
}

//TODO 全选选中
function allcheck(check) {
  let all = get(".allcheck");
  // console.log(all);
  // console.log(11111);
  // let allr = get(".chrck");
// console.log(shopdata);
  shopdata.forEach((ele) => {
    if (all.checked) {
      // console.log(1111111);
      ele.checked = all.checked;
      console.log(ele.checked);
    } else {
      // console.log(222222);
      ele.checked = false
      console.log(ele.checked);
    }
  })
}

// TODO小计
//选中小计的元素
let xj = get(".xiaoji");
function xiaoji() {
  let sum = 0;
  //遍历出数量框的数据每次都进行叠加
  shopdata.forEach((ele) => {
    sum += ele.num
    xj.innerHTML = sum;
    // console.log(sum); 
  })
}


// TODO 总价
let zj = get(".zj");
function finallprice() {
  let fp = 0;
  shopdata.forEach((ele) => {
    if(ele.checked == true){
      console.log(ele.xiaoji);
    fp += Number(ele.xiaoji);
    zj.innerHTML = "￥"+fp;
    }
  })
}
//TODO清空购物车的商品
function ddl() {
  const ao = [...shopdata];
  ao.forEach((ele)=>{
  if(ele.checked = true){
    let index = shopdata.indexOf(ele);
    shopdata.splice(index, 1);
    bodylist.children[index].remove();
    console.log("🚀 ~ file: index1.js ~ line 288 ~ ao.forEach ~ shopdata", shopdata)
  }
  })
}
//TODO删除选中的商品
function ddt() {
  const ai = [...shopdata];
  ai.forEach((ele)=>{
    if(ele.checked == true){
      let index = shopdata.indexOf(ele);
      shopdata.splice(index, 1);
      bodylist.children[index].remove();
      // finallprice();
      // zj.innerHTML = "￥"+fp;
    }
  })
}

