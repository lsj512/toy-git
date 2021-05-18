/*
 * @author: kate
 * @create: 2021-04-21 10:43 AM
 * @license: MIT
 * @lastAuthor: lsj
 * @lastEditTime: 2021-04-27 18:49 PM
 * @desc:购物车
 */
"use strict";
//TODO 当页面加载完时开始数据请求
window.onload = function () {
  axios
    .post("http://24123z8o79.zicp.vip/getAllGoods", {})
    .then(function (response) {
      alldata = response.data;
      if (alldata == "") {
        get(".nullshopcar").style.display = "block";
      } else {
        showgoods(alldata);
        // adnode(alldata);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};

//TODO 所有数据存储
let alldata = [];

//TODO 获取页面元素的函数
function get(doc) {
  return document.querySelector(doc);
}
function gets(doce) {
  return document.querySelectorAll(doce);
}

//TODO 展示商品函数
function showgoods(alldata) {
  alldata.forEach((elem, index) => {
    //往原数组添加num属性
    elem.num = 1;
    //TODO 添加图片的数组
    let li = document.createElement("li");
    //li中添加样式
    li.innerHTML = ` 
       <div class="list-aitem dif juc fwrap" style="width: 220px">
          <img src="./img/5.jpg" alt="" / style="width:180px">
          <section class="gpfsc wi"> ￥${elem.price}</section>
          <a href="" class="gfsc ade dbl">
          ${elem.desc}
          </a>
          <section class="dif wi">
          <b class="flcor"> ${elem.evaNum}</b>
          <span class="gfsce">条评论</span>
          </section>
          <div class="listshopname dif alic wi">
          <span class="gfsce"> ${elem.merchant}</span>
          <svg
          t="1618914715532"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="20306"
          width="20"
          height="20">
          <path
            d="M958.2 441.9c-4.9-45.1-17.9-88.7-35.7-119.8-40.5-70.8-94.7-125.8-161.1-163.3-72.4-40.9-160.5-61.7-261.7-61.7-4.2 0-8.6 
            0-12.8 0.1h-0.6c-7.6 0.7-15.1 1.4-22.7 2-7.6 0.7-15.2 1.3-22.8 2h-0.4l-0.4 0.1c-13.1 2.8-26.3 5.6-39.4 8.4-13.8 2.9-27.6 
            5.9-41.4 8.8l-0.3 0.1-0.3 0.1c-66.5 20.8-123.7 51.8-170 92-48.3 41.9-84.7 94-108.3 154.6-12.5 32.1-18.3 74.1-16.2 118.4 1.9 
            40.9 10.4 81.9 23.3 112.5 25.8 61.1 65.4 112.6 117.5 153.3 50 39 111.7 68 183.3 86.3 37.4 9.6 86.4 15.3 130.9 15.3 
            34.7 0 65.5-3.5 89.3-10.2 22.8 21.1 56.2 41.2 94.4 56.8 41.6 17 86.1 27.4 125.5 29.3l12.2 0.6-5.7-10.7c-7.3-13.6-14.
            5-27.3-21.7-40.9-7.2-13.5-14.3-27-21.5-40.5-3.4-9.8-16.3-46.5-19.3-55.2l13.8-9.5c13.5-9.3 27-18.6 40.5-28l0.2-0.1 
            0.1-0.1c50.4-39.1 89.9-94.8 117.5-165.7 18.3-47.9 17.6-99.8 13.8-135zM706.4 743.8l-4.1 2 0.2 4.6c1.3 32.2 12.2 61.4 22.3 
            87.3-18.7-7.2-37.7-17.3-55.8-29.5-2.9-2.3-5.8-4.5-8.7-6.8-4.7-3.6-9.3-7.3-13.9-10.9-2.4-2.6-4.8-5.2-7.2-7.7-2.5-2.7-5-5.3-7.6-8l-2.7-2.9-3.8 
            0.8c-6.1 1.3-12.3 2.6-18.4 4-6.3 1.4-12.7 2.8-18.9 4.1-23.8 4.7-51.5 7.4-75.9 7.4-16.3 0-31-1.1-43.8-3.4-104.3-18.3-167.2-42.3-224.4-85.6-51-38.6-88.9-91.3-106.7-148.2-38.6-122.8 
            22.8-238.5 100.7-298.7 44.1-34 92.9-58.7 149.1-75.6 12.2-2.5 24.5-4.9 36.7-7.3 9.4-1.9 18.9-3.8 28.3-5.6l33.7-3h1.8c176 0 301.5 59.4 373 176.6 11.2 18.2 21.1 41.8 29.6 70.1 47.6 159.7-83.7 288.7-183.5 336.3z"
            fill="#5892FF"
            p-id="20307"></path>
          <path
            d="M294.8 382.8l-2.1-0.5-2.1 0.8c-28.6 11.2-43.5 
            22.5-50.7 56.6-6.6 30.6 2.3 72 20.3 94.3 9.2 11.4 
            20.3 17.4 32.1 17.4 1.2 0 2.4-0.1 3.6-0.2 18.8-1.9 
            34.3-14.7 43.6-36.3 15.4-35.6 11.5-87.5-8.4-113.3-9.3-12-21.8-15.2-36.3-18.8zM547.3 
            395.3c-8-6.8-16.5-9-26.4-11.6l-3.6-0.9-2.2-0.6-2.1 0.8c-28.5 11.1-43.4 22.3-50.7 
            55.5-6.8 30.9 2.1 72.7 20.2 95.2 9.2 11.4 20.3 17.5 32.2 17.5 1.2 0 2.4-0.1 3.6-0.2 
            21.4-2.1 38.7-19.5 47.5-47.7 5.7-18.3 7.3-40 4.5-59.6-3.2-21.3-11.3-38.5-23-48.4z"
            fill="#5892FF"
            p-id="20308"></path>
          </svg>
          </div>
          <div class="shopsale wi"></div>
          <div class="addshop dif">
          <div class="addshopcar">
          <div class="add-left dif alic">
            <button></button>
            <span class="gfsce">对比</span>
          </div>
          </div>
          <div
          class="addshopcar"
          style="border-left: none; border-right: none"
          >
          <div class="add-left dif alic">
            <svg
              t="1618916950589"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="21166"
              width="16"
              height="16">
              <path
                d="M511.73 926.24a40.42 40.42 0 0 1-28.38-11.53L130 567.42a219.12 219.12 
                0 0 1 0-312.76c69.82-68.63 199-70.45 271.07-3.81l110.66 101.49 110.7-101.54c72-66.59 
                201.18-64.77 271 3.86l-14.27 14.51 14.27-14.51a219.15 219.15 0 0 1 0 312.76L540.1 914.71a40.39 
                40.39 0 0 1-28.37 11.53zM267.81 242.69c-40.76 0-81.53 13.72-109.27 41a178.44 178.44 0 0 0 0 254.72l353.19 
                347.13L864.91 538.4a178.44 178.44 0 0 0 0-254.72c-54.35-53.43-158.8-54.86-214.92-3l-113.2 103.88a36.86 36.86 
                0 0 1-50.13 0L373.52 280.78c-27.52-25.45-66.6-38.09-105.71-38.09z"
                p-id="21167"
                fill="#dbdbdb"></path>
            </svg>
            <span class="gfsce">关注</span>
          </div>
          </div>
          <div class="addshopcar adcar" style="width: 96px" onclick="addShopCar('${elem.goodsID}')">
          <div class="add-left dif alic" >
            <svg
              t="1618917206077"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="22628"
              width="20"
              height="20">
              
            </svg>
            <span class="gfsce" style="color: #e4393c" >加入购物车</span>
          </div>
          </div>
          </div>
          </div>
`;
    //追加到商品列表ul
    get(".ulone").appendChild(li);
  });
}


//点击
const addShopCar = function (id) {
  console.log(id);
  let goodsData = "";
  alldata.forEach((item) => {
    console.log(item.goodsID);
    if (id === item.goodsID) {
      goodsData = item;
    }
  });

  get(".cart-allcheck").style.display = "block";
  if (shopdata.length == 0) {
    shopdata.push(goodsData);
    //TODO 创建购物车内商品列表
    reydyyy(goodsData);
  } else {
    let isIn = false; // ! 标志当前商品是否在购物车当中
    shopdata.forEach((sda) => {
      if (sda.goodsID == goodsData.goodsID) {
        sda.num++;
        //
        let id = sda.goodsID + "NumIpt";
        console.log(
          "🚀 ~ file: index2.js ~ line 208 ~ shopdata.forEach ~ id",
          id
        );
        let NumIpt = document.getElementById(id);
        console.log(
          "🚀 ~ file: index2.js ~ line 208 ~ shopdata.forEach ~ NumIpt",
          NumIpt
        );
        NumIpt.value = sda.num;
        isIn = true;
      }
    });

    if (!isIn) {
      shopdata.push(goodsData);
      reydyyy(goodsData);
    }
  }
};


let shopdata = [];
console.log("🚀 ~ file: index2.js ~ line 206 ~ shopdata", shopdata);

//TODO 创建商品全选栏
let allcheck = document.createElement("div");
allcheck.innerHTML = `
    <div class="wi dif">
    <div class="allcheck-left dif alic">
    <input type="checkbox" />
    <span class="gfsc">全选</span>
    </div>
    <div class="allcheckmid dif jubt">
    <span class="gfsc">商品</span>
    <span class="gfsc">单价</span>
    </div>
    <div class="allcheckright">
    <span class="gfsc">数量</span>
    </div>
    <div class="allcheckend dif jubt">
    <span class="gfsc">小计</span>
    <span class="gfsc">操作</span>
    </div>
    </div>
    `;
//追加到全选栏
get(".cart-allcheck").appendChild(allcheck);



function reydyyy(Data) {
  let ints = document.createElement("div");
  ints.innerHTML = `
            <div class="shoplist dif fwrap">
               <div class="int">
                <input type="checkbox" />
                </div>
                <div class="listright dif">
                <div class="rightimg dif juc alic">
                  <img src="../img/3.webp" alt="" />
                </div>
                <div class="shoptitle">
                  <span class="gfsc"
                    >${Data.desc}</span
                  >
                </div>
                <div class="spec">
                  <span class="gfsc">${Data.name}</span>
                </div>
                <div class="price">
                  <span class="gfsc">￥${Data.price}</span>
                </div>
                <div class="shopnum dif">
                  <button>-</button>
                  <input type="text" value="${Data.num}" id="${Data.goodsID}NumIpt" />
                  <button>+</button>
                </div>
                <div class="subtotal">
                  <b class="gfsc" id="">￥${Data.price}</b>
                </div>
                <div class="shoplistde dif fwrap">
                  <span class="gfsc del" >删除</span>
                  <span class="gfsc">移入关注</span>
                </div>
               </div>
            </div>
        `;
  get(".shoplists").appendChild(ints);
}