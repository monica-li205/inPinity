let offset = 0;

$(document).ready(function (e) {
  $(window).scroll(function (e) {
    if (
      $(window).scrollTop() + 1 >=
      $(document.body).height() - $(window).height()
    ) {
      loadMore();
      // loadMorePopular();
    }
  });
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
