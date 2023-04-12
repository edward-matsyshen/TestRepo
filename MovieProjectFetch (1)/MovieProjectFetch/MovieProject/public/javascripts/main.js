
let orderArray = [];
let storeArray = [98053, 98007, 98077, 98055, 98011, 98046];
let CdArray = [123456, 231456, 334556, 432651, 654123];

// define a constructor to create order objects
let OrderObject = function (pStore, pSalesPerson, pCd, pPrice, pDate) {
    this.StoreID = pStore;  
    this.SalesPersonID = pSalesPerson;
    this.CdID = pCd;
    this.PricePaid = pPrice;
    this.Date = pDate;
}

document.addEventListener("DOMContentLoaded", function () {


// add button events ************************************************************************
    
    document.getElementById("submit").addEventListener("click", function () {
        let newOrder = createOrder();

        fetch('/AddOrder', {
            method: "POST",
            body: JSON.stringify(newOrder),
            headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            .then(response => response.json()) 
            .then(json => console.log(json))
            .catch(err => console.log(err));
    
    });

    document.getElementById("submit500").addEventListener("click", function(){
        let orderArray = [];
        let dateAddition = 0;

        for (let i = 0; i < 500; i++) { //Generates 500 orders
            orderArray.push(createOrder());
        }

        orderArray.forEach(order => { //Changes dates on orders past 1
            order.Date += dateAddition;

            dateAddition += Math.floor((Math.random() * 25001) + 5000); //Between 5000 and 30000
        });

        console.log(orderArray);

        fetch('/AddOrders500', {
            method: "POST",
            body: JSON.stringify(orderArray),
            headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            .then(response => response.json()) 
            .then(json => console.log(json))
            .catch(err => console.log(err));
    });

    document.getElementById("buttonCreate").addEventListener("click", function () {
        sampleOrder = createOrder();
        updateOrderDisplay(sampleOrder);    
    });

  

});  

function createOrder() {
    const randStore = storeArray[Math.floor(Math.random() * storeArray.length)];
    const randCD = CdArray[Math.floor(Math.random() * CdArray.length)];
    const randPrice = Math.floor(Math.random() * 11) + 5; 
    const randSalesPerson = Math.floor(Math.random() * 4) + (Math.floor(randStore / 46) * 4) + 1;
  
    const tempDate = Date.now();
    const newOrder = new OrderObject(randStore, randSalesPerson, randCD, randPrice, tempDate);
  
    return newOrder;
}
  
function updateOrderDisplay(sampleOrder){
    document.getElementById("sampleStore").innerHTML = "StoreID: " + sampleOrder.StoreID;
    document.getElementById("sampleSalesPerson").innerHTML = "SalesPersonID: "+sampleOrder.SalesPersonID;
    document.getElementById("sampleCd").innerHTML = "CdID: "+sampleOrder.CdID;
    document.getElementById("samplePrice").innerHTML = "PricePaid: "+sampleOrder.PricePaid;
    document.getElementById("sampleDate").innerHTML = "Date: "+sampleOrder.Date;
}