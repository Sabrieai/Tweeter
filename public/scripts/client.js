/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//const TimeAgo = require('timeago.js');
//const timeAgo = new TimeAgo('en-US');
// hard coded for now



// eslint-disable-next-line no-undef
$(document).ready(function() {
  ///////////////////////////// DATATBASES FOR TESTING //////////////////////////
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },

    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  ////////////////////////////// MY CODE ////////////////////////////////////////

  const renderTweets = function(tweets) {
    // loops through tweets (for in because its an object)
    for (let tweet in tweets) {
    // calls createTweetElement for each tweet
      const $Tweet = createTweetElement(tweets[tweet]);
      // takes return value and appends it to the tweets container
      $('#tweets-container').append($Tweet);
      console.log($Tweet);
    }
  };

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
        <p> ${data.content.text}</p>
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
  renderTweets(data);

  // uses ajax call to submit form and prevent page reload
  // console.log to make sure we are recieving a serialized version
  //still posts when it is just "     " though
  
  $("form").submit(function(event) {
    // this doesnt work for spaces
    //got it to work for spaces
    event.preventDefault();
    let validTweet = true;
    const data = $(this).serialize();
   
    const chars = $("#tweet-text").val().length;
    if (chars === 0 || data === null) {
      alert("Your tweet is empty, show us what you've got!");
      alert("Hello! I am an alert box!");
      validTweet = false;
    } else if (chars > 140) {
      alert("Your tweet exeeds the limit, try and keep the counter above 0");
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
      });
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
    
  loadTweets();
  
});

////////////////////////////// TEST CODE ////////////////////////////////////////

//const $tweet = createTweetElement(tweetData);
//console.log($tweet); // to see what it looks like
//const ready = $('#tweets-container').append($tweet);

//$(document).ready(function() {
// $('#tweets-container').append($tweet);
//});

//const check = renderTweets(data);



