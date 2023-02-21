let myinputEl = document.getElementById('input-el')
let ulEl = document.getElementById('ul-el')
let AddBtn = document.getElementById('add-btn')
let Listitem = document.getElementById('listitem')
let RenderWatchlist = document.getElementById("render-watchlist")
let ItemWatchlist = document.getElementById("item-watchlist")
let listboxEl = document.getElementById("listbox")
let NSEbtn = document.getElementById("nse-btn")
let NSDQbtn = document.getElementById("nsdq-btn")
let BNBSbtn = document.getElementById("bnbs-btn")
let Table = document.getElementById("table")
let DBtn = document.getElementById("d-btn")
let orderbox = document.getElementById("main-2-two-1")
let usStocks 
let nsestocks
let Cryptonames
let NseWholeData
let cryptoWholeData
let usStockpriceData 
let exchange = 0
let buyingticker
let buyingtickerPrice
let buyingtickerExchange
let TotalorderNumber = document.getElementById("total-orders")
let Totalorders = 0



// import data for nsdaq
fetch("us-data.json").then(response =>response.json())
.then(data => {
    usStocks = data
});



//fetch data for NSE
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '3da147d207msh81549da6e4e8910p10a44ajsn1bcc5dcf03bb',
		'X-RapidAPI-Host': 'latest-stock-price.p.rapidapi.com'
	}
}
fetch('https://latest-stock-price.p.rapidapi.com/any', options)
.then(response =>response.json())
.then(data => {
    NseWholeData = data
    nsestocks = data.map(data=>data.symbol)}).catch(console.log("error"))


//fetch data for crypto coins
fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=true')
.then(response =>response.json()).then(data => {
    cryptoWholeData = data
    Cryptonames =  data.map(content => content.name)
})

NSEbtn.addEventListener("click",()=>{exchange = 1
    NSEbtn.style.backgroundColor = "#353839"
    NSDQbtn.style.backgroundColor = "whitesmoke"
    BNBSbtn.style.backgroundColor = "whitesmoke"
Renderlist()})
NSDQbtn.addEventListener("click",()=>{exchange = 2
    NSEbtn.style.backgroundColor = "whitesmoke"
    NSDQbtn.style.backgroundColor = "#353839"
    BNBSbtn.style.backgroundColor = "whitesmoke"
Renderlist()})
BNBSbtn.addEventListener("click",()=>{exchange = 3
    NSEbtn.style.backgroundColor = "whitesmoke"
    NSDQbtn.style.backgroundColor = "whitesmoke"
    BNBSbtn.style.backgroundColor = "#353839"
Renderlist()})

listboxEl.addEventListener("mouseleave",()=>{
    ulEl.innerHTML = ''
})

myinputEl.addEventListener("click",Renderlist)

function closePannel(){
    orderbox.innerHTML = ""
}
 function CreateOrder(){
   orderbox.innerHTML = `<div id= card>
   <div id="buy-info-close">
         <div class="buy-info">
            <p>Buy <span id="black">${buyingticker}</span>  - <span id="black">${buyingtickerPrice}</span> </p> 
            <p>EXCHANGE - <span id="black">${buyingtickerExchange}</span></p>
         </div>
        <div class="closeButton">
            <button onclick="closePannel()" id="Close-Btn"><i class="fa-solid fa-xmark fa-2xl"></i></button>
        </div>
    </div>
<div class="order-details">
    <p>Order Type:</p>
     <a href=""><input id="r-btn" type="radio">Regular</a>
     <a href=""><input id="r-btn" type="radio">Cover</a>
</div>
<div class="details">
    <fieldset class="field">
        <input value=${buyingtickerPrice} id="input-price" type="number"><legend>Price</legend>
    </fieldset>
    <fieldset class="field">
        <input value ="1" id="input-qty" type="number"><legend>QTY:</legend>
    </fieldset>
    
</div>
<div class="radiobtn">
    <p> <input type="radio"> Limit</p>
    <p> <input type="radio"> Market</p>
</div>
<div class="buy-sell">
    <p>Margin Required - <span id="black">${buyingtickerPrice}</span></p>
    <button onclick="BuySellStock()" id="buy-btn">BUY</button>
    <button onclick="BuySellStock()" id="sell-btn">SELL</button>
</div>
</div>`


}
function done(){
    orderbox.innerHTML = ""
}
 function BuySellStock(){
    Totalorders++
    TotalorderNumber.innerHTML = `${Totalorders}`
    orderbox.innerHTML = `<div id="orderplacingcard">
    <div id="order-card-info">
        <p>
        Your Order Request Has Been Sent It Will Be Executed In The Next Trading Session Thank You! </p>
    </div>
    <div class="okay-btn">
        <button onclick="done()" id="okay-btn">Confirm</button>
    </div>
</div>`
 }
