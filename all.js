//使用axios取得資料

let spotsData =[];
const spotsDataUrl ="https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json";

axios.get(spotsDataUrl)
    .then(function(response){
        //console.log(response.data.data);
        spotsData = response.data.data;
        //console.log(spotsData);
        //重要!!!因為非同步，後續要用到這個資料的函式一定要寫在裡面!!!
        init(spotsData);
        // filterRegion();
        })
    .catch(function(error){
        console.log(error.message); 
    });

//資料取得完成

//渲染畫面 程式碼開始
const cardRow = document.querySelector(".card-row");
const searchNum = document.querySelector(".search-num");
let cardTemplate = " ";

//確認有抓到資料
// console.log(cardRow);
// console.log(searchNum);
// console.log(cardTemplate);

//渲染畫面的函式
function init(spotsData){ 
    //console.log(spotsData);
    //使用forEach功能將資料帶入
    spotsData.forEach(function(item){
        cardTemplate += `<div class="col-4 mb-38" >
        <div class="card" >
            <div class="position-relative">
                <img src="${item.imgUrl}" class="card-img-top" alt="潛水">
                <div class="region-tag position-absolute top-0 start-0  ">${item.area}</div>
                <div class="rank-tag position-absolute top-100 start-0">${item.rate}</div>
            </div>
        <div class="card-body">
            <h5 class="card-title card-title-border" style="color: #00807E;">${item.name}</h5>
            <p class="card-text">${item.description}</p>
            <div class="d-flex justify-content-between">
                <div class="last-num d-flex align-items-center">
                    <i class="bi bi-exclamation-circle-fill " style="margin-right: 4px;"></i>
                    <p class="fw-bold " style="margin-bottom: 0;">剩下最後<span id="card-last-num">${item.group}</span>組</p>
                </div>
                <div class="price d-flex">
                    <p style="margin-right: 4px;">TWD
                    <span id="card-price" style="font-size: 32px;" class="fw-bold">$${item.price}</span>
                </div>
            </div>
        </div>
        </div>
        </div>`;
    })
    cardRow.innerHTML = cardTemplate;
    searchNum.textContent =`本次搜尋共顯示${spotsData.length}筆資料`;
}
//渲染畫面 程式碼結束

//篩選功能 程式碼開始

const regionSearch = document.querySelector(".spots-region-select");

//篩選功能函式
function filterRegion() {
    let filterResult = [];
    spotsData.forEach(function(item){
        //console.log(item);
        if(item.area===regionSearch.value){
            filterResult.push(item);
        }else if(regionSearch.value==="全部地區"){
            filterResult.push(item);
        }
    })
    init(filterResult);
};

regionSearch.addEventListener("change",filterRegion);

//篩選功能結束 (為何無法清除原有的資料?)

//新增套票功能開始

//宣告各個表單內容
const ticketName =
document.querySelector("#ticketName");
const imgSrc =
document.querySelector("#imgSrc");
const spotsRegion =
document.querySelector("#spotsRegion");
const ticketCost =
document.querySelector("#ticketCost");
const ticketGroup  =
document.querySelector("#ticketGroup");
const ticketRank =
document.querySelector("#ticketRank");
const ticketDesc =
document.querySelector("#ticketDesc");
//宣告新增套票按鈕
const addTicketBtn =
document.querySelector(".add-ticket-btn");
//宣告新增套票表單
const addTicketForm =
document.querySelector(".add-ticket-form-list");

//新增套票的函式
function addTicket(){
    let ticket ={
            "id": spotsData.length,
            "name": ticketName.value.trim(), //value是輸入的值 trim用來刪除字符串開頭和結尾的空白字符
            "imgUrl":imgSrc.value.trim() ,
            "area": spotsRegion.value.trim(),
            "description": ticketDesc.value.trim(),
            "group":Number( ticketGroup.value.trim()),
            "price":Number( ticketCost.value.trim()),
            "rate": Number(ticketRank.value.trim()),
    };
    //把新增的套票內容加進spotsData
    spotsData.push(ticket);
    //把篩選改為全部地區
    regionSearch.value ==="全部地區";
    //將新增套票表單重置
    addTicketForm.reset();
    //以新的spotsData資料渲染網頁
    init(spotsData);
}

addTicketBtn.addEventListener("click",addTicket);