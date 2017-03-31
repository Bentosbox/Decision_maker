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



//////////////// GET PAGES ///////////////

app.get("/", (req, res) => {
  res.redirect("/polls");
});

app.get("/polls", (req, res) => {
  res.status(200).render("index")
});

app.get("/polls/admin/:id", (req, res) => {
  res.status(200).render("result")
});

app.get("/polls/:id", (req, res) => {
  res.status(200).render("vote")
});


/////////////POST REQUESTS//////////////////

app.post('/polls', (req, res) => {
  let email_subject = req.body[""];
  let email_text = req.body[""];
  let email_admin = req.body[""];
  /// may need for each to loop thorugh each voter///
  let email_voter = req.body[""];
  let time = req.body[""];
  let admin_url = generateRandomString();
  let voter_url = generateRandomString();
  let url_voter = 'localhost8080:' + voters.url
  let url_admin = 'localhost8080:' + decisions.admin_url

  /////////GENERATE RANDOM STRING

    //////////////// INSERT INFORMATION INTO TABLES ///////////////////


  //////INSERT INTO DECISIONS TABLE///////
  knex('decisions')
    .insert({title: email_subject, time: req.body[""], message: email_text, admin_email: email_admin, admin_name: req.body[""], admin_url: admin_url})
    .returning('id')
    .then(function(decisionId) {
      knex('voters')
        .insert({email: , name: req.body[""], url: voter_url , decision_id: decisionId[0]})
        console.log(decisionId)
        returning('id')
    });
        .then(function(voterId) {
          knex('options')
          console.log(voterId)
            .insert({title: req.body[""] description: req.body[""], decision_id: decisionId[0], total_rank: 0})
        });
            .then(function(optionId) {
              knex('polls')
              console.log(optionId)
                .insert({voter_id: decisionId[0], voter_id: voterId[0], base_rank: 0})
            });


  //////INSERT INTO VOTERS TABLE//////////

  // knex('voters')
  //   .insert({email: , name: req.body[""], url: voter_url , decision_id: })
  //   .then(function(result) {
  //   });

  //////INSERT INTO OPTIONS TABLE//////////

  // knex('options')
  //   .insert({title: req.body[""] description: req.body[""], decision_id: decisionId, total_rank:})
  //   .then(function(result) {
  //   });

  // knex('polls')
  //   .insert({voter_id: decisionId, voter_id: , base_rank:})


  ///////// PLACEHOLDER FOR FULL MAILGUN RUN FUNCTION
    //////////PlaceHolder For Email Function////////////
  function sendEmail() {
    var data = {
      from: 'Decision Maker <postmaster@sandbox0229991348f842509ff15dab0913c399.mailgun.org>',
      to: 'ben_li5@yahoo.ca',
      subject: 'Hello',
      text: 'Testing some Mailgun awesomness!'
    };
    mailgun.messages().send(data, function (error, body) {
      console.log(body);
    });
  }
  sendEmail();
  //////////////////////////////////////////////////////


  ///VOTER EMAIL///

    // var voterEmail = {
    //   from: 'Decision Maker <postmaster@sandbox0229991348f842509ff15dab0913c399.mailgun.org>',
    //   to: voters.email
    //   subject: email_subject
    //   text: email_text, url_voter
    // }
    // mailgun.messages().send(voterEmail, function (error, body) {
    //   console.log(body);
    // }

  // /ADMIN EMAIL///

//   var adminEmail = {
//       from: 'Decision Maker <postmaster@sandbox0229991348f842509ff15dab0913c399.mailgun.org>',
//       to: decisions.admin_email
//       subject: email_subject
//       text: 'Thank you for using Decision Maker. Your administration and user link are as follows: ', url_admin, url_voter
//     }
//     mailgun.messages().send(adminEmail, function (error, body) {
//       console.log(body);
//     }
// }


app.post('/polls/:id', (req, res) => {
}

/////////////////FUNCTIONS//////////////////


// function to generate a random string of 6 alpha numeric characters
function generateRandomString() {
  var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var text = "";
  for( var i=0; i < 6; i++ ) {
    text += charset.charAt(Math.floor(Math.random() * charset.length));
    }
  return text;
}
// Used a do-while loop to generate random string until it does not exist in the database
//     do {
//       var shortURL = generateRandomString();
//     } while (urlDatabase[shortURL]);



app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
