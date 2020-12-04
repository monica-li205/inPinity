let offset = 0;

$(document).ready(function (e) {
  let loadMoreDelay = false;
  let loadMorePopularDelay = false;

  $(window).scroll(function (e) {
    if ($(window).scrollTop() + 1 >= $("#aside").height() - $(window).height()) {
      if (loadMoreDelay === false) {
        loadMoreDelay = true;
        loadMore()
        setTimeout(function () {
          loadMoreDelay = false;
        }, 2000);
      }
    }

    if ($(window).scrollTop() + 1 >= $("#aside").height() - $(window).height()) {
      if (loadMorePopularDelay === false) {
        loadMorePopularDelay = true;
        loadMorePopular();
        setTimeout(function () {
          loadMorePopularDelay = false;
        }, 2000);
      }
    }
  })
})

const loadMore = function () {
  offset += 20;
  $.ajax({
      method: "GET",
      url: `/main?offset=${offset}`
    })
    .then(data => {
      const $data = $(data).find(".post-body");
      $("#post-area").append($data);
    })
}

const loadMorePopular = function() {
  offset += 10;
  $.ajax({
    method: "GET",
    url: `/main?offset=${offset}`
  })
  .then(data => {
    const $data = $(data).find(".fav_box > article");
    $("#fav-post-area").append($data);
  })
}