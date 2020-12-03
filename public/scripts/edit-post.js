$(document).ready(function(e) {
  $("form[name='edit-post-form']").validate({
    rules: {
      category: "required",
      title: "required",
      descripion: "required",
      url: {
        required: true,
        url: true
      },
      thumbnail_photo: {
        required: true,
        url: true
      }
    },
    messages: {
      category: "Please enter a category to post to.",
      title: "Please enter a title.",
      description: "Please enter a description for your post.",
      url: "Please enter a valid link.",
      thumbnail_photo: "Please enter a valid link."
    },
    submitHandler: function(form) {
      form.submit();
    }
  })

  const $post_image = $("#post-image");
  $("#generate-image").click(function(e) {
    console.log("generated")
    $post_image.attr("src", $("#image-url").val());
    console.log($post_image);
  })
})