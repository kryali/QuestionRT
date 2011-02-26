isLoggedIn = function(req, res, next){
  console.log(req.session);
  if ( req.session.user ){
    next();
  } else {
    // Redirect to the login page
    res.redirect('login');
  }
};

