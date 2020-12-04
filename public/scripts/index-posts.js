let offset = 0;

$(document).ready(function (e) {
  let loadMoreDelay = false;

  $(window).scroll(function (e) {
    if ($(window).scrollTop() + 1 >= $("#main-container").height() - $(window).height()) {
      if (loadMoreDelay === false) {
        loadMoreDelay = true;
        loadMore()
        setTimeout(function () {
          loadMoreDelay = false;
        }, 3000);
      }
    }
  })
})

const loadMore = function () {
  offset += 20;
  $.ajax({
      method: "GET",
      url: `/?offset=${offset}`
    })
    .then(data => {
      const $data = $(data).find(".post-body");
      $("#post-area").append($data);
    })
}