$(document).ready(function () {
  console.log('loaded likes')

  $('.fa-heart').click(function() {

    const post_id = $(this).data('postid');
    const data = {
      post_id,
    }
    console.log('isclicked');
    $.ajax({
      type: 'POST',
      url: '/api/likes',
      data: data,
    })
    .then((data) =>{
      console.log('liked', data);
      $(this).toggleClass('liked-true');
    });
  })
});

// $(document).ready(function () {
//   console.log("loaded likes");
//   $(".fa-heart").click(function () {
//     console.log("isclicked");
//     const post_id = $(this).data("postid");
//     const data = {
//       post_id,
//     };
//     $.ajax({
//       type: "POST",
//       url: "/api/likes",
//       data: data,
//     }).then(() => {
//       console.log("liked");
//       $(this).toggle("liked-true");
//     });
//   });

  // $(".mainpost").ready(function() {
  //   console.log("dom loaded");
  //   $(this).click(function() {
  //     const post_id = $(this).data('mainpostid');
  //     const data = {
  //       post_id,
  //     }
  //     console.log(post_id);
  //     $.ajax({
  //       method: "POST",
  //       url: "/api/likes",
  //       data: data,
  //     })
  //     .then(data => {
  //       console.log("liked post: ", data);
  //       $(this).toggleClass('liked-true');
  //     })
  //   })
  // })
// });
