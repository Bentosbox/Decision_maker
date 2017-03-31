$(document).ready(function() {
  const maxOption = 6;
  const optWrapper = $(".addition-option");
  const add_opt_button = $(".btn-add-option");

  let x = 2;
  $(add_opt_button).click(function(o){
    o.preventDefault();
    if(x < maxOption){
      x++;
      $(optWrapper).append('<div class="addition-option"><div class="form-group"><label class="col-lg-2 control-label" for="inputDefault"></label><div class="col-lg-10"><input type="text" class="form-control" placeholder= "Enter your option here"><input type="text" class="form-control" placeholder= "description(optional)"><button type="button" class="btn btn-warning btn-delete">Delete</button></div></div></div>');
    }
  });

  $(optWrapper).on("click", ".btn-delete", function(o){
    o.preventDefault(); $(this).parent('div').remove(); x--;
  });

  const maxVoter = 10;
  const voterWrapper = $(".addition-voter");
  const add_voter_button = $(".btn-add-voter");

  let y = 2;
  $(add_voter_button).click(function(v){
    v.preventDefault();
    if(y < maxVoter){
      y++;
      $(voterWrapper).append('<div class="addition-voter"><div class="form-group"><label class="col-lg-2 control-label" for="voterEmail"></label><div class="col-lg-10"><input type="text" class="form-control" placeholder= "Enter voter email"><button type="button" class="btn tn btn-warning btn-delete">Delete</button></div></div></div>');
    }
  });

  $(voterWrapper).on("click", ".btn-delete", function(v){
    v.preventDefault(); $(this).parent('div').remove(); y--;
  });


});
