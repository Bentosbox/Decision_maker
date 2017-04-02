// ----- VOTE STATUS PAGE


  //User is presented with
    // - Decision Admin Email; Decision Admin Name (optional); and Decision Title texts (not editable);
    // - List of Participants for the Poll

  // There is Auto Referesh Functionality Bult-In for Update every 5 seconds?

  // Page will display how many minutes / seconds are left for the poll to end.
  // If the poll has ended, the page will display that the poll has ended
  // This will be a Single Page Refresh Page that Will Make AJAX calls to the server every 5 seconds to update the number of Votes in the Poll
function determineProgressBarRank (inputArray, value) {
  rank = inputArray.length;
  for (var i=0; i < inputArray.length; i++) {
    if (inputArray[i] < value) {
      rank--;
    }
  }
  console.log(inputArray, value, rank)
  return rank;
}


$(() => {

  //DUMMY OBJECT FOR TESTING
    var decisionObject = {
      id: '1',
      admin_email: 'vinaybalaji@gmail.com',
      admin_name: 'Vinay',
      admin_url: '',
      title: 'Lunch',
      message: 'What should I eat for lunch?',
      time: 1491081939, // this is a holder dummy value which is poll created time (in seconds) + poll length time (in seconds). Tell Ben about this.
      optionsArray:   [{
        id: 1,
        title: 'Subway',
        description: 'Meatball Sub',
        total_rank: 12
      },
      {
        id: 2,
        title: 'Sushi',
        description: 'Bento Box',
        total_rank: 7
      },
      {
        id: 3,
        title: 'Burger',
        description: 'Chicken Burger',
        total_rank: 24
      }],
      votersArray: [{   // Tell Ben that return decisionObject for Voter URL will only include information for that specific voter
        voter_id: 1,
        voter_email: 'neha@gmail.com',
        voter_name: 'Neha',
        voter_url: ''
      },
      {
        voter_id: 2,
        voter_email: 'abc@gmail.com',
        voter_name: 'ABC',
        voter_url: ''
      }]
    };

    var numberofVoters = decisionObject.votersArray.length;
    var numberOfOptions = decisionObject.optionsArray.length;
    var statusBarIncrement = 100 / numberOfOptions;

    $('.decision-admin-name-display').text(decisionObject.admin_name);
    $('.decision-admin-email-display').text(decisionObject.admin_email);
    $('.decision-title-display').text(decisionObject.title);
    $('.decision-message-display').text(decisionObject.message);

    $('.voter-count').text(numberofVoters);

    var resultWrapper = $('#resultWrapper');
    var rankValuesArray = [];

    for (var i=0; i < decisionObject.optionsArray.length; i++) {
      rankValuesArray.push(decisionObject.optionsArray[i].total_rank);
    }



    for (var i=0; i < decisionObject.optionsArray.length; i++) {

      var divClass = '"progress-bar progress-bar-info"';

      if ((determineProgressBarRank(rankValuesArray, decisionObject.optionsArray[i].total_rank)) === numberOfOptions) {
        divClass = '"progress-bar progress-bar-success"';
      }

      resultWrapper.append('<h3 class="option-title-display" id="' + decisionObject.optionsArray[i].id + '">' + decisionObject.optionsArray[i].title + '</h3><div class="progress progress-striped" style="margin-bottom: 9px;"><div class=' + divClass + ' style="width: ' + Math.round(determineProgressBarRank(rankValuesArray, decisionObject.optionsArray[i].total_rank)*statusBarIncrement) + '%"></div></div>');

    }

  //this is the code to make the ajax call with update poll status every 1 second
  setInterval(() => {
    console.log('Refreshed');
  }, 1000);
});

