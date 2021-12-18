/*
 * Client-side JS logic
 */


$(document).ready(function() {

  //hides the error on page load
  $(".error").hide();
  
  const renderTweets = function(tweets) {

    // reset text box and tweet container when submit finishsed
    $(".counter").text("140");
    $("#tweet-text").val("");
    $("#tweet-text").focus();
    $('#tweets-container').empty();

    for (let tweet in tweets) {
    // calls createTweetElement for each tweet
      const $Tweet = createTweetElement(tweets[tweet]);
      // takes return value and prepends it to the tweets container so new tweets are at the beginning of feed
      $('#tweets-container').prepend($Tweet);
    }
  };

  // markup for new tweet to bee inserted into tweet container
  const createTweetElement = function(data) {
    const $markUp =
    ` <article class = "article">
        <div class = "tweet-header"> 
          <div class = person>
          <img  class = "face" src= ${data.user.avatars} />
          <br>
          <p class="username">${data.user.name}</p>
          </div>
          <span class="handle">${data.user.handle}</span>
        </div>
        <div class = "tweet-body">
        <p> ${escape(data.content.text)}</p>
      </div>
        <footer class = "footer">
        ${timeago.format(data.created_at)}
          <div class = "icons">
          <i class="fas fa-flag" ></i>
          <i class="fas fa-retweet" ></i>
          <i class="fas fa-heart" ></i>
          </div>
        </footer>
      </article>`
      ;
  
    return $markUp;
   
  };

  // uses ajax call to submit form and prevent page reload
  
  $("form").submit(function(event) {

    event.preventDefault();
    let validTweet = true;
    const data = $(this).serialize();
   
    const chars = $("#tweet-text").val().length;
    if (chars === 0 || data === null) {
      $(".error").text("Your tweet is empty, we want to know what you're humming about!").slideDown().delay(3500).hide(500);
      validTweet = false;
    } else if (chars > 140) {
      $(".error").text("Your tweet exeeds the limit, try and keep the counter above 0").slideDown().delay(3500).hide(500);
      validTweet = false;
    }
   
    console.log("data", data);

    if (validTweet) {
      $.ajax({
        type: "POST",
        url: $("form").attr("action"),
        data:$(this).serialize(),
        success: (data) => {
          console.log('Succesfully posted tweet', data);
        },
      }).then(
        () => {
          loadTweets();
        }
      );

    }
  });
  //use jQuery to make a request to /tweets and receive the array of tweets as JSON.
  const loadTweets = function() {
    $.ajax({
      url: "/tweets/",
      method: "GET",
    }).done(function($Tweet) {
      renderTweets($Tweet);
    });
  };

  // protects from malicious code
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
    
  loadTweets();

});



