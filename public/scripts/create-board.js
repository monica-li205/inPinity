$(document).ready(function(e) {
  $("form[name='board-form']").validate({
    rules: {
      category: "required",
      title: "required",
      thumbnail_photo: {
        required: true,
        url: true
      }
    },
    messages: {
      category: "Please enter a category to board to.",
      title: "Please enter a title.",
      thumbnail_photo: "Please enter a valid link."
    },
    submitHandler: function(form) {
      form.submit();
    }
  })

  const $board_image = $("#board-image");
  $("#generate-image").click(function(e) {
    console.log("generated")
    $board_image.attr("src", $("#image-url").val());
    console.log($board_image);
  })
})