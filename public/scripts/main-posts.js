let offset = 0;

$(document).ready(function (e) {
  window.onscroll = function (ev) {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
      // you're at the bottom of the page
      loadMore();
      console.log("Bottom of page");
    }
  };

  console.log("main page ready");
  $("#post-area").on("click", "i.fa-heart", function () {
    $("this").click();
  });

  console.log("loaded likes");
  $(".fa-heart").click(function () {
    alert("You just liked me");

    console.log("isliked");
    const post_id = $(this).data("postid");
    const data = {
      post_id,
    };
    $.ajax({
      type: "POST",
      url: "/api/likes",
      data: data,
    }).then(() => {
      console.log("liked");
      $(this).toggle("liked-true");
    });
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
