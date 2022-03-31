/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  const tweetData = [
    {
      user: {
        name: "Newton",
        avatars: "https://i.imgur.com/73hZDYK.png",
        handle: "@SirIsaac",
      },
      content: {
        text: "If I have seen further it is by standing on the shoulders of giants",
      },
      created_at: 1461116232227,
    },
    {
      user: {
        name: "Descartes",
        avatars: "https://i.imgur.com/nlhLi3I.png",
        handle: "@rd",
      },
      content: {
        text: "Je pense , donc je suis",
      },
      created_at: 1461113959088,
    },
  ];

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function (data) {
    const item = $(`<article class="tweet">
    <header>
      <div class="tweets-icon-name">
      <img src=${data.user.avatars} width="50" height="50">
        <p>${escape(data.user.name)}</p>
        <p class="user-handle">${escape(data.user.handle)}</p>
      </div>
      <p class="tweet-text">
        ${escape(data.content.text)}
      </p>
    </header>
    <footer>
      <div class="retweet-section">
        <span class="timeline">${escape(timeago.format(data.created_at))}</span>
        <i class="fa-solid fa-flag fa-2xs icons-tweet"></i>
        <i class="fa-solid fa-retweet fa-2xs icons-tweet"></i>
        <i class="fa-solid fa-heart fa-2xs icons-tweet"></i>
      </div>
    </footer>
  </article>`);
    return item;
  };
  const renderTweets = function (arr) {
    $(".tweet-container").empty();
    for (const item of arr) {
      $(".tweet-container").append(createTweetElement(item));
    }
  };

  $("#tweet-form").on("submit", (evt) => {
    evt.preventDefault();
    $(".error-box").hide();

    const formInput = $("#tweet-text").val();
    console.log(formInput);
    if (!formInput.trim()) {
      $(".error-box").text("Please enter your text");
      $(".error-box").slideDown();
      return;
    }
    if (formInput.length > 140) {
      $(".error-box").text("Tweet is too long.");
      $(".error-box").slideDown();
      return;
    } else {
      const tweet = $(evt.target).serialize();

      $.post("/tweets/", tweet, function (data) {
        $(".counter").val(140);
        $("#tweet-text").val("");
        loadTweets();
      });
    }
  });
  const loadTweets = function () {
    $.get(
      "/tweets",
      (response) => {
        renderTweets(response.reverse());
      },
      "json"
    );
  };
  loadTweets();
});
