/*
 * @author: 小万
 * @create: 2021-05-11 17:03 PM
 * @license: MIT
 * @lastAuthor: Spring
 * @lastEditTime: 2021-05-12 15:11 PM
 * @desc: 
 */
let The_current_page = 1; //当前页
let maxpage = 10; //每页条数
// !audit.js 页面渲染
function ele(alldata, i) {
    return `  <li>
    <div class="check "><input type="checkbox" class="change"></div>
    <div class="num ">${i+1}</div>
    <div class="order-no ">${alldata[i].certificate_ID}</div>
    <div class="applicant ">${alldata[i].applicant_type}</div>
    <div class="applicant-name ">${alldata[i].applicant_name}</div>
    <div class="business-type ">变更商标申请人/注册人名义/地址/变更集体商标/证明商标管理规则/集体成员名单</div>
    <div class="audit-status "><a href="javascript:; ">审核中</a></div>
    <div class="operation "><a href="./inReview.html">查看详情</a></div>
</li>`
}
// !review-the-success.js 页面渲染
function element(alldata, i) {
    return `  <li>
    <div class="check "><input type="checkbox" class="change"></div>
    <div class="num ">${i+1}</div>
    <div class="order-no ">${alldata[i].certificate_ID}</div>
    <div class="applicant ">${alldata[i].applicant_type}</div>
    <div class="applicant-name ">${alldata[i].applicant_name}</div>
    <div class="business-type ">变更商标申请人/注册人名义/地址/变更集体商标/证明商标管理规则/集体成员名单</div>
    <div class="audit-status "><a href="javascript:; ">审核成功</a></div>
    <div class="operation "><a>预约</a></div>
</li>`
}
//  全选框
$("#checkboxall").onclick = () => {
    checkboxall();
}
// 下一页函数
function nextpage(alldata, todd) {
    if (Math.ceil(alldata.length / maxpage) == The_current_page) {
        return The_current_page;
    } else {
        The_current_page++;
        console.log(The_current_page);
        $("#sumpage").innerHTML = "共" + Math.ceil(alldata.length / maxpage) + "页"
        $("#currentpage").innerHTML = The_current_page
        todd(alldata);
    }
}
// 最后一页
function lastpage(alldata, todd) {
    The_current_page = Math.ceil(alldata.length / maxpage);
    $("#currentpage").innerHTML = The_current_page
    console.log(The_current_page);
    $("#sumpage").innerHTML = "共" + Math.ceil(alldata.length / maxpage) + "页"
    todd(alldata);
}
// 全选框
function checkboxall() {
    if ($("#checkboxall").checked == false) {
        $all(".change").forEach(e => {
            e.checked = false;
        });
    } else {
        $all(".change").forEach(e => {
            e.checked = true;
        });
    }
}
// 输入页面跳转
function inputpage(alldata, todd) {
    if ($("#inputpage").value == "" || $("#inputpage").value > Math.ceil(alldata.length / maxpage)) {
        $("#currentpage").innerHTML = The_current_page
        todd(alldata);
    } else {
        The_current_page = $("#inputpage").value;
        $("#currentpage").innerHTML = The_current_page
        $("#sumpage").innerHTML = "共" + Math.ceil(alldata.length / maxpage) + "页"
        todd(alldata);
    };
}
// 第一页
function firstpage(alldata, todd) {
    The_current_page = 1;
    console.log(The_current_page);
    $("#currentpage").innerHTML = The_current_page
    $("#sumpage").innerHTML = "共" + Math.ceil(alldata.length / maxpage) + "页"
    todd(alldata);
}
// 上一页
function previouspage(alldata, todd) {
    if (The_current_page == 1) {
        console.log(The_current_page);
        return The_current_page;
    } else {
        The_current_page--;
        $("#currentpage").innerHTML = The_current_page
        $("#sumpage").innerHTML = "共" + Math.ceil(alldata.length / maxpage) + "页"
        console.log(The_current_page);
        todd(alldata);
    }
}
// 删除函数
function deleteok(alldata,todd) {
    let num = [];
    // 多选删除
    $all(".change").forEach((e, idx) => {
        if (e.checked) {
            num.push(idx)
        }
    });
    if (num.length > 1) {
        let arra = []
        num.forEach(item => arra.push(alldata[item].order_id))
        delMore(arra)
        location.reload();
    }else {
        // 单选删除
        $all(".change").forEach((e, idx) => {

            if (e.checked == true) {
                $(".shade").style.display = "none";
                let id = alldata[idx].order_id
                alldata.splice(idx, 1)
                console.log(id);
                todd(alldata);
                del(id)

            }
        });
    }
    $(".shade").style.display = "none";
}
// !删除多个接口api
function delMore(id) {
    console.log(id);
    axios.post('http://192.168.0.13:3000/deleteMoreBusiness', {
            orderIDArr: id
        })
        .then(function (response) {
            re();
        })
        .catch(function (error) {
            console.log(error);
        });
}
//! 删除一条数据接口api
function del(id) {
    axios.post('http://192.168.0.13:3000/deleteBusiness', {
            orderID: id
        })
        .then(function (response) {

        })
        .catch(function (error) {
            console.log(error);
        });
}
// !创建数据函数
function creat(params) {
    axios.post('http://192.168.0.13:3000/createBusiness', {
            "account": "test1",
            "applicant_type": "1",
            "applicant_name": "张三",
            "valid_license": "1",
            "certificate_ID": "510702199911119999",
            "certificate_type": "1",
            "address": "四川省成都市",
            "phone": "13367890324",
            "identity": "sc",
            "city": "cd",
            "EN_name": "jack",
            "legal_person": "li",
            "EN_address": "scccd",
            "applicant_nationality": "china",
            "postal_code": "621000",
            "contacts": "bpl",
            "agency_name": "wxkj",
            "domestic_recipients": "wh",
            "application_country": "中国",
            "application_date": "2020-08-04",
            "application_instructions": "no",
            "trademark_info": "no",
            "trademark_type_id": "111",
            "nets": "wxkj",
            "business_type": "1"
        })
        .then(function (response) {
            // console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}
// 审核中
$("#check").onclick=()=>{
    self.location='./audit.html'; 
}
// 审核成功
$("#success").onclick=()=>{
    self.location='./review-the-success.html'; 
}
// 审核失败
$("#faileds").onclick=()=>{
    self.location='./audit-failure.html'; 
}
// 预约成功
$("#successful").onclick=()=>{
    self.location='./successful-appointment.html'; 
}
// $("#showUser-img").onclick=()=>{
    
// }
//! 获取满足条件接口数据
// function re() {
//     axios.post('http://192.168.0.13:3000/getBusinessInfoByStatus', {
//             account: "test1",
//             status: "1"
//         })
//         .then(function (response) {
//             console.log(response.data);
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
// }
// 获取控件函数
function $(change) {
    return document.querySelector(change);
}

function $all(change) {
    return document.querySelectorAll(change);
}
//!导出
export {
    ele,
    nextpage,
    lastpage,
    checkboxall,
    inputpage,
    firstpage,
    previouspage,
    The_current_page,
    maxpage,
    element,
    deleteok,
    creat,
    del,
    delMore,
    $,
    $all
}
