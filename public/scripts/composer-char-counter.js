
const counter = function() {
  const chars = $("#tweet-text").val().length;
  //changing the counter to respond to tweet length
  $(".counter").text(140 - chars);

  if (chars > 140) {
    //adds red colour once they passed 140 limit
    $(".counter").addClass("red");
  } else {
    // removes red colour once they get their tweet back under 140
    $(".counter").removeClass("red");
  }
}

$(document).ready(function() {
  $(".new-tweet").on('input', counter);
});