var express = require('express');
var router = express.Router();
var pool = require("./pool");
var upload = require("./multer");

/* GET users listing. */
router.post('/restaurant_submit',upload.any(), function(req, res, next) {
  pool.query("insert into restaurants (restaurantname, ownername, phonenumber, emailid, mobileno, url, fassai, gstno, gsttype, filefassai, fileshopact, filelogo, address, stateid, cityid,createdat,updatedat,password)values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[ req.body.restaurantname, req.body.ownername, req.body.phonenumber, req.body.emailid, req.body.mobileno, req.body.url, req.body.fassai, req.body.gstno, req.body.gsttype, req.files[0].filename, req.files[1].filename, req.files[2].filename, req.body.address, req.body.stateid, req.body.cityid,req.body.createdat,req.body.updatedat,req.body.password],function(error,result){
    if(error)
    {    console.log("errrrrrrrrrrrrrrrrrrrorrrrrrr:",error)
         res.status(200).json({status:false,message:'Data Base Error'})
    }else
    {    console.log("cityidajay:",req.body.cityname)
         res.status(200).json({status:true,message:'Restaurant added successfully'})
    }
  })
});


router.get('/fetch_all_restaurant',function(req,res,next){
  pool.query("select * ,(select statename from states where states.stateid=restaurants.stateid) as statename ,(select cityname from city where city.cityid=restaurants.cityid) as cityname from restaurants",function(error,result){
    if(error)
    {    
         res.status(200).json({status:false,data:[],message:'Data Base Error'})
    }else
    {    console.log("cityidajay:",result)
         res.status(200).json({status:true,data:result,message:''})
    }
  })
})


router.post('/restaurant_edit_data',upload.any(), function(req, res, next) {
  pool.query("update  restaurants  set restaurantname=?, ownername=?, phonenumber=?, emailid=?, mobileno=?, url=?, fassai=?, gstno=?, gsttype=?, address=?, stateid=?, cityid=?,updatedat=? where restaurantid=?",[ req.body.restaurantname, req.body.ownername, req.body.phonenumber, req.body.emailid, req.body.mobileno, req.body.url, req.body.fassai, req.body.gstno, req.body.gsttype, req.body.address, req.body.stateid, req.body.cityid,req.body.updatedat,req.body.restaurantid],function(error,result){
    if(error)
    {    console.log("errrrrrrrrrrrrrrrrrrrorrrrrrr:",error)
         res.status(200).json({status:false,message:'Data Base Error'})
    }else
    {    console.log("cityidajay:",req.body.cityname)
         res.status(200).json({status:true,message:'Restaurant Updated successfully'})
    }
  })
});


router.post('/restaurant_edit_fssai',upload.any(), function(req, res, next) {
  pool.query("update restaurants set filefassai=? where restaurantid=?",[req.files[0].filename,req.body.restaurantid ],function(error,result){
    if(error)
    {    console.log("errrrrrrrrrrrrrrrrrrrorrrrrrr:",error)
         res.status(200).json({status:false,message:'Data Base Error'})
    }else
    {    console.log("cityidajay:",req.body.cityname)
         res.status(200).json({status:true,message:'Fassai Certificate Update successfully'})
    }
  })
});


router.post('/restaurant_edit_shopact',upload.any(), function(req, res, next) {
  pool.query("update restaurants set fileshopact=? where restaurantid=?",[req.files[0].filename,req.body.restaurantid ],function(error,result){
    if(error)
    {    console.log("errrrrrrrrrrrrrrrrrrrorrrrrrr:",error)
         res.status(200).json({status:false,message:'Data Base Error'})
    }else
    {    console.log("cityidajay:",req.body.cityname)
         res.status(200).json({status:true,message:'ShopAct Certificate Update successfully'})
    }
  })
});


