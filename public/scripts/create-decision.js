  //include require(s) for bootstrap

//User - Interaction OR Page Behaviour Scripts (JQUERY)

      //User is presented with
        // - Decision Admin Email; Decision Admin Name (optional); and Decision Title text boxes;
        // - By Default Two Options Boxes
        // - Add Option Button
        // - By Default One Voter Box
        // - Add Voter Button
        // - By Default Message Box (optional - before the submit the poll buttton)
        // - By Default Submit Poll Button

      //When user clicks add option button (MAX 6 OPTIONS)

        // - Option title and option description (optional) is created and added on the page

        // - If there are at least 3 option text boxes; then option Delete icon appears on the side for each option;
            // - If not, no delete icons appear on the side

        // - Add Option Button will animate down everytime an option is created

        // - (Note: User can edit any option by putting focus back on option and editing the option)


      //When user clicks add voter button (MAX 10 VOTERS)

        // - Voter email and voter name (optional) is created and added on the page

        // - If there are at least 2 voter text boxes; then option Delete icon appears on the side for each voter;
            // - If not, no delete icons appear on the side

        // - Add Voter Button will animate down everytime a voter is created

        // - (Note: User can edit any voter by putting focus back on voter text boxes and editing the option)

      //User validation occurs when user clicks Submit Poll Button
        // - If user validation fails; user is presented with messages (look at example for tweeter app on how user messages are presented)
        // - If user validation passes - call the AJAX POST function


//Define random text generator function here for URL's
function makeURL() {
  var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
  //do {
    var URL = "";
    //for (var i = 0; i < 20; i++ ) {
      URL += charset.charAt(Math.floor(Math.random() * charset.length));
   // }
//  } while (checkURLTable(URL)) //Ask Ben to create a DB server side function to do a select query based on URL sent to check if it already exists
  return URL;
}

//Define makeOptionsArray() here
function makeOptionsArray() {
  var optionsArray = [];
  var numberOfOptions = document.getElementsbyClassName('option-title').length;
  var optionTitleElement = document.getElementsbyClassName('option-title');
  var optionDescriptionElement = document.getElementsbyClassName('option-description');
  for (var i = 0; i < numberOfOptions; i++) {
    var optionObject = {
      title:        optionTitleElement[i].val();
      description:  optionDescriptionElement[i].val();
    };
    optionsArray.push(optionObject);
  }
  return optionsArray;
}

//Define makeVotersArray() here
function makeVotersArray() {
  var votersArray = [];
  var numberOfVoters = document.getElementsbyClassName('voter-email').length;
  var voterEmailElement = document.getElementsbyClassName('voter-email');
  var voterNameElement = document.getElementsbyClassName('voter-name');
  for (var i = 0; i < numberOfVoters.length; i++) {
    var voterObject = {
      voter_email:  voterEmailElement[i].val();
      voter_name:   voterNameElement[i].val();
      voter_url:    makeURL();
    };
    votersArray.push(voterObject);
  }
  return votersArray;
}

//Define isFieldEmpty function here
function isFieldEmpty(elementArray, cb) {
  for (var i = 0; i < elementArray.length; i++)  {
    if (elementArray[i].val() === '' || elementArray[i].val() === null) {
      cb(i);
      return true;
    }
  }
  return false;
}

$(() => {

//CREATE DECISON FORM - ON ADD OPTION Button Click Function

  $('.add-option-button').on('.click', function (event) {
    //Speak to Ellen to make CSS classess consistent. All Options need a container class that can be used for appending.
    //Needs to have logic to restrict to a max of 6 options
  });

//CREATE DECISION FORM - ON ADD VOTER Button Click Function

  $('.add-voter-button').on('.click', function (event) {
    //Speak to Ellen to make CSS classess consistent. All Voters need a container class that can be used for appending.
    //Needs to have logic to restrict to a max of 10 voters
  });

//CREATE DECISON FORM - ON DELETE OPTION Button Click Function

  $('.delete-option-button').on('.click', function (event) {
    //Speak to Ellen to make CSS classess consistent. All Options need a container class that can be used for appending.
    //Need logic built in so delete button appears only if there are more than 2 options on the page
  });

//CREATE DECISON FORM - ON DELETE VOTER Button Click Function

  $('.delete-voter-button').on('.click', function (event) {
    //Speak to Ellen to make CSS classess consistent. All Voters need a container class that can be used for appending.
    //Needs logic built in so delete voter appears only if there is more than 1 voter on the page
  });

//CREATE DECISION FORM - ON SUBMIT Function
  $('.create-decision-form').on('submit', function (event) { //Ask Ellen to change the class name to create-decision-form
    event.preventDefault();
    //DATA Validation SCRIPT
      if ($('.decision-title') === '' || $('.decision-title') === null) {
        $('.decision-title-validation').innerText = 'Decision title cannot be empty.'; // Ask Ellen to add decision-title-validation class
      } else if ($('.decision-email') === '' || $('.decision-email') === null) {
        $('.decision-email-validation').innerText = 'Decision email cannot be empty.'; // Ask Ellen to add decision-email-validation class
      } else if (isFieldEmpty(document.getElementsbyClassName('option-title'), (i) => {
        document.getElementsbyClassName('option-title-validation')[i].innerText = 'Option title cannot be empty';
      })) { return;
      } else if (isFieldEmpty(document.getElementsbyClassName('voter-title'), (i) => {
        document.getElementsbyClassName('voter-email-validation')[i].innerText = 'Voter email cannot be empty';
      })) { return;
      } else {
        // ---- CREATE / ADD to Decision Object
        //Create and Add to Decision Ojbect with Options and Voters Arrays
        var decisionObject = {
          admin_email:    $('.decision-admin-email').val(),
          admin_name:     $('.decision-admin-name').val(),
          admin_url:      makeURL(),
          title:          $('.decision-title').val(),
          message:        $('.decision-message').val(),
          time:           $('.decision-time').val(), // Will depened on input type
          optionsArray:   makeOptionsArray(),
          votersArray:    makeVotersArray()
        };

        //STRETCH - Add to Decision Object with the image location for the Admin

        // --- CALL AJAX function by PASSING it Decision Object when user hits the SUBMIT button (AJAX is Optional SO SERVER CAN TAKE DATA DIRECTLY FROM HTML file)
        $.ajax({
          url: '/polls',
          method: 'POST',
          data: decisionObject // sending decisionObjec to server
        }).done(
          console.log('ajax call for posting to /polls is a success'); // check if any code needs to be executed when ajax post is done
        }).fail(function (err) {
          console.log('failed');
        });
        // ------ NEEDS TO BE WORKED ON
        // - Sends email to admin with URL link
        // - Sends email to voters with URL link
        // - Quesiton: How will users access our pages via email since it is running on localhost?
      }
    });


});
