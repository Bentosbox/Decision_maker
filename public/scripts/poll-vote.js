// ----- VOTE POLL PAGE ------
  //User - Interaction OR Page Behaviour Scripts (JQUERY)

    //User is presented with


  $( () => {

    //As soon as the page is loaded - the HTML UI that gets created on the page will be sortable
    $( "#sortable" ).sortable();
    $( "#sortable" ).disableSelection();

    //Page needs to render the following depending on the URL
      // - Decision Admin Email; Decision Admin Name (optional); and Decision Title texts (not editable);
      // - List of other voters for the same poll
      // - By Default Options Appear as Drag and Drop in Table that User Can Move Around to Rank the Options (##### This needs to be implemented ######)
      // - Submit Vote Button

      //SERVER -- Tell Ben that we will need a Decision Object with Decision Values + Option Values

    //var decisionObject = getDecisionObject('voterURL'); //Server side function that needs to return the Decision Object based on URL provided
    // Object could be received using a res.send method as well - Talk to Ben

    //DUMMY OBJECT
    var decisionObject = {
      id: '1',
      admin_email: 'vinaybalaji@gmail.com',
      admin_name: 'Vinay',
      admin_url: '',
      title: 'Lunch',
      message: 'What should I eat for lunch?',
      time: '20 minutes left',
      optionsArray:   [{
        id: 1,
        title: 'Subway',
        description: 'Meatball Sub'
      },
      {
        id: 2,
        title: 'Sushi',
        description: 'Bento Box'
      },
      {
        id: 3,
        title: 'Burger',
        description: 'Chicken Burger'
      }],
      voter: {   // Tell Ben that return decisionObject for Voter URL will only include information for that specific voter
        voter_id: 1,
        voter_email: 'neha@gmail.com',
        voter_name: 'Neha',
        voter_url: ''
      }
    };


    //Render the relevant information from the decisionObject object in the browser (check if Ellen can help)
    var optionWrapper = $('#sortable');

    for (var i = 0; i < decisionObject.optionsArray.length; i++) {
      optionWrapper.append('<li class="ui-state-default"><span class="option-title-display" id ="' + decisionObject.optionsArray[i].id + '">' + decisionObject.optionsArray[i].title + '</span></li>');
    }


    //DATA Validation SCRIPTs
      // - There will be no data validation for this page.
    // WHEN SUBMIT BUTTON is CLICKED

    $('.submit-vote-button').on('click', function (event) {

      event.preventDefault();

      //Create Poll Objects based on how many options there are for this decision
      var pollObjectArray = [];
      var optionsList = document.getElementsByClassName('option-title-display');

      for (var i = 0; i < optionsList.length; i++) {
        var pollObject = {
          voter_id: decisionObject.voter.voter_id,
          option_id: optionsList[i].id,
          base_rank: optionsList.length - i
        };
        pollObjectArray.push(pollObject);
      }

      //Console logging the poll object for testing
      console.log(pollObjectArray);

      //Send pollObjectArray to SERVER --- Discuss with Ben

      // $.ajax({
      //   url: '/polls/' + voter_url,
      //   method: 'POST',
      //   data: pollObjectArray // sending pollObjectArray to SERVER
      // }).done(
      //   console.log('ajax call for posting to /polls/' + voter_url + ' is a success'); // check if any code needs to be executed when ajax post is done
      // }).fail(function (err) {
      //   console.log('failed');
      // });


      // var optionsList = document.getElementsByClassName('option-title-display');
      // for (var i = 0; i < optionsList.length; i++) {
      //   console.log(optionsList[i].innerText); // can render the option_title and option description_text using text
      //   console.log(optionsList[i].id); // can get option_id value by setting the css id as the option_id value
      //   optionsList[i].innerText = 'Sample' + i; // this can set the value of Span tag
      // }
    });

      // ---- Ranking for vote options gets sent to server (#######Need to implement the Borda Count Method#######)
      // ---- Server gets the decision_id and option_id using the URL string
      // ---- Server redirects if the Voter URL is accessed again to the Admin URL
  });