router.post('/restaurant_edit_logo',upload.any(), function(req, res, next) {
  pool.query("update restaurants set filelogo=? where restaurantid=?",[req.files[0].filename,req.body.restaurantid ],function(error,result){
    if(error)
    {    console.log("errrrrrrrrrrrrrrrrrrrorrrrrrr:",error)
         res.status(200).json({status:false,message:'Data Base Error'})
    }else
    {    console.log("cityidajay:",req.body.cityname)
         res.status(200).json({status:true,message:'Logo  Updated successfully'})
    }
  })
});


router.post('/restaurant_delete',upload.any(), function(req, res, next) {
  pool.query("delete from restaurants where restaurantid=?",[req.body.restaurantid ],function(error,result){
    if(error)
    {    console.log("errrrrrrrrrrrrrrrrrrrorrrrrrr:",error)
         res.status(200).json({status:false,message:'Data Base Error'})
    }else
    {    console.log("cityidajay:",req.body.cityname)
         res.status(200).json({status:true,message:'Restaurant Deleted successfully'})
    }
  })
});


router.post('/restaurant_category_submit',upload.any(), function(req, res, next) {
  pool.query("insert into category (restaurantid,categoryname,icon)values(?,?,?)",[ req.body.restaurantid,req.body.categoryname,req.files[0].filename],function(error,result){
    if(error)
    {    console.log("errrrrrrrrrrrrrrrrrrrorrrrrrr:",error)
         res.status(200).json({status:false,message:'Data Base Error'})
    }else
    {    console.log("cityidajay:",req.body.cityname)
         res.status(200).json({status:true,message:'Category added successfully'})
    }
  })
});


router.post('/fetch_all_category',upload.any(), function(req, res, next) {
 try{
  pool.query("select * from category where restaurantid=?",[req.body.restaurantid],function(error,result){
    if(error)
    {    console.log("errrrrrrrrrrrrrrrrrrrorrrrrrr:",error)
         res.status(200).json({status:false,message:'Data Base Error',result:''})
    }else
    {    console.log("cityidajay:",req.body.admin)
         res.status(200).json({status:true,message:'Category added successfully',result:result})
    }
  })
}catch(e)
{
  res.status(200).json({status:false,message:'Server  Error',result:''})
}
});


router.post('/category_edit_submit',upload.any(), function(req, res, next) {
  pool.query("update category set categoryname=? where categoryid=?",[req.body.categoryname,req.body.categoryid ],function(error,result){
    if(error)
    {    console.log("errrrrrrrrrrrrrrrrrrrorrrrrrr:",error)
         res.status(200).json({status:false,message:'Data Base Error'})
    }else
    {    console.log("cityidajay:",req.body.cityname)
         res.status(200).json({status:true,message:'Category Name  Updated successfully',data:result})
    }
  })
});

router.post('/category_icon_edit',upload.any(), function(req, res, next) {
  
  pool.query("update category set icon=? where categoryid=?",[req.files[0].filename,req.body.categoryid ],function(error,result){
    if(error)
    {    console.log("errrrrrrrrrrrrrrrrrrrorrrrrrr:",error)
         res.status(200).json({status:false,message:'Data Base Error'})
    }else
    {    console.log("cityidajay:",req.body.cityname)
         res.status(200).json({status:true,message:'Category Icon  Updated successfully',data:result})
    }
  })
});



router.post('/category_delete',upload.any(), function(req, res, next) {
  pool.query("delete from category where categoryid=?",[req.body.categoryid ],function(error,result){
    if(error)
    {    console.log("errrrrrrrrrrrrrrrrrrrorrrrrrr:",error)
         res.status(200).json({status:false,message:'Data Base Error'})
    }else
    {    console.log("cityidajay:",req.body.cityname)
         res.status(200).json({status:true,message:'Category Deleted successfully'})
    }
  })
});

