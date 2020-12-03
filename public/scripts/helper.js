/* eslint-disable no-undef */
$(document).ready(function() {
  const $btnTop = $("#toTop");

  window.onscroll = function() {
    scrollFunction();
  };

  // When the user scrolls down 20px from the top of the document, show the button
  const scrollFunction = function() {
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
  const topFunction = function() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  $btnTop.click(function() {
    topFunction();
  });

  // popup function
//   const $editBoard = $("#edit-board-btn");
//   const popUp = function() {
//     $("#blur").toggleClass("active");
//     $("#popup").toggleClass("active");
//   };
//   const popRemove = function() {
//     $("#blur").removeClass("active");
//     $("#popup").removeClass("active");
//   };
//   const alertOn = function() {
//     $(".center").toggleClass("active");
//     $("#alert").toggleClass("active");
//   };
//   const alertOff = function() {
//     $(".main-content").removeClass("active");
//     $("#alert").removeClass("active");
//     $("#popup").removeClass("active");
//     $(".center").removeClass("active");
//   };
//   //Edit board btn
//   $editBoard.on("click", popUp);
//   $("#cancel").on("click", popRemove);

//   // Edit post btn
//   const $editPost = $("#edit-post-btn");
//   $editPost.on("click", popUp);
//   $("#cancel-btn").on("click", alertOff);

//   //Alert box btn
//   $("#delete-btn").on("click", alertOn);
//   $("#cancel").on("click", alertOff);

//   $("#delete-btn-post").click(function() {
//     $("#popup").removeClass("active");
//     $("#blur").removeClass("active");
//     $(".center").toggleClass("active");
//     $("#alert").toggleClass("active");
//   });
});
