$(document).ready(function () {
  let maxLength = 140;
  $("#tweet-text").on("keyup", function () {
    const textLen = maxLength - $(this).val().length;
    $(".counter").text(textLen);
    if (textLen < 0) {
      $(".counter").css("color", "red");
    }
  });
});
