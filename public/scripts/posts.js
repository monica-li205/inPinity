// let offset = 0;

$(document).ready(function (e) {
  $(window).scroll(function (e) {
    if (
      $(window).scrollTop() + 1 >=
      $(document.body).height() - $(window).height()
    ) {
      loadMore();
    }
  });
});

const loadMore = function () {
  offset += 15;
  $.ajax({
    method: "GET",
    url: `/?offset=${offset}`,
  }).then((data) => {
    const $data = $(data).find(".post-body");
    $("#post-area").append($data);
  });
};
