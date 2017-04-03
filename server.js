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

//////FRONT POLL PAGE////////

app.get("/polls", (req, res) => {
  res.status(200).render("index");
});


///////RESULTS PAGE//////////

app.get("/polls/result/:id", (req, res) => {
  // const voterCheck =  knex('decisions')
  //   .join('voters', 'decisions.id', '=', 'voters.decision_id')
  //   .join('options', 'decisions.id', '=', 'options.decision_id')
  //   .select('admin_url')
  // .then((row) => {
  //   let success = false
  //   console.log(row);
  //   row.forEach((row) => {
  //     if (row.admin_url === req.params.id) {
  //       success = true
  //     }
  //   });
  //   console.log(success);
  //   if (success) {
      let urlData = req.params.id;
      // console.log(urlData);
      res.status(200).render("result", {admin_url: urlData});
    // } else {
    //   res.status(404).send('This Poll result Link Does Not Exist');
    // };
  // });

});

app.get("/polls/result/:id/json", (req, res) => {
  knex('decisions')
  .join('voters', 'decisions.id', '=', 'voters.decision_id')
  .join('options', 'decisions.id', '=', 'options.decision_id')
  .select('*')
  .where({
    admin_url: req.params.id
  })
  .then (function(voteResults) {
    // console.log(voteResults);
    // let resultData = {resultPage: voteResults};
    console.log('success');
    res.json(voteResults);
    console.log('success on Json: ' + JSON.stringify(voteResults));
  });
});


///////VOTER PAGE/////////

app.get("/polls/:id", (req, res) => {
  const voterCheck =  knex('decisions')
    .join('voters', 'decisions.id', '=', 'voters.decision_id')
    .join('options', 'decisions.id', '=', 'options.decision_id')
    .select('voter_url')
  .then((row) => {
    let success = false
    // console.log(row);
    row.forEach((row) => {
      if (row.voter_url === req.params.id) {
        success = true
      }
    });
    console.log(success);
    if (success) {
      let urlData = req.params.id;
      console.log(urlData);
      res.status(200).render("vote", {voter_url: urlData});
    } else {
      res.status(404).send('This Poll Link Does Not Exist');
    };
  });
});

app.get('/:id/json', (req, res) => {
  // console.log(req.params.id)
  knex('decisions')
  .join('voters', 'decisions.id', '=', 'voters.decision_id')
  .join('options', 'decisions.id', '=', 'options.decision_id')
  .select('*')
  .where({
    voter_url: req.params.id
  })
  .then (function(voteChoices) {
    // let voteData = {votePage: JSON.stringify(voteChoices)};
    // console.log(voteData);
  console.log('success on Json: ' + JSON.stringify(voteChoices));
  res.json(voteChoices);
  // res.render("index");
  });
});


/////////////POST REQUESTS//////////////////

app.post('/polls', (req, res) => {
  console.log(req.body);
  /////Decision Table///////
  let email_subject = req.body.decision_title;
  let email_text = req.body.message;
  let email_admin = req.body.admin_email;
  let rem_time = req.body.time;
  let text_admin = 'Thank you for using Decision Maker. Your administration and user link are as follows: localhost:8080/polls/result/' + req.body.admin_url /*+ 'voter link: localhost8080:' + req.body.admin_url; */

    //////////////// INSERT INFORMATION INTO TABLES ///////////////////

  knex('decisions')
    .returning('id')
    .insert({
      decision_title: email_subject,
      time: rem_time,
      message: email_text,
      admin_email: email_admin,
      admin_name: req.body.admin_name,
      admin_url: req.body.admin_url
    })
    .then(function([decisionId]) {
      const votersPromises = req.body.votersArray
        .map(voter => knex('voters')
        .returning('id')
        .insert({
          voter_email: voter.voter_email,
          voter_url: voter.voter_url,
          decision_id:
          decisionId
        }));
      const emailsPromises = req.body.optionsArray
        .map(option => knex('options')
          .returning('id')
          .insert({
            title: option.title,
            description: option.description,
            decision_id: decisionId,
            total_rank: 0
          }));
      return Promise.all(votersPromises.concat(emailsPromises))
    })
    // .finally(process.exit);

      // .then(function([[voterId], [optionId]]) {
      //   return knex('polls')
      //   .insert({
      //     voter_id: voterId,
      //     option_id: optionId,
      //     base_rank: 0
      //   })
      /////Also insert into polls table for each and ends here.
    // }).finally(knex.destroy);

  ///VOTER EMAIL///
  req.body.votersArray.forEach(function(email) {
    let text_voter = email_text + ' A poll is available for you at localhost:8080/polls/' + email.voter_url;
    var voterEmail = {
      from: 'Decision Maker <postmaster@sandbox0229991348f842509ff15dab0913c399.mailgun.org>',
      to: email.voter_email,
      subject: email_subject,
      text: text_voter
    }

    mailgun.messages().send(voterEmail, function (error, body) {
      console.log(body);
    });
  });

  // /ADMIN EMAIL///
  var adminEmail = {
      from: 'Decision Maker <postmaster@sandbox0229991348f842509ff15dab0913c399.mailgun.org>',
      to: email_admin,
      subject: email_subject,
      text: text_admin
    }
  mailgun.messages().send(adminEmail, function (error, body) {
    console.log(body);
  });

  res.redirect("/polls/result/" + req.body.admin_url);
});


app.post('/polls/:id', (req, res) => {
  console.log('click works');
    console.log(req.body)
    console.log(req.params.id)
  console.log(req.body.pollObjectArray[0].admin_url)
// decision_id: decisionObject.id,
//           option_id: optionsList[i].id,
//           rank: optionsList.length - i
// include admin url
// title

  // let pollObjectArray = pollObjectArrayInObject.pollObjectArray;

  // admin_url
  req.body.pollObjectArray.map(addRank =>
    knex.from('options')
      .select('*')
      .join('decisions', 'decisions.id', '=', 'options.decision_id')
      .join('voters', 'decisions.id', '=', 'voters.decision_id')
      .where({
        'options.id': addRank.option_id,
        // 'voters.voter_url': req.params.id
      })
      .increment('total_rank', addRank.rank)
      .then((rows) => {
        console.log(rows)
      })
  );

  let admin_text = 'Check now for your new status at: localhost:8080/polls/result/' + req.body.pollObjectArray[0].admin_url
  var adminEmail = {
      from: 'Decision Maker <postmaster@sandbox0229991348f842509ff15dab0913c399.mailgun.org>',
      to: req.body.pollObjectArray[0].admin_email,
      subject: 'Your poll has been updated',
      text: admin_text
    }
  mailgun.messages().send(adminEmail, function (error, body) {
    console.log(body);
  });
  // return rankAdd; 
  res.redirect("/polls/result/" + req.body.pollObjectArray[0].admin_url);
});


let rankArray = [{option_id: 91, rank: 1}, {option_id: 92, rank: 1}]

  rankArray.map(addRank =>
    knex.from('options')
      .select('*')
      .join('decisions', 'decisions.id', '=', 'options.decision_id')
      .join('voters', 'decisions.id', '=', 'voters.decision_id')
      .where('options.id', '=', addRank.option_id)
        // voter_url: req.params.id,
      //   'options.id': addRank.option_id
      // })
      .increment('total_rank', addRank.rank)
    .then((rows) => {
      console.log(rows)
    })
  );
  console.log(rankArray);


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
