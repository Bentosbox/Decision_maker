"use strict";
require('dotenv').config();

const ENV         = process.env.ENV || "development";
const knexConfig  = require("../knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const knexLogger  = require('knex-logger');


// function searchDatabase() {
  knex('decisions')
    .join('options', 'decisions.id', '=', 'options.decision_id')
    .join('voters', 'decisions.id', '=', 'voters.decision_id')
    .select()
    // .where()
    .then(function(result) {
    // for (var i = 0; i < result.length; i++) {
    //   let currentPoll = result[i];
      console.log(result)
      // console.log(result[i].input);
    // }
  }).finally(knex.destroy);
// }

// console.log(searchDatabase());