function UpdateWatchlist(exchange,str1,str2,str3){
    if(str3>0){
        RenderWatchlist.innerHTML += `<div class="item-watchlist"  id="${str1}">
        <div>
    <span class="green">${str1}</span><span id="item-exchangeVal">${exchange}</span>
    <span><i class="fa-solid fa-chevron-up"></i> ${str3.toFixed(2)} %</span>
    <span class="green">${str2}</span>
    </div>
    <div  id="item-btns">
        <button id="b-btn" onclick="CreateOrder()">B</button>
        <button id="s-btn" onclick="CreateOrder()">S</button>
        <a target="_blank" href="https://in.tradingview.com/symbols/${str1}/"><button id="c-btn" ><i class="fa-solid fa-chart-line"></i></button></a>
        <button onclick="RemoveItemWatchlist()" id="d-btn" ><i class="fa-solid fa-trash"></i></button>
    </div>
   </div>`
   buyingticker = str1;
   buyingtickerPrice = str2
   buyingtickerExchange = exchange
    }
    if(str3<0){
        RenderWatchlist.innerHTML += `<div class="item-watchlist" id="${str1}">
        <div>
    <span class="red">${str1}</span>
    <span><i class="fa-sharp fa-solid fa-chevron-down"></i>${str3.toFixed(2)} %</span>
    <span class="red">${str2}</span>
    </div>
    <div  id="item-btns">
        <button id="b-btn" onclick="CreateOrder()">B</button>
        <button id="s-btn" onclick="CreateOrder()">S</button>
        <a target="_blank" href="https://in.tradingview.com/symbols/${str1}/"><button id="c-btn" ><i class="fa-solid fa-chart-line"></i></button></a>
        <button onclick="RemoveItemWatchlist()" id="d-btn" ><i class="fa-solid fa-trash"></i></button>
    </div>
   </div>`
   buyingticker = str1;
   buyingtickerPrice = str2
   buyingtickerExchange = exchange

    }
    
}
function RemoveItemWatchlist(){
    RenderWatchlist.addEventListener('click',(e)=>{
       let o =  e.path[3].firstElementChild.firstElementChild.textContent

        if(RenderWatchlist.innerHTML!=""){
            const w = document.getElementById(o)
            w.remove() 
    }
    })
}

function filterfunction(){
    let filter = myinputEl.value.toUpperCase();
    
    let li = ulEl.getElementsByTagName("li")
    for(let i=0; i<900; i++){
        let a = li[i]
        if(a){
            let txtvalue = a.textContent.toUpperCase() || a.innerHTML.toUpperCase()
           if(txtvalue.indexOf(filter) > -1){
            li[i].style.display = "";
           }else{
            li[i].style.display = "none";
           }
        }
    }
}
function Renderlist(){
    //US STOCK
    if(exchange===2){
    let UsStocknames = ""
    for(let i=0; i<usStocks.length; i++){
        UsStocknames += `<li  id="listitem">${usStocks[i].Name}</li>`;
}
    ulEl.innerHTML = UsStocknames
    }
    //nse stocks
    if(exchange ===1){
        let insertNseStockNames = ""
        for(let i=0; i<nsestocks.length; i++){
            insertNseStockNames += `<li id="listitem">${nsestocks[i]}</li>`;
        }
        ulEl.innerHTML = insertNseStockNames
    }
    //Cryptocurrencies
    if(exchange ===3){
        let insertCryptoNames = ""
        for(let i=0; i<Cryptonames.length; i++){
            insertCryptoNames += `<li id="listitem">${Cryptonames[i]}</li>`;
        }
        ulEl.innerHTML = insertCryptoNames
    }
    else{
        return false;
    }
}


ulEl.addEventListener('click',(e)=>{
    

    sname = e.target.innerHTML
    //for nse
    if(exchange ===1){
    let previousclose
    let pchange
    for(let i=0; i<NseWholeData.length; i++){
        if(sname === NseWholeData[i].symbol){
            previousclose = NseWholeData[i].previousClose
            pchange = NseWholeData[i].pChange
        }
    }
    UpdateWatchlist("NSE",sname,previousclose,pchange)
    }
    //for nsdq
    if(exchange ===2){
        let smbl
        let pc
        let percentChange
        for(let i=0; i<usStocks.length; i++){
            if(sname === usStocks[i].Name ){
                 smbl = usStocks[i].Symbol
            }}
            fetch(`https://finnhub.io/api/v1/quote?symbol=${smbl}&token=cdmujmiad3i9q6h6852gcdmujmiad3i9q6h68530`).then(response=>response.json()).then(data=>{
            pc = data.c
            percentChange = data.dp
        }).then(setTimeout(()=>UpdateWatchlist("NSDAQ",smbl,pc,percentChange),1000))
    }
    //for crypto
    if(exchange ===3){
        for(let i=0; i<cryptoWholeData.length; i++){
            if(sname === cryptoWholeData[i].name ){
                 UpdateWatchlist("BNB",cryptoWholeData[i].symbol.toUpperCase(),cryptoWholeData[i].current_price,cryptoWholeData[i].price_change_24h)
            }}
    }
    ulEl.innerHTML = ""
    myinputEl.value = ""
})









