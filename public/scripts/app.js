//include require(s) for bootstrap
//

$(() => {

//Sample AJAX call to test the homepage by rendering list of users from test table 'users' in database
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;



// ----- CREATE POLL PAGE ------
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

  //DATA Validation SCRIPTs

    // --- Decision

      //Check if the decision title meets requirements
        //cannot be empty / null
        //HTML -- has to have restricted length (can be controlled with HTML with 255 character text box)

      //Check if the Admin email meets requirements
        //cannot be empty / null
        //HTML -- has to be valid email (can be controlled on HTML side with email type text box)

      //Check if Admin name meets requirements
        //HTML - has to have restricted length (can be controlled with HTML with 255 (or less) character text box)

      //Check if poll time entered meets requirements
        //cannot be empty / null
        //HTML -- can range from 1 to 60 (can be drop down menu - or a spinning counter)

      //Check if optional decision message meets requirments
        //HTML -- has to have restricted length (can be controlled with HTML will 255 character text box)

    // --- Options

      //Check if the option title meets requirements
        //cannot be empty / null
        //HTML -- has to have restricted length (can be controlled with HTML with 255 (or less) character text box)

      //Check if the option optional description meets requirements
        //HTML - has to have restricted length (can be controlled with HTML with 255 (or less) character text box)

    // --- Voters

      //Check if the Voter email meets requirements
        //cannot be empty / null
        //HTML -- has to be valid email (can be controlled on HTML side with email type text box)

      //Check if Voter name meets requirements
        //HTML - has to have restricted length (can be controlled with HTML with 255 (or less) character text box)


  // WHEN ALL Data Validation Passes (after submit poll button is clicked)

    // ---- CREATE / ADD to Decision Object

      //Create Decision Ojbect

      //Add to Decision Object with title

      //Add to Decision Ojbect with admin_email

      //Add to Decision Object with admin_name

      //Add to Decision Object with poll time

      //STRETCH - Add to Decision Object with the image location for the Admin

      //Add to Decision Object with Message (Optional)

      //SERVER - Add Admin URL based on random UNQIUE URL genreator on the Server side

    // ---- CREATE / ADD to Decision.Option Object
      //Create Deicions.Option Object and add to title

      //Add to Decision.Option Object and add to description

      //STRETCH - Add to Decision.Option Object with option image

      //SERVER - Assign decision_id FK on the server side

    // ---- CREATE / ADD to Decision.Voter Object
      //Create Decisions.Voter Object and add voter email

      //Add to Decision.Voter Object and add voter name

      //STRETCH - Add to Decision.Voter Object and add voter image

      //SERVER - Add Voter URL based on random UNIQUE URL generator on the Server side

      //SERVER - Assign decision_id FK on the server side

    // --- CALL AJAX function by PASSING it Decision Object when user hits the SUBMIT button

      //SERVER - Redirects to the vote status poll page



// ----- VOTE POLL PAGE ------
  //User - Interaction OR Page Behaviour Scripts (JQUERY)

    //User is presented with
      // - Decision Admin Email; Decision Admin Name (optional); and Decision Title texts (not editable);
      // - List of other voters for the same poll
      // - By Default Options Appear as Drag and Drop in Table that User Can Move Around to Rank the Options
      // - Submit Vote Button

  //DATA Validation SCRIPTs

    // - There will be no data validation for this page.


  // WHEN SUBMIT BUTTON is CLICKED

    // ---- Ranking for vote options gets sent to server
    // ---- Server gets the decision_id and option_id using the URL string

// ----- VOTE STATUS PAGE


  //User is presented with
    // - Decision Admin Email; Decision Admin Name (optional); and Decision Title texts (not editable);
    // - List of Participants for the Poll

  // There is Auto Referesh Functionality Bult-In for Update every 5 seconds?

  // Page will display how many minutes / seconds are left for the poll to end.
  // If the poll has ended, the page will display that the poll has ended
  // This will be a Single Page Refresh Page that Will Make AJAX calls to the server every 5 seconds to update the number of Votes in the Poll


});
