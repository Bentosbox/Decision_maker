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
      $(optWrapper).append('<div class="addition-option"><div class="form-group"><label class="col-lg-2 control-label" for="inputDefault">Option</label><div class="col-lg-10"><input type="text" class="form-control option-title" placeholder= "Enter your option here"><input type="text" class="form-control option-description" placeholder= "description(optional)"><button type="button" class="btn btn-link delete-option-button">Remove</button></div></div></div>');
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
      $(voterWrapper).append('<div class="addition-voter"><div class="form-group"><label class="col-lg-2 control-label" for="voterEmail">Voter</label><div class="col-lg-10"><input type="text" class="form-control add-voter-button" placeholder= "Enter voter email"><button type="button" class="btn btn-link delete-voter-button">Remove</button></div></div></div>');
    }
  });

  $(voterWrapper).on("click", ".delete-voter-button", function(v){
    v.preventDefault(); $(this).parent('div').parent('div').parent('div').remove(); y--;
  });


  // time picker function

  // const options = {
    // now: "12:35", //hh:mm 24 hour format only, defaults to current time
  //   twentyFour: false,  //Display 24 hour format, defaults to false
  //   upArrow: 'wickedpicker__controls__control-up',  //The up arrow class selector to use, for custom CSS
  //   downArrow: 'wickedpicker__controls__control-down', //The down arrow class selector to use, for custom CSS
  //   close: 'wickedpicker__close', //The close class selector to use, for custom CSS
  //   hoverState: 'hover-state', //The hover state class to use, for custom CSS
  //   title: 'Timepicker', //The Wickedpicker's title,
  //   showSeconds: false, //Whether or not to show seconds,
  //   secondsInterval: 1, //Change interval for seconds, defaults to 1,
  //   minutesInterval: 1, //Change interval for minutes, defaults to 1
  //   beforeShow: null, //A function to be called before the Wickedpicker is shown
  //   afterShow: null, //A function to be called after the Wickedpicker is closed/hidden
  //   show: null, //A function to be called when the Wickedpicker is shown
  //   clearable: false, //Make the picker's input clearable (has clickable "x")
  // };
  // $('.timepicker').wickedpicker(options);
  // $('.decision-time').wickedpicker();


  $('#datetimepicker').datetimepicker({
    format: 'dd/MM/yyyy hh:mm:ss',
    language: 'pt-BR'
  });


});
