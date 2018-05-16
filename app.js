require('dotenv').config();

var express      = require("express"),
    app          = express(),
    bodyParser   = require("body-parser"),
    mongoose     = require("mongoose"),
    passport     = require("passport"),
    LocalStrategy= require("passport-local"),
    methodOverride=require("method-override"),
    Campground   = require("./models/campground"),
    seedDB       = require("./seeds"),
    User         = require("./models/user"),
    flash        = require("connect-flash"),
    Comment      = require("./models/comment");
    
    
//requring routes   
var campgroundRoutes = require("./routes/campgrounds"),
    commentRoutes    = require("./routes/comments"),
    indexRoutes      = require("./routes/index");

// mongoose.connect("mongodb://localhost/yelp_camp");
mongoose.connect("mongodb://vlad:vlad6996@ds125680.mlab.com:25680/yelpcamp");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB(); //seed the database

//passport config
app.use(require("express-session")({
  secret: "Once again Rusty wins cutest dog!",
  resave: false,
  saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});
app.locals.moment = require("moment");

//using routes
app.use(indexRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds", campgroundRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
  console.log("The YelpCamp Server Has Started!");
});