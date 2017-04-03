// ----- VOTE POLL PAGE ------
  //User - Interaction OR Page Behaviour Scripts (JQUERY)

    //User is presented with


  // $( () => {

  //   //As soon as the page is loaded - the HTML UI that gets created on the page will be sortable
  //   console.log("This is from poll-vote" + voteChoices)

  //   $( "#sortable" ).sortable();
  //   $( "#sortable" ).disableSelection();


  //   //SERVER -- Tell Ben that we will need a Decision Object with Decision Values + Option Values

  //   //var decisionObject = getDecisionObject('voterURL'); //Server side function that needs to return the Decision Object based on URL provided
  //   // Object could be received using a res.send method as well - Talk to Ben

  //   //DUMMY OBJECT FOR TESTING
  //   var decisionObject = {
  //     id: '1',
  //     admin_email: 'vinaybalaji@gmail.com',
  //     admin_name: 'Vinay',
  //     admin_url: '',
  //     title: 'Lunch',
  //     message: 'What should I eat for lunch?',
  //     time: 1491081939, // this is a holder dummy value which is poll created time (in seconds) + poll length time (in seconds). Tell Ben about this.
  //     optionsArray:   [{
  //       id: 1,
  //       title: 'Subway',
  //       description: 'Meatball Sub'
  //     },
  //     {
  //       id: 2,
  //       title: 'Sushi',
  //       description: 'Bento Box'
  //     },
  //     {
  //       id: 3,
  //       title: 'Burger',
  //       description: 'Chicken Burger'
  //     }],
  //     voter: {   // Tell Ben that return decisionObject for Voter URL will only include information for that specific voter
  //       voter_id: 1,
  //       voter_email: 'neha@gmail.com',
  //       voter_name: 'Neha',
  //       voter_url: ''
  //     }
  //   };



  //   //Page needs to render the following depending on the URL
  //     // - Decision Admin Email; Decision Admin Name (optional); and Decision Title texts (not editable);
  //     // - List of other voters for the same poll
  //     // - By Default Options Appear as Drag and Drop in Table that User Can Move Around to Rank the Options (##### This needs to be implemented ######)
  //     // - Submit Vote Button

  //   $('.decision-admin-name-display').text(decisionObject.admin_name);
  //   $('.decision-admin-email-display').text(decisionObject.admin_email);
  //   $('.decision-title-display').text(decisionObject.title);
  //   $('.decision-message-display').text(decisionObject.message);

  //   //Need to call a function from Ellen's JS files that will pass this value (which is current time (in seconds) - poll created time (in seconds) + poll length time (in seconds))
  //       // var timeLifeInSeconds = Math.round(Date.now()/1000) - decisionObject.time;



  //   //Render the relevant information from the decisionObject object in the browser (check if Ellen can help)


  //   var optionWrapper = $('#sortable');

  //   for (var i = 0; i < decisionObject.optionsArray.length; i++) {
  //     optionWrapper.append('<li class="list-group-item option-title-display" id="' + decisionObject.optionsArray[i].id + '"><span class="badge option-description-display">' + decisionObject.optionsArray[i].description + '</span>' + decisionObject.optionsArray[i].title + '</li></div>');
  //   }


  //   //DATA Validation SCRIPTs
  //     // - There will be no data validation for this page.
  //   // WHEN SUBMIT BUTTON is CLICKED

  //   $('.submit-vote-button').on('click', function (event) {

  //     event.preventDefault();

  //     //Create Poll Objects based on how many options there are for this decision
  //     var pollObjectArray = [];
  //     var optionsList = document.getElementsByClassName('option-title-display');

  //     for (var i = 0; i < optionsList.length; i++) {
  //       var pollObject = {
  //         decision_id: decisionObject.id,
  //         option_id: optionsList[i].id,
  //         rank: optionsList.length - i
  //       };
  //       pollObjectArray.push(pollObject);
  //     }

  //     //Console logging the poll object for testing
  //     console.log(pollObjectArray);

  //     //Send pollObjectArray to SERVER --- Discuss with Ben

  //     $.ajax({
  //       url: '/polls/' + voter_url,
  //       method: 'POST',
  //       data: pollObjectArray // sending pollObjectArray to SERVER
  //     }).done(
  //       console.log('ajax call for posting to /polls/' + voter_url + ' is a success'); // check if any code needs to be executed when ajax post is done
  //     }).fail(function (err) {
  //       console.log('failed');
  //     });


  //     // var optionsList = document.getElementsByClassName('option-title-display');
  //     // for (var i = 0; i < optionsList.length; i++) {
  //     //   console.log(optionsList[i].innerText); // can render the option_title and option description_text using text
  //     //   console.log(optionsList[i].id); // can get option_id value by setting the css id as the option_id value
  //     //   optionsList[i].innerText = 'Sample' + i; // this can set the value of Span tag
  //     // }
  //   });

  //     // ---- Ranking for vote options gets sent to server (#######Need to implement the Borda Count Method#######)
  //     // ---- Server gets the decision_id and option_id using the URL string
  //     // ---- Server redirects if the Voter URL is accessed again to the Admin URL
  // });

  $( () => {


    $.ajax({
      method: 'GET',
      url: '/' + voterURL + '/json'
    }).done(function (voteChoices) {

      //Code to get the time remaining clock to work

          function getTimeRemaining(endtime) {
            var t = Date.parse(endtime) - Date.parse(new Date());
            var seconds = Math.floor((t / 1000) % 60);
            var minutes = Math.floor((t / 1000 / 60) % 60);
            var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
            var days = Math.floor(t / (1000 * 60 * 60 * 24));
            return {
              'total': t,
              'days': days,
              'hours': hours,
              'minutes': minutes,
              'seconds': seconds
            };
          }

          function initializeClock(id, endtime) {
            var clock = document.getElementById(id);
            var daysSpan = clock.querySelector('.days');
            var hoursSpan = clock.querySelector('.hours');
            var minutesSpan = clock.querySelector('.minutes');
            var secondsSpan = clock.querySelector('.seconds');

            function updateClock() {
              var t = getTimeRemaining(endtime);

              daysSpan.innerHTML = t.days;
              hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
              minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
              secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

              if (t.total <= 0) {
                clearInterval(timeinterval);
              }
            }

            updateClock();
            var timeinterval = setInterval(updateClock, 1000);
          }

      //Code to render the time remaining clock ends here
      var voteArray = [];
      console.log('Connection to server via ajax Get reuqest was successful');
      for (var i=0; i<voteChoices.length; i++) {
        console.log(voteChoices[i]);
        voteArray.push(voteChoices[i]);
        }

      console.log('voteArray is: ' + voteArray);


      $( "#sortable" ).sortable();
      $( "#sortable" ).disableSelection();

      var decisionObject = voteArray[0];

      $('.decision-admin-name-display').text(decisionObject.admin_name);
      $('.decision-admin-email-display').text(decisionObject.admin_email);
      $('.decision-title-display').text(decisionObject.decision_title);
      $('.decision-message-display').text(decisionObject.message);


      //passing the time remaining value to the clock being rendered on the page
      var endtime = decisionObject.time - Math.round(Date.now()/60000);
      var deadline = new Date(Date.parse(new Date()) + endtime * 60 * 1000);
      initializeClock('clockdiv', deadline);

        //Need to call a function from Ellen's JS files that will pass this value (which is current time (in seconds) - poll created time (in seconds) + poll length time (in seconds))
            // var timeLifeInSeconds = Math.round(Date.now()/1000) - decisionObject.time;

        //Render the relevant information from the decisionObject object in the browser (check if Ellen can help)

        var optionWrapper = $('#sortable');

        for (var i = 0; i < voteArray.length; i++) {
          optionWrapper.append('<li class="list-group-item option-title-display" id="' + voteArray[i].id + '"><span class="badge option-description-display">' + voteArray[i].description + '</span>' + voteArray[i].title + '</li></div>');
        }

        $('.submit-vote-button').on('click', function (event) {

          event.preventDefault();

          //Create Poll Objects based on how many options there are for this decision
          var pollObjectArray = [];
          var optionsList = document.getElementsByClassName('option-title-display');

          for (var i = 0; i < optionsList.length; i++) {
            var pollObject = {
              decision_id: decisionObject.decision_id,
              option_id: Number(optionsList[i].id),
              rank: optionsList.length - i,
              admin_url: decisionObject.admin_url,
              admin_email: decisionObject.admin_email
            };
            pollObjectArray.push(pollObject);
          }

          //Send pollObjectArray to SERVER --- Discuss with Ben

          var pollObjectArrayInObject = {
            pollObjectArray: pollObjectArray
          }
          console.log(pollObjectArrayInObject);

          $.ajax({
            url: '/polls/' + voterURL,
            method: 'POST',
            data: pollObjectArrayInObject // sending pollObjectArray to SERVER
          }).done(function() {
            console.log('ajax call for posting to /polls/' + voterURL + ' is a success'); // check if any code needs to be executed when ajax post is done
            window.location.href="/polls/result/" + decisionObject.admin_url;
          }).fail(function (err) {
            console.log('failed');
          });


          // var optionsList = document.getElementsByClassName('option-title-display');
          // for (var i = 0; i < optionsList.length; i++) {
          //   console.log(optionsList[i].innerText); // can render the option_title and option description_text using text
          //   console.log(optionsList[i].id); // can get option_id value by setting the css id as the option_id value
          //   optionsList[i].innerText = 'Sample' + i; // this can set the value of Span tag
          // }

        });


    });

  });
