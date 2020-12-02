$(document).ready(function(e) {
  $("form[name='edit-board-form']").validate({
    rules: {
      category: "required",
      title: "required",
      thumbnail_photo: {
        required: true,
        url: true
      }
    },
    messages: {
      category: "Please enter a category to edit-board to.",
      title: "Please enter a title.",
      thumbnail_photo: "Please enter a valid link."
    },
    submitHandler: function(form) {
      form.submit();
    }
  })

  const $edit_board_image = $("#edit-board-image");
  $("#generate-image").click(function(e) {
    console.log("generated")
    $edit_board_image.attr("src", $("#image-url").val());
    console.log($edit-board_image);
  })
})