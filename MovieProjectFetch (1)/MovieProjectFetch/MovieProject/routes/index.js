let x = 2;
var express = require('express');
var router = express.Router();
var fs = require("fs");


let serverOrderArray = [];


let orderObject = function (pStore, pSalesPerson, pCd, pPrice, pDate) {
  this.StoreID = pStore;  
  this.SalesPersonID = pSalesPerson;
  this.CdID = pCd;
  this.PricePaid = pPrice;
  this.Date = pDate;
}

// my file management code, embedded in an object
fileManager  = {

  read: function() {
    const stat = fs.statSync('ordersData.json');                       
    var rawdata = fs.readFileSync('ordersData.json'); // read disk file
    serverOrderArray = JSON.parse(rawdata);  // turn the file data into JSON format and overwrite our array
  },
  
  write: function() {
    let data = JSON.stringify(serverOrderArray);    // take our object data and make it writeable
    fs.writeFileSync('ordersData.json', data);  // write it
  },
}



router.get('/', function(req, res, next) {
  res.sendFile('index.html');
});



router.post('/AddOrder', function(req, res) {
  const newOrder = req.body;  // get the object from the req object sent from browser
  console.log(newOrder); // write the object to console to verify that it was received


  var response = {
    status  : 200,
    success : 'Received Successfully'
  }
  res.end(JSON.stringify(response)); // send reply
});


router.post('/AddOrders500', function(req, res) {
  const newOrders = req.body;  
  console.log(newOrders[1]); 

  newOrders.forEach(order => {
    serverOrderArray.push(order);
  });
  fileManager.write();


  var response = {
    status  : 200,
    success : 'Added!'
  }
  res.end(JSON.stringify(response)); // send reply
});

module.exports = router;