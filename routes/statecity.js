var express = require('express');
var router = express.Router();
var pool  =require('./pool');

/* GET home page. */
router.get('/fetch_all_states', function(req, res, next) {
 try{

 
    pool.query("select * from states" , function(error,result){
        if(error){
        
            res.status(200).json({status:'false',message:"Data Error....",data:[]})

        }else
        {
            console.log(result)
            res.status(200).json({status:'true',message:"Successfully",data:result})
            
        }
    })
      }
    catch(e)
    {
        res.status(200).json({status:'false',message:"Server error",data:[]})
    }
   
});


router.post('/fetch_all_cities', function(req, res, next) {
 try{

 
    pool.query("select * from city where stateid=?",[req.body.stateid], function(error,result){
        if(error){
        
            res.status(200).json({status:'false',message:"Data Error....",data:[]})

        }else
        {
            console.log(result)
            res.status(200).json({status:'true',message:"Successfully",data:result})
            
        }
    })
      }
    catch(e)
    {
        res.status(200).json({status:'false',message:"Server error",data:[]})
    }
   
});





module.exports = router;