router.get('/fetch_category', function(req, res, next) {
  try{
 
  
     pool.query("select * from category where restaurantid=28", function(error,result){
         if(error){
         
             res.status(200).json({status:'false',message:"Data Error....",data:[]})
 
         }else
         {
             
             
             res.status(200).json({status:'true',message:"Successfully",data:result})
             
         }
     })
       }
     catch(e)
     {
         res.status(200).json({status:'false',message:"Server error",data:[]})
     }
    
 });

 router.post('/subcategory_submit',upload.any(), function(req, res, next) {
  try{
  pool.query("insert into fooditems (restaurantid, categoryid,  fooditemname, foodtype, ingredients, price, offerprice, icon)values(?,?,?,?,?,?,?,?)",[ req.body.restaurantid,req.body.categoryid,req.body.fooditem,req.body.foodtype,req.body.ingredients,req.body.price,req.body.offerprice,req.files[0].filename],function(error,result){
    if(error)
    {    console.log("errrrrrrrrrrrrrrrrrrrorrrrrrr:",error)                                                                                                                                          
         res.status(200).json({status:false,message:'Data Base Error'})
    }else
    {    
         res.status(200).json({status:true,message:'Sub Category added successfully'})
    }
  })
 }catch(e)
 {
  console.log("eeeeeeee:",e)
 }
});


router.post('/fetch_all_sub_category',upload.any(), function(req, res, next) {
  pool.query("select *,(select categoryname from category where categoryid=fooditems.categoryid) as categoryname from fooditems where restaurantid=?",[req.body.restaurantid],function(error,result){
    if(error)
    {    console.log("errrrrrrrrrrrrrrrrrrrorrrrrrr:",error)
         res.status(200).json({status:false,message:'Data Base Error',result:''})
    }else
    {    console.log("cityidajay:",result)
         res.status(200).json({status:true,message:'Category added successfully',result:result})
    }
  })
});


router.post('/edit_sub_category',upload.any(), function(req, res, next) {
  pool.query("update fooditems set fooditemname=?, foodtype=?, ingredients=?, price=?, offerprice=? where restaurantid=? and categoryid=? and fooditemid=?",[ req.body.fooditemname, req.body.foodtype, req.body.ingredients, req.body.price, req.body.offerprice,  req.body.restaurantid , req.body.categoryid,req.body.fooditemid],function(error,result){
    if(error)
    {    console.log("errrrrrrrrrrrrrrrrrrrorrrrrrr:",error)
         res.status(200).json({status:false,message:'Data Base Error'})
    }else
    {    console.log("cityidajay:",req.body.cityname)
         res.status(200).json({status:true,message:'Sub Category  Updated successfully',data:result})
    }
  })
});


router.post('/sub_category_icon_edit',upload.any(), function(req, res, next) {
  
  pool.query("update fooditems set icon=? where fooditemid=? and categoryid=?",[req.files[0].filename,req.body.fooditemid,req.body.categoryid ],function(error,result){
    if(error)
    {    console.log("errrrrrrrrrrrrrrrrrrrorrrrrrr:",error)
         res.status(200).json({status:false,message:'Data Base Error'})
    }else
    {    console.log("cityidajay:",result)
         
         res.status(200).json({status:true,message:'Sub Category Icon  Updated successfully',data:result})
    }
  })
});


router.post('/sub_category_delete',upload.any(), function(req, res, next) {
  pool.query("delete from fooditems where categoryid=? and fooditemid=?",[req.body.categoryid,req.body.fooditemid ],function(error,result){
    if(error)
    {    console.log("errrrrrrrrrrrrrrrrrrrorrrrrrr:",error)
         res.status(200).json({status:false,message:'Data Base Error'})
    }else
    {    console.log("cityidajay:",req.body.cityname)
         res.status(200).json({status:true,message:'Sub Category Deleted successfully'})
    }
  })
});


