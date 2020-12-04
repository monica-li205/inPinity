let offset = 0;

$(document).ready(function (e) {
  window.onscroll = function(ev) {
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
      // you're at the bottom of the page
      loadMore();
      console.log("Bottom of page");
    }
};
  // $(window).scroll(function (e) {
  //   if ($(window).scrollTop() + $(window).height() === $(document.body).height()) {
  //     console.log("end");
  //     loadMore();
  //   }
  // });
});

const loadMore = function () {
  offset += 20;
  $.ajax({
    method: "GET",
    url: `/main?offset=${offset}`,
  }).then((data) => {
    const $data = $(data).find(".post-body");
    $("#post-area").append($data);
  });
};

// const loadMorePopular = function () {
//   offset += 5;
//   $.ajax({
//     method: "GET",
//     url: `/main?offset=${offset}`,
//   }).then((data) => {
//     const $data = $(data).find(".fav_box > article");
//     console.log($data);
//     $(".fav_box").append($data);
//   });
// };
