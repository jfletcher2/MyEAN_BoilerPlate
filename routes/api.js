var express = require('express');
var router = express.Router();

router.use(function(req, res, next){
  if(req.method === "GET"){
    //continue to the next middleware or request handler
    return next();
  }
  if(!req.isAuthenticated()){
    //user not authenticated
    res.redirect('/#login');
  }
  //user authenticated
  return next();
});

module.exports = router;