router.post('/table_booking',function(req, res, next) {
  try{
  pool.query("insert into tablebooking (restaurantid, tableno, noofchairs, floor )values(?,?,?,?)",[ req.body.restaurantid,req.body.tableno,req.body.noofchair,req.body.floor],function(error,result){
    if(error)
    {    console.log("errrrrrrrrrrrrrrrrrrrorrrrrrr:",error)                                                                                                                                          
         res.status(200).json({status:false,message:'Data Base Error'})
    }else
    {    
         res.status(200).json({status:true,message:'Table Booking successfully'})
    }
  })
 }catch(e)
 {
  console.log("eeeeeeee:",e)
 }
});




router.post('/fetch_table_data', function(req, res, next) {
  try{
 
  
     pool.query("select * from tablebooking where restaurantid=?",[req.body.restaurantid], function(error,result){
         if(error){
         
             res.status(200).json({status:'false',message:"Data Error....",data:[]})
 
         }else
         {
             
             
             res.status(200).json({status:'true',message:"Successfully",data:result})
             
         }
     })
       }
     catch(e)
     {
         res.status(200).json({status:'false',message:"Server error",data:[]})
     }
    
 });

 router.post('/table_data_update',upload.any(), function(req, res, next) {
  
  pool.query("update tablebooking set  tableno=?, noofchairs=?, floor=? where restaurantid=? and tableid=?  ",[req.body.tableno,req.body.noofchair,req.body.floor,req.body.restaurantid,req.body.tableid ],function(error,result){
    if(error)
    {    console.log("errrrrrrrrrrrrrrrrrrrorrrrrrr:",error)
         res.status(200).json({status:false,message:'Data Base Error'})
    }else
    {    console.log("cityidajay:",result)
         
         res.status(200).json({status:true,message:'Table Booking Updated successfully',data:result})
    }
  })
});

router.post('/table_booking_delete', function(req, res, next) {
  pool.query("delete from tablebooking where tableid=? ",[req.body.tableid ],function(error,result){
    if(error)
    {    console.log("errrrrrrrrrrrrrrrrrrrorrrrrrr:",error)
         res.status(200).json({status:false,message:'Data Base Error'})
    }else
    {    console.log("cityidajay:",req.body.tableid)
         res.status(200).json({status:true,message: 'Table Booking Deleted successfully'})
    }
  })
});

router.post('/waiters_data_submit',upload.any(), function(req, res, next) {
  try{
  pool.query("insert into waiters (restaurantid,  waitername, gender, dob, mobileno, emailid, address, picture)values(?,?,?,?,?,?,?,?)",[ req.body.restaurantid,  req.body.waitername, req.body.gender, req.body.dob, req.body.mobileno, req.body.emailaddress, req.body.address, req.files[0].filename],function(error,result){
    if(error)
    {    console.log("errrrrrrrrrrrrrrrrrrrorrrrrrr:",error)                                                                                                                                          
         res.status(200).json({status:false,message:'Data Base Error'})
    }else
    {    
         res.status(200).json({status:true,message:'Waiter Data Submitted successfully'})
    }
  })
 }catch(e)
 {
  console.log("eeeeeeee:",e)
 }
});


