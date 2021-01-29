const express = require('express');
const router = express.Router();
const mysql = require("mysql");
const apiController = require('../controllers/api')
const checkAuth = require('../controllers/checkAuth');
const numb = apiController.num;
const db = require('./db');
const store_db = apiController.storedb;

router.get("/", (req,res) =>{
    res.render("index");
  });

  router.get("/sign_in", (req,res) =>{
    res.render("sign_in")
  });

  router.get("/login", (req,res) => {
    res.render("login")
  });

router.get("/search", (req,res) => {
  const zip = "421601";
  store_db.query('SELECT store_name FROM store_db WHERE store_zipcode =?', ['421601'], async(error, results) => {
    if(error){
        console.log(error);
    } else{
        const out = results[0].store_name

        console.log(out);
        return res.render('search', {
            title: out, title2: results[1].store_name
        })
    }
  })

});

  router.get("/posts", async (req,res) =>{
    db.query('SELECT email FROM maw_users WHERE user_id = ?', [2], async(error, results) => {
        if(error){
            console.log(error);
        } else{
            const out = results[0].email
            console.log(out);
            return res.render('posts', {
                title: out
            })
        }
    })
  });

router.get("/dashboard", (req,res) => {
  res.render("dashboard")
});


  router.get("/join", (req,res) =>{
    res.render("join")
  });

  router.get("/testing", (req,res) =>{
    res.render("results", {
      num:numb, space:"    sjbdvj"
    })
  });

  router.get("/user_info", (req, res) => {
      res.render("user_info")
  });

  router.get("/match", (req, res) => {
      res.render("match")
  });

router.get("/test", apiController.test)

router.get("/profile", (req, res) => {
  res.render("profile")
});

router.get("/aboutus", (req,res) => {
  res.render("aboutus")
});

router.get('*', function(req, res){
  res.render("notfound");
});

  module.exports = router;
