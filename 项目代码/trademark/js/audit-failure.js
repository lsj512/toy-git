/*
 * @author: 小万
 * @create: 2021-05-06 15:29 PM
 * @license: MIT
 * @lastAuthor: 小万
 * @lastEditTime: 2021-05-07 14:43 PM
 * @desc: 
 */
let obj = {
    account: 'test2'
}
obj = JSON.stringify(obj)
//TODO
localStorage.setItem("json", obj);
//TODO
var value = localStorage.getItem("json");
value = JSON.parse(value)
console.log(value);
// 获取数据
axios.post('http://192.168.0.13:3000/getBusinessInfoByStatus', {
        "account": value.account,
        "status": "3"
    })
    .then(function (response) {
        console.log(response);
        alldata = response.data;
        todd(response.data) // 渲染页面
        console.log(alldata);
        $(".delete").onclick = () => { // 删除按钮
            $all("#change").forEach((e, idx) => {
                if (e.checked == true) {
                    de = alldata[idx].order_id;
                    console.log(de);
                    adelete(de)
                    todd(response.data)
                }
            });
        }
    })
    .catch(function (error) {
        console.log(error);
    });
// 渲染页面函数
function todd(alldata) {
    $(".table-info").innerHTML = "";
    for (let i = 0; i < alldata.length; i++) {
        doc = ` <li>
        <div class="check"><input type="checkbox" id="change" /></div>
        <div class="num">${i+1}</div>
        <div class="order-no">${alldata[i].ID_card_num}</div>
        <div class="applicant">${alldata[i].account}</div>
        <div class="applicant-name">${alldata[i].username}</div>
        <div class="business-type">
          变更商标申请人/注册人名义/地址/变更集体商标/证明商标管理规则/集体成员名单
        </div>
        <div class="audit-status"><a href="javascript:;">审核中</a></div>
        <div class="operation"><a href="javascript:;">查看详情</a></div>
      </li>`
        // $(".table-info") 获取ul控件
        $(".table-info").innerHTML += doc;
    };
}
// 绑定控件函数
function $(change) {
    return document.querySelector(change);
}

function $all(changeall) {
    return document.querySelectorAll(changeall);
}
let adelete = function (id) {
    axios.post('http://192.168.0.13:3000/deleteBusiness', {
            orderID: id
        })
        .then(function (response) {})
        .catch(function (error) {
            console.log(error);
        });
}