router.post('/fetch_waiters_data', function(req, res, next) {
  try{
 
  
     pool.query("select * from waiters where restaurantid=?",[req.body.restaurantid], function(error,result){
         if(error){
         
             res.status(200).json({status:'false',message:"Data Error....",data:[]})
 
         }else
         {
             
             
             res.status(200).json({status:'true',message:"Successfully",data:result})
             
         }
     })
       }
     catch(e)
     {
         res.status(200).json({status:'false',message:"Server error",data:[]})
     }
    
 });

 router.post('/edit_waiter_data',upload.any(), function(req, res, next) {
  try{
  pool.query("update waiters set  waitername=?, gender=?, dob=?, mobileno=?, emailid=?, address=? where waiterid=?  ",[req.body.waitername, req.body.gender, req.body.dob, req.body.mobileno, req.body.emailaddress, req.body.address,req.body.waiterid],function(error,result){
    if(error)
    {    console.log("errrrrrrrrrrrrrrrrrrrorrrrrrr:",error)
         res.status(200).json({status:false,message:'Data Base Error'})
    }else
    {    console.log("cityidajay:",result)
         
         res.status(200).json({status:true,message:'Waiter Data Updated successfully',data:result})
    }
  })
}catch(e)
{
    console.log("server error")
}
});

 router.post('/waiter_picture_edit',upload.any(), function(req, res, next) {
  try{
  pool.query("update waiters set   picture=? where waiterid=?  ",[req.files[0].filename,req.body.waiterid],function(error,result){
    if(error)
    {    console.log("errrrrrrrrrrrrrrrrrrrorrrrrrr:",error)
         res.status(200).json({status:false,message:'Data Base Error'})
    }else
    {    console.log("cityidajay:",result)
         
         res.status(200).json({status:true,message:'Waiter picture Updated successfully',data:result})
    }
  })
}catch(e)
{
    console.log("server error")
}
});

router.post('/delete_waiter', function(req, res, next) {
  pool.query("delete from waiters where waiterid=? ",[req.body.waiterid ],function(error,result){
    if(error)
    {    console.log("errrrrrrrrrrrrrrrrrrrorrrrrrr:",error)
         res.status(200).json({status:false,message:'Data Base Error'})
    }else
    {    console.log("cityidajay:",req.body.tableid)
         res.status(200).json({status:true,message: 'Waiter Deleted successfully'})
    }
  })
});

router.post('/waitertable_data_submit',upload.any(), function(req, res, next) {
  try{
  pool.query("insert into waitertable (restaurantid, waiterid, tableid, currentdate)values(?,?,?,?)",[ req.body.restaurantid,  req.body.waiterid, req.body.tableid, req.body.currentdate],function(error,result){
    if(error)
    {    console.log("errrrrrrrrrrrrrrrrrrrorrrrrrr:",error)                                                                                                                                          
         res.status(200).json({status:false,message:'Data Base Error'})
    }else
    {    
         res.status(200).json({status:true,message:'Waiter Table Data Submitted successfully'})
    }
  })
 }catch(e)
 {
  console.log("eeeeeeee:",e)
 }
});



router.post('/fetch_waiter_table_asign', function(req, res, next) {
  try{
 
  
     pool.query("select w.waitername,t.tableno,wt.currentdate,wt.restaurantid,t.floor,w.waiterid,wt.tableid,wt.waitertableid from waiters w,tablebooking t,waitertable wt where wt.waiterid=w.waiterid and wt.tableid=t.tableid and wt.restaurantid=? ",[req.body.restaurantid], function(error,result){
         if(error){
         
             res.status(200).json({status:'false',message:"Data Error....",data:[]})
 
         }else
         {
             
             
             res.status(200).json({status:'true',message:"Successfully",data:result})
             
         }
     })
       }
     catch(e)
     {
         res.status(200).json({status:'false',message:"Server error",data:[]})
     }
    
 });

 router.post('/fetch_table_data_fill', function(req, res, next) {
  try{
 
  
     pool.query("select * from tablebooking where restaurantid=? and floor=?",[req.body.restaurantid,req.body.floor], function(error,result){
         if(error){
         
             res.status(200).json({status:'false',message:"Data Error....",data:[]})
 
         }else
         {
             
             
             res.status(200).json({status:'true',message:"Successfully",data:result})
             
         }
     })
       }
     catch(e)
     {
         res.status(200).json({status:'false',message:"Server error",data:[]})
     }
    
 });

 router.post('/fetch_waiters_floor', function(req, res, next) {
  try{
 
  
     pool.query("select * from tablebooking where restaurantid=?  group by floor ",[req.body.restaurantid], function(error,result){
         if(error){
         
             res.status(200).json({status:'false',message:"Data Error....",data:[]})
 
         }else
         {
             
             
             res.status(200).json({status:'true',message:"Successfully",data:result})
             
         }
     })
       }
     catch(e)
     {
         res.status(200).json({status:'false',message:"Server error",data:[]})
     }
    
 });


 router.post('/waiter_table_edit_data_submit',upload.any(), function(req, res, next) {
  try{
  pool.query("update waitertable set  waiterid=?, tableid=?, currentdate=? where restaurantid=? and waitertableid=?",[req.body.waiter, req.body.tablename, req.body.currentdate, req.body.restaurantid,req.body.waitertableid],function(error,result){
    if(error)
    {    console.log("errrrrrrrrrrrrrrrrrrrorrrrrrr:",error)
         res.status(200).json({status:false,message:'Data Base Error'})
    }else
    {    console.log("cityidajay:",result)
         
         res.status(200).json({status:true,message:'Waiter Table Data Updated successfully',data:result})
    }
  })
}catch(e)
{
    console.log("server error")
}
});


