isLoggedIn = function(req, res, next){
  console.log(req.session);
  if ( req.session.user ){
    next();
  } else {
    // Redirect to the login page
    req.session.user = "none";
    res.redirect('login');
  }
};

