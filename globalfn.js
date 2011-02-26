isLoggedIn = function(req, res, next){
  if ( false ){
    next();
  } else {
    // Redirect to the login page
    res.redirect('login');
  }
};

