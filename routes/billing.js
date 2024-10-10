var express = require('express');
var router = express.Router();
const pool=require("./pool");
const upload = require('./multer');

router.post('/bill_submit', function(req, res, next) {
  pool.query("insert into billing(billtime, billdate, tableno, server, fssai, cnote, gst, billingdetails, totalamount, customername, mobileno)values(?,?,?,?,?,?,?,?,?,?,?)",[req.body.billtime, req.body.billdate, req.body.tableno, req.body.server, req.body.fssai, req.body.cnote, req.body.gst, req.body.billingdetails, req.body.totalamount, req.body.customername, req.body.mobileno],function(error,result){
  if(error)
  {
      console.log("Errorrr",error);
      res.status(200).json({status:false,message:'Database Error'})
  
  }
  else
  {
      res.status(200).json({status:true,message:'Bill Submitted Successfully'})
  }
  
  })
  });

  router.post('/fetch_filtered_bill',function(req,res){
    console.log(req.body.tilldate+" "+req.body.fromdate);
    pool.query('select * from billing where billdate between ? and ?',[req.body.fromdate,req.body.tilldate],function(error,result){
        if(error)
        {
            console.log(error)
            res.status(200).json({status:false,message:'Database Error',data:[]});
        }
        else
        {  console.log(result)
            res.status(200).json({status:true,data:result,message:'bills Get Successfully'});
        }
    
    }) 
    })


    router.post('/fetch_total',function(req,res){
        console.log(req.body.currentdate);
        pool.query('select sum(totalamount) as totalbill from billing where billdate between ? and ?',[req.body.fromdate,req.body.tilldate],function(error,result){
            if(error)
            {
                console.log(error)
                res.status(200).json({status:false,message:'Database Error',data:[]});
            }
            else
            {  console.log(result)
                res.status(200).json({status:true,data:result[0],message:'bills Get Successfully'});
            }
        
        }) 
        })


        router.post('/fetch_totalsale_month',function(req,res){
            console.log(req.body.currentdate);
            pool.query('select month(billdate) as  month, sum(totalamount) as totalbill from billing group by month(billdate) order by month',function(error,result){
                if(error)
                {
                    console.log(error)
                    res.status(200).json({status:false,message:'Database Error',data:[]});
                }
                else
                {  console.log(result)
                    res.status(200).json({status:true,data:result,message:'bills Get Successfully'});
                }
            
            }) 
            })


            router.post('/fetch_todays_total',function(req,res){
                pool.query('select sum(totalamount) as totalbill from billing where billdate=?',[req.body.todaysdate],function(error,result){
                    if(error)
                    {
                        console.log(error)
                        res.status(200).json({status:false,message:'Database Error',data:[]});
                    }
                    else
                    {  
                        res.status(200).json({status:true,data:result[0],message:'bills Get Successfully'});
                    }
                
                }) 
                })

  module.exports = router;