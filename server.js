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
  res.status(200).render("index");
});

app.get("/polls/result/:id", (req, res) => {
  res.status(200).render("result");
});

app.get("/polls/:id", (req, res) => {
  res.status(200).render("vote");
});


/////////////POST REQUESTS//////////////////

app.post('/polls', (req, res) => {
  console.log(req.body);
  /////Decision Table///////
  let email_subject = req.body.title;
  let email_text = req.body.message;
  let email_admin = req.body.admin_email;
  /// may need for each to loop thorugh each voter///
  // let email_voter = req.body[""];
  let rem_time = req.body.time;
  //options
  let admin_url = generateRandomString();
  let voter_url = generateRandomString();
  let url_voter = 'localhost8080:' + req.body.voter_url;
  let url_admin = 'localhost8080:' + req.body.admin_url;

  /////////GENERATE RANDOM STRING

    //////////////// INSERT INFORMATION INTO TABLES ///////////////////
////////////////WORKING TEMPLATE/////////////////////////

  // for (let email in email_voter)
  // for (let option in )
  console.log(req.body.votersArray[0].voter_email);
  console.log(req.body.votersArray[0].voter_url);

  knex('decisions')
    .returning('id')
    .insert({
      title: email_subject,
      time: rem_time,
      message: email_text,
      admin_email: email_admin,
      admin_name: req.body.admin_name,
      admin_url: url_admin
    })
    .then(function([decisionId]) {
      console.log(decisionId);
      // for (var i = 0; i > req.optionsArray.length; i++) {
        return Promise.all([
          knex('voters')
            .returning('id')
            .insert({
              voter_name: req.body.votersArray[0].voter_name;
              voter_email: req.body.votersArray[0].voter_email,
              voter_url: req.body.votersArray[0].voter_url,
              decision_id: decisionId
            }),
          knex('options')
            .returning('id')
            .insert({
              title: req.body.optionsArray[0].title,
              description: req.body.optionsArray[0].description,
              decision_id: decisionId,
              total_rank: 0
            })
        ]);
      // }
      })
      .then(function([[voterId], [optionId]]) {
        return knex('polls')
        .insert({
          voter_id: voterId,
          option_id: optionId,
          base_rank: 0
        })
      /////Also insert into polls table for each and ends here.
    }).finally(knex.destroy);


  ///////// PLACEHOLDER FOR FULL MAILGUN RUN FUNCTION
    //////////PlaceHolder For Email Function////////////

  // function sendEmail() {
  //   var data = {
  //     from: 'Decision Maker <postmaster@sandbox0229991348f842509ff15dab0913c399.mailgun.org>',
  //     to: 'ben_li5@yahoo.ca',
  //     subject: 'Hello',
  //     text: 'Testing some Mailgun awesomness!'
  //   };
  //   mailgun.messages().send(data, function (error, body) {
  //     console.log(body);
  //   });
  // }
  // sendEmail();
  //////////////////////////////////////////////////////

  ///VOTER EMAIL///

    var voterEmail = {
      from: 'Decision Maker <postmaster@sandbox0229991348f842509ff15dab0913c399.mailgun.org>',
      to: req.body.voter_email,
      subject: email_subject,
      text: email_text, url_voter
    }

    mailgun.messages().send(voterEmail, function (error, body) {
      console.log(body);
    });

  // /ADMIN EMAIL///

  var adminEmail = {
      from: 'Decision Maker <postmaster@sandbox0229991348f842509ff15dab0913c399.mailgun.org>',
      to: email_admin,
      subject: email_subject,
      text: 'Thank you for using Decision Maker. Your administration and user link are as follows: ', url_admin, url_voter
    }

    mailgun.messages().send(adminEmail, function (error, body) {
      console.log(body);
    });

});


// knex('decisions')
//     .returning('id')
//     .insert({
//       title: 'Testing',
//       time: 90,
//       message: 'how are you doing today',
//       admin_email: 'hello@world.com',
//       admin_name: 'mrroboto',
//       admin_url: '3j391f'
//     })
//     .then(function([decisionId]) {
//       return Promise.all([
//         knex('voters')
//           .returning('id')
//           .insert({
//             voter_email: 'voters_email',
//             voter_name: 'voters_name',
//             voter_url: 'voters_url' ,
//             decision_id: decisionId
//           }),
//         knex('options')
//           .returning('id')
//           .insert({
//             title: 'titles',
//             description: 'descriptions',
//             decision_id: decisionId,
//             total_rank: 0
//           })
//       ]);
//     })
//     .then(function([[voterId], [optionId]]) {
//       return knex('polls')
//       .insert({
//         voter_id: voterId,
//         option_id: optionId,
//         base_rank: 0
//       })
//     }).finally(knex.destroy)

  // console.log(knexInsert());



knex('decisions')
  .join('options', 'decisions.id', '=', 'options.decision_id')
  .join('voters', 'decisions.id', '=', 'voters.decision_id')
  .select()
  .then(function(result) {
  console.log(result);
  // console.log('Found ' + result.length + ' person(s) by the last name ' + input)
  // for (var i = 0; i < result.length; i++) {
  //   console.log(result[i].first_name + ' ' + result[i].last_name + ' Born: ' + result[i].birthdate)
  // }
});


// function selectFrom() {
// knex.select().from('decisions')
// knex.select().from('decisions')
// knex.select().from('decisions')
//   .then
// .finally(knex.destroy)
// }
// console.log(selectFrom());


app.post('/polls/:id', (req, res) => {
})


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
