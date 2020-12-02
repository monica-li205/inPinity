/* eslint-disable no-undef */
let offset = 0;

$(document).ready(function(e) {
  $(window).scroll(function(e) {
    if ($(window).scrollTop() + 1 >= $(document.body).height() - $(window).height()) {
      loadMore();
    }
  });

  $(".post-body").hover(function(e) {
    const $description = $(this).find(".post-description");
    const $footer = $(this).find(".post-footer");
    $description.toggle("fast");
    $footer.fadeToggle(100).css("display", "flex");
  });
});

const loadMore = function() {
  offset += 20;
  $.ajax({
    method: "GET",
    url: `/?offset=${offset}`
  })
    .then(data => {
      const $data = $(data).find(".post-body");
      $("#post-area").append($data);
    });
};
