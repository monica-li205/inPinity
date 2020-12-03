$(document).ready(function(e) {
  $(".search-form").keyup(function() {
    const $input = $(this).val();
    $.ajax({
      method: "GET",
      url: "/api/posts/search?q=" + $input
    })
    .then(results => {
      $("#post-area").empty();
      const $search_result = $(results).find(".post-body");
      $("#post-area").append($search_result);
    })
  })
})