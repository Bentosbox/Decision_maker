$(document).ready(function() {

  // add/remove new options
  const maxOption = 6;
  const optWrapper = $(".addition-option");
  const add_opt_button = $(".add-option-button");

  let x = 2;
  $(add_opt_button).click(function(o){
    o.preventDefault();
    if(x < maxOption){
      x++;
      $(optWrapper).append('<div class="addition-option"><div class="form-group"><label class="col-lg-2 control-label" for="inputDefault">Option</label><div class="col-lg-10"><input type="text" class="form-control option-title" placeholder= "Enter your option here"><div><span class="option-title-validation flash-message"></span></div><input type="text" class="form-control option-description" placeholder= "description(optional)"><button type="button" class="btn btn-link delete-option-button">Remove</button></div></div></div>');
    }
  });

  $(optWrapper).on("click", ".delete-option-button", function(o){
    o.preventDefault(); $(this).parent('div').parent('div').parent('div').remove(); x--;
  });

  // add/remove new voter
  const maxVoter = 10;
  const voterWrapper = $(".addition-voter");
  const add_voter_button = $(".add-voter-button");

  let y = 2;
  $(add_voter_button).click(function(v){
    v.preventDefault();
    if(y < maxVoter){
      y++;
      $(voterWrapper).append('<div class="addition-voter"><div class="form-group"><label class="col-lg-2 control-label" for="voterEmail">Voter</label><div class="col-lg-10"><input type="email" class="form-control voter-email" placeholder= "Enter voter email"><div><span class="voter-email-validation flash-message"></span><input type="text" class="form-control voter-name" placeholder= "Enter voter\'s name (optional)"></div><button type="button" class="btn btn-link delete-voter-button">Remove</button></div></div></div>');
    }
  });

  $(voterWrapper).on("click", ".delete-voter-button", function(v){
    v.preventDefault(); $(this).parent('div').parent('div').parent('div').remove(); y--;
  });

// timepicki
  $('#timepicker').timepicki();







});
