/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// hard coded for now
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
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

// Test / driver code (temporary)
const $tweet = createTweetElement(tweetData);
console.log($tweet); // to see what it looks like
const ready = $('#tweets-container').append($tweet);

$(document).ready(function() {
  ready;
});






// first go at it might keep around to if I want to save something
/*$(document).ready(function(tweetData) {
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
        ${data.created_at}
          <div class = "icons">
          <i class="fas fa-flag" ></i>
          <i class="fas fa-retweet" ></i>
          <i class="fas fa-heart" ></i>
          </div>
        </footer>
      </article>`;
    $('#tweets-container').append($markUp);
    return $markUp;
   
  };
  const $tweet = createTweetElement(tweetData);
  $('#tweet-post-container') .append($tweet);
  console.log($tweet);
});*/

