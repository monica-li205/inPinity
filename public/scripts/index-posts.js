let offset = 0;

$(document).ready(function (e) {
  console.log("got here");
  $(window).scroll(function (e) {
    if ($(window).scrollTop() + $(window).height() === $(document).height()) {
      console.log("end");
      loadMore();
    }
  });

  $("#post-area").on("click", "i.fa-heart", function () {
    $("this").click().alert("Please log in to checkout more features.");
  });

  console.log("loaded likes");
  $(".fa-heart").click(function () {
    alert("Please log in to checkout more features.");
  });
});

const loadMore = function () {
  offset += 20;
  $.ajax({
    method: "GET",
    url: `/?offset=${offset}`,
  }).then((data) => {
    const $data = $(data).find(".post-body");
    $("#post-area").append($data);
  });
};
