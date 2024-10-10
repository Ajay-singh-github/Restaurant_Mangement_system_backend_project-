var express = require("express");
var router = express.Router();
var pool = require("./pool");
var jwt = require("jsonwebtoken");
/* GET home page. */
/*
router.post("/chktoken", function (req, res) {
  console.log(req.headers.authorization);
  const token = req.headers.authorization;
  jwt.verify(token, "shhhhhh", function (err, decoded) {
    console.log(err, decoded);
    res.status(200).json(decoded);
  });
  //res.status(200).json({'status':'invalid token'})
});
*/
router.post("/checklogin", function (req, res, next) {
  console.log(req.body);
  pool.query(
    "select * from superadmin where emailid=? and password=?",[req.body.emailid, req.body.password],function (error, result) {
      if (error) {
        res.status(200).json({ status: false, data: [], message: "Server Error..." });
      } else {
        if (result.length == 1) {
          var token = jwt.sign({ data: result[0] }, "shhhhhh",{ expiresIn: 1000*60 }); //shhhhhhh ka matlab yaha pr ham kuch bhi dek sakte hai ye hamari secret key hai,aur jo  data:result ki jagah ko bolege payload
          console.log(token);                                                          // token sign hone ke baad token mai three part hote hai pehla header dusra payload aur three wala signature total header.payload.signature
          res.status(200).json({
            status: true,
            data: result[0],
            message: "Login Successful",
            token,
          });
        } else {
          res.status(200).json({
            status: false,
            data: [],
            message: "Invalid userid/password",
          });
        }
      }
    }
  );
});

module.exports = router;
