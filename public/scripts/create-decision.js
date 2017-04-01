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
  //do { // STRETCH -- implement to check if URL already exists in database
    var URL = "";
    for (var i = 0; i < 20; i++ ) {
      URL += charset.charAt(Math.floor(Math.random() * charset.length));
   }
//  } while (checkURLTable(URL)) //Ask Ben to create a DB server side function to do a select query based on URL sent to check if it already exists
  return URL;
}

//Define makeOptionsArray() here
function makeOptionsArray() {
  var optionsArray = [];
  var numberOfOptions = document.getElementsByClassName('option-title').length;
  var optionTitleElement = document.getElementsByClassName('option-title');
  var optionDescriptionElement = document.getElementsByClassName('option-description');
  for (var i = 0; i < numberOfOptions; i++) {
    var optionObject = {
      title:        optionTitleElement[i].value,
      description:  optionDescriptionElement[i].value
    };
    optionsArray.push(optionObject);
  }
  return optionsArray;
}

//Define makeVotersArray() here
function makeVotersArray() {
  var votersArray = [];
  var numberOfVoters = document.getElementsByClassName('voter-email').length;
  var voterEmailElement = document.getElementsByClassName('voter-email');
  var voterNameElement = document.getElementsByClassName('voter-name');
  for (var i = 0; i < numberOfVoters; i++) {
    var voterObject = {
      voter_email:  voterEmailElement[i].value,
      voter_name:   voterNameElement[i].value,
      voter_url:    makeURL()
    };
    votersArray.push(voterObject);
  }
  return votersArray;
}

//Define isFieldEmpty function here
function isFieldEmpty(elementArray, cb) {
  for (var i = 0; i < elementArray.length; i++)  {
    if (elementArray[i].value === '' || elementArray[i].value === null) {
      cb(i);
      return true;
    }
  }
  return false;
}

$(() => {

//CREATE DECISION FORM - ON SUBMIT Function
  $('.create-decision-form').on('submit', function (event) { //Ask Ellen to change the class name to create-decision-form
    event.preventDefault();
    $('.flash-message').text('');
    //DATA Validation SCRIPT
      if ($('.decision-admin-email').val() === '' || $('.decision-admin-email').val() === null) {
        $('.decision-email-validation').text('Your email cannot be empty.');
      } else if ($('.decision-title').val() === '' || $('.decision-title').val() === null) {
        $('.decision-title-validation').text('Decision title cannot be empty.');
      } else if ($('.decision-time').val() === '' || $('.decision-time').val() === null) {
        $('.decision-time-validation').text('Poll period cannot be empty');
      } else if (isFieldEmpty(document.getElementsByClassName('option-title'), (i) => {
        document.getElementsByClassName('option-title-validation')[i].innerText = 'Option title cannot be empty';
      })) { return;
      } else if (isFieldEmpty(document.getElementsByClassName('voter-email'), (i) => {
        document.getElementsByClassName('voter-email-validation')[i].innerText = 'Voter email cannot be empty';
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

        console.log(decisionObject);

        //STRETCH - Add to Decision Object with the image location for the Admin

        // --- CALL AJAX function by PASSING it Decision Object when user hits the SUBMIT button (AJAX is Optional SO SERVER CAN TAKE DATA DIRECTLY FROM HTML file)
        $.ajax({
          url: '/polls',
          method: 'POST',
          data: decisionObject // sending decisionObjec to server
        }).done(function() {
          console.log('ajax call for posting to /polls is a success'); // check if any code needs to be executed when ajax post is done
        }
        ).fail(function (err) {
          console.log('failed');
        });
        // ------ NEEDS TO BE WORKED ON
        // - Sends email to admin with URL link
        // - Sends email to voters with URL link
        // - Quesiton: How will users access our pages via email since it is running on localhost?
      }
    });


});
