//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const homeStartingContent =  "The process of building takes time and effort, making us see that to become great at something, practicing is essential. Realizing that the best investment is the development of our own knowledge is priceless.";
const aboutContent = "Computer science student at Lehman University in the bronx. Since I was very little, the programming and the logic behind the monitor have caught my attention ...When I was little I used my computer to practice, but I didn't focus on the software part, but rather on how the hardware was able to receive this signal that made it work in a special way.I started by getting to know the computer from the outside in, taking it apart and reassembling it.Then I learned the magic of formatting an operating system, of dividing a hard drive into several blocks to avoid losing information.I dedicated myself to know the functioning of proxies, VPN's and many other cybernetic structures.Today I have a passion for programming but my ambition does not stop here. In the future I want to learn Robotics with applied artificial intelligence..";
const contactContent = "The shared links at the bottom of the page will guide you to direct communications with the author of this website, even the link below this description allows direct access to email.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true});

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