router.post('/waiter_table_delete', function(req, res, next) {
  pool.query("delete from waitertable where waitertableid=? and restaurantid=? ",[req.body.waitertableid,req.body.restaurantid ],function(error,result){
    if(error)
    {    console.log("errrrrrrrrrrrrrrrrrrrorrrrrrr:",error)
         res.status(200).json({status:false,message:'Data Base Error'})
    }else
    {    console.log("cityidajay:",req.body.tableid)
         res.status(200).json({status:true,message: 'Waiter Table Deleted successfully'})
    }
  })
});


router.post('/fetch_all_sub_category_foodbooking',upload.any(), function(req, res, next) {
  pool.query("select *,(select categoryname from category where categoryid=fooditems.categoryid) as categoryname from fooditems where restaurantid=? and categoryid=?",[req.body.restaurantid,req.body.categoryid],function(error,result){
    if(error)
    {    console.log("errrrrrrrrrrrrrrrrrrrorrrrrrr:",error)
         res.status(200).json({status:false,message:'Data Base Error',result:''})
    }else
    {    console.log("cityidajay:",result)
         res.status(200).json({status:true,message:'Category added successfully',result:result})
    }
  })
});


//useInterface ke liye banaya hai router

// fetch_all_product

router.post('/fetch_all_product',upload.any(), function(req, res, next) {
  pool.query("SELECT f.*,c.categoryname FROM fooditems f,category c where f.categoryid = c.categoryid and c.restaurantid=?",[req.body.restaurantid],function(error,result){
    if(error)
    {    console.log("errrrrrrrrrrrrrrrrrrrorrrrrrr:",error)
         res.status(200).json({status:false,message:'Data Base Error',result:''})
    }else
    {    console.log("cityidajay:",result)
         res.status(200).json({status:true,message:'Category added successfully',result:result})
    }
  })
});


router.post('/fetch_all_product_by_fillter',upload.any(), function(req, res, next) {
  pool.query("SELECT f.*,c.categoryname FROM fooditems f,category c where f.categoryid = c.categoryid and c.restaurantid=? and foodtype=?",[req.body.restaurantid,req.body.fillter],function(error,result){
    if(error)
    {    console.log("errrrrrrrrrrrrrrrrrrrorrrrrrr:",error)
         res.status(200).json({status:false,message:'Data Base Error',result:''})
    }else
    {    console.log("cityidajay:",result)
         res.status(200).json({status:true,message:'Category added successfully',result:result})
    }
  })
});

//fetch_all_category_after_count
router.post('/fetch_all_category_after_count',upload.any(), function(req, res, next) {
  pool.query("SELECT count(*) as count FROM restaurantbooking.category where restaurantid=?",[req.body.restaurantid],function(error,result){
    if(error)
    {    console.log("errrrrrrrrrrrrrrrrrrrorrrrrrr:",error)
         res.status(200).json({status:false,message:'Data Base Error',result:''})
    }else
    {    console.log("cityidajay:",result)
         res.status(200).json({status:true,message:'Category added successfully',result:result})
    }
  })
});



