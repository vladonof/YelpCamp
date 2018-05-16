var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var middleware = require("../middleware");
var Campground = require("../models/campground");
//root route
router.get("/", function(req, res){
  res.render("landing");
});


//register
router.get("/register", function(req, res){
  res.render("register");
});

router.post("/register", function(req, res){
  var newUser = new User({
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
  });
  
  User.register(newUser, req.body.password, function(err, user){
    if(err){
      //console.log(err.message);
      req.flash("error", {"error": err.message});
      return res.render("register", {"error": err.message});
    }
    passport.authenticate("local")(req, res, function(){
      req.flash("success", "Welcome to YelpCamp " + user.username);
      res.redirect("/campgrounds");
    });
  });
});

//login
router.get("/login", function(req,res){
  res.render("login");
});

router.post("/login", passport.authenticate("local",
  {
    successRedirect: "/campgrounds",
    failureRedirect: "/login",
    failureFlash: true
  }), function(req, res){
  
});

//logout 
router.get("/logout", function(req, res){
  req.logout();
  req.flash("success", "Logged you out!");
  res.redirect("/campgrounds");
});


// USER PROFILE
router.get("/users/:id", function(req, res){
  User.findById(req.params.id, function(err, foundUser){
    if(err){
      req.flash("error", "Something went wrong.");
      res.redirect("/");
    }
    Campground.find().where("author.id").equals(foundUser._id).exec(function(err, campgrounds){
      if(err){
        req.flash("error", "Something went wrong.");
        res.redirect("/");
      }
      res.render("users/show", {user: foundUser, campgrounds: campgrounds});
    });
  });
});

module.exports = router;