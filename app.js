
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const PORT = 3001;

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(express.static("partials"));

/**
 * function:
 * 
 */

// Contents for each page
const pageContents = {
    'home': "Share your favorite quote with the world!",
    'about': "This project was created to solidify my understanding of EJS Views which I learned while working through the course, The Complete 2020 Web Development Bootcamp by Angela Yu. This course is available on Udemy.",
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
        'author': req.body.author || "Unknown",
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
         author: post.author,
         content: post.content}):null;
      })
    }
    postExists();
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})