//fetch_category_by_spacific


router.post('/fetch_category_by_spacific',upload.any(), function(req, res, next) {
  pool.query("SELECT f.*,c.categoryname FROM fooditems f,category c   where f.categoryid=c.categoryid  and f.categoryid =? and f.restaurantid=?",[req.body.categoryid,req.body.restaurantid],function(error,result){
    if(error)
    {    console.log("errrrrrrrrrrrrrrrrrrrorrrrrrr:",error)
         res.status(200).json({status:false,message:'Data Base Error',result:''})
    }else
    {    console.log("cityidajay:",result)
         res.status(200).json({status:true,message:'Category added successfully',result:result})
    }
  })
});

// filter by veg aur non veg

router.post('/fetch_fooditem_by_filter',upload.any(), function(req, res, next) {
  pool.query("select f.*,c.categoryname from fooditems f,category c where f.categoryid=c.categoryid  and f.foodtype=? and f.categoryid=? and f.restaurantid=?",[req.body.foodtype,req.body.categoryid,req.body.restaurantid],function(error,result){
    if(error)
    {    console.log("errrrrrrrrrrrrrrrrrrrorrrrrrr:",error)
         res.status(200).json({status:false,message:'Data Base Error',result:''})
    }else
    {    console.log("cityidajay:",result)
         res.status(200).json({status:true,message:'Category added successfully',result:result})
    }
  })
});

//fetch_fooditem_by_filter_result_by_300_600

router.post('/fetch_fooditem_by_filter_result_by_300_600',upload.any(), function(req, res, next) {
  pool.query("select f.*,c.categoryname from fooditems f,category c where f.categoryid=c.categoryid and f.categoryid=? and f.restaurantid=? and f.offerprice between 300  and 600 order by f.offerprice asc ",[req.body.categoryid,req.body.restaurantid],function(error,result){
    if(error)
    {    console.log("errrrrrrrrrrrrrrrrrrrorrrrrrr:",error)
         res.status(200).json({status:false,message:'Data Base Error',result:''})
    }else
    {    console.log("cityidajay:",result)
         res.status(200).json({status:true,message:'Category added successfully',result:result})
    }
  })
});

//1_300

router.post('/fetch_fooditem_by_filter_result_by_1_300',upload.any(), function(req, res, next) {
  pool.query("select f.*,c.categoryname from fooditems f,category c where f.categoryid=c.categoryid and f.categoryid=? and f.restaurantid=? and f.offerprice between 1  and 300 order by f.offerprice asc ",[req.body.categoryid,req.body.restaurantid],function(error,result){
    if(error)
    {    console.log("errrrrrrrrrrrrrrrrrrrorrrrrrr:",error)
         res.status(200).json({status:false,message:'Data Base Error',result:''})
    }else
    {    console.log("cityidajay:",result)
         res.status(200).json({status:true,message:'Category added successfully',result:result})
    }
  })
});

//handleFetchAllCategoryAndCount


router.post('/handle_Fetch_All_Category_And_Count',upload.any(), function(req, res, next) {
  console.log("i am checking restaurant id :",req.body.restaurantid)
  pool.query("select c.categoryname,f.categoryid,count(f.categoryid)as count from category c,fooditems f where f.categoryid=c.categoryid and f.restaurantid=? group by f.categoryid",[req.body.restaurantid],function(error,result){
    if(error)
    {    console.log("errrrrrrrrrrrrrrrrrrrorrrrrrr:",error)
         res.status(200).json({status:false,message:'Data Base Error',result:''})
    }else
    {    console.log("cityidajay:",result)
         res.status(200).json({status:true,message:'Category added successfully',result:result})
    }
  })
});
module.exports = router;

