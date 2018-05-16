var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data =[
  {
    name: "Cloud's rest",
    image: "https://share1.canvasholidays.com/media/ALL/img/etabs/gallery/401/slider_listing/01.jpg",
    description:"Beef short ribs pork loin brisket burgdoggen. Short loin meatball shankle boudin tenderloin. Chuck landjaeger cupim alcatra, ground round short loin rump shoulder short ribs pig chicken kevin pork loin. Short loin leberkas pork, ball tip drumstick ham short ribs ground round. Venison bresaola drumstick bacon jowl meatball shank pig hamburger prosciutto pastrami. Jerky meatloaf biltong tongue, filet mignon leberkas spare ribs. Tail turkey buffalo pig tenderloin spare ribs landjaeger flank cupim alcatra porchetta meatloaf brisket bacon kevin."
  },  
  {
    name: "Desert Mesa",
    image: "https://assets.bedful.com/images/f60eaf793db2a91a1e6bff79948fb2997e3addd0/large/image/pop-up-campsites.jpg",
    description:"Beef short ribs pork loin brisket burgdoggen. Short loin meatball shankle boudin tenderloin. Chuck landjaeger cupim alcatra, ground round short loin rump shoulder short ribs pig chicken kevin pork loin. Short loin leberkas pork, ball tip drumstick ham short ribs ground round. Venison bresaola drumstick bacon jowl meatball shank pig hamburger prosciutto pastrami. Jerky meatloaf biltong tongue, filet mignon leberkas spare ribs. Tail turkey buffalo pig tenderloin spare ribs landjaeger flank cupim alcatra porchetta meatloaf brisket bacon kevin."
  }, 
  {
    name: "Canyon Floor",
    image: "https://media-cdn.tripadvisor.com/media/photo-s/0e/fc/a6/62/camping-la-playa-ibiza.jpg",
    description:"Beef short ribs pork loin brisket burgdoggen. Short loin meatball shankle boudin tenderloin. Chuck landjaeger cupim alcatra, ground round short loin rump shoulder short ribs pig chicken kevin pork loin. Short loin leberkas pork, ball tip drumstick ham short ribs ground round. Venison bresaola drumstick bacon jowl meatball shank pig hamburger prosciutto pastrami. Jerky meatloaf biltong tongue, filet mignon leberkas spare ribs. Tail turkey buffalo pig tenderloin spare ribs landjaeger flank cupim alcatra porchetta meatloaf brisket bacon kevin."
  } 
];


function seedDB(){
  //Remove all campgrounds
  Campground.remove({},function(err){
    if(err){
      console.log(err);
    }
    console.log("removed campgrounds!");
    data.forEach(function(seed){
      Campground.create(seed, function(err, campground){
        if(err){
          console.log(err);
        }else{
          console.log("added a campground");
          //create a comment
          Comment.create(
            {
              text:"This place is great, but I wish there was internet",
              author: "Homer"
            },function(err, comment){
              if(err){
                console.log(err)
              }else{
                campground.comments.push(comment);
                campground.save();
                console.log("Created new comment")
              }
            });
        }
      });
    });
  });
  //add a few campgrounds
  
  //add a few comments
}
module.exports = seedDB;