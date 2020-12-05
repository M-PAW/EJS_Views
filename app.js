
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const PORT = 3001;

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(express.static("partials"));

// Contents for each page
const pageContents = {
    'home': "Share your favorite quote with the world!",
    'about': "About Content",
    'contact': "Contact Content"
}

// Array of post objects
let posts = [];

app.get("/", (req,res) => {
    res.render("home", {homeContent: pageContents.home, posts: posts})
})

app.get("/about", (req,res) => {
    res.render("about", {aboutContent: pageContents.about})
})

app.get("/contact", (req,res) => {
    res.render("contact", {contactContent: pageContents.contact})
})

app.get("/compose", (req,res) => {
    res.render("compose", {contactContent: pageContents.contact})
})

app.post("/compose", (req,res) => {
    const post = {
        'title': req.body.title,
        'content': req.body.content
    }
    posts.push(post);
    res.redirect("/");
})

app.get("/posts/:post", (req,res) => {
    const requestedPost = _.lowerCase(req.params.post);
  
    const postExists = () => {
      posts.forEach( post => {
        _.lowerCase(post.title)===requestedPost?
        res.render("post", 
        {title: post.title,
         content: post.content}):null;
      })
    }
    postExists();
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})