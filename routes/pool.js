var mysql=require('mysql');
var pool=mysql.createPool({

    host:'127.0.0.1', 
    port:'3306',
    user:'root',
    password:'1234',

    database:'restaurantbooking',
    multipleStatements:true,
    connectionLimit:100         
})

module.exports=pool;