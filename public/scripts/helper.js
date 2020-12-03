/* eslint-disable no-undef */
$(document).ready(function () {
  const $btnTop = $("#toTop");

  window.onscroll = function () {
    scrollFunction();
  };

  // When the user scrolls down 20px from the top of the document, show the button
  const scrollFunction = function () {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      $btnTop.addClass("visible");
    } else {
      $btnTop.addClass("hidden").removeClass("visible");
    }
  };

  // When the user clicks on the button, scroll to the top of the document
  const topFunction = function () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  $btnTop.click(function () {
    topFunction();
  });
});
