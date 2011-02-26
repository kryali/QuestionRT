isLoggedIn = function(req, res, next){
  console.log(req.session);
  if ( req.session.user ){
    next();
  } else {
    // Redirect to the login page
    res.redirect('login');
  }
};

crypto = require('crypto');
md5 = function(str){
  return crypto.createHash('md5').update(str).digest('hex');
}


