"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

//Mailgun Setup
var api_key = 'key-0f03ad929654bb6136772d628a456f98';
var domain = 'sandbox0229991348f842509ff15dab0913c399.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));



////////// Home page
app.get("/", (req, res) => {
  res.render("index");
});


///////// PLACEHOLDER FOR FULL MAILGUN RUN FUNCTION

// app.post('/polls', (req, res) => {
// }

function sendEmail() {

  var data = {
    from: 'Decision Maker <postmaster@sandbox0229991348f842509ff15dab0913c399.mailgun.org>',
    to: 'ben_li5@yahoo.ca',
    subject: 'Hello',
    text: 'Testing some Mailgun awesomness!'
  };


  /////PlaceHolder For Actual Links

  // var voterEmail = {
  //   from: 'decisions.admin_email <postmaster@sandbox0229991348f842509ff15dab0913c399.mailgun.org>',
  //   to: 'voters.email'
  //   subject: 'decision.title'
  //   text: 'decision.message'
  // }
  // mailgun.messages().send(data, function (error, body) {
  //   console.log(body);
  // }

  mailgun.messages().send(data, function (error, body) {
    console.log(body);
  });
}
sendEmail();



app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
