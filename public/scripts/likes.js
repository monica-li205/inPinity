$(document).ready(function () {
  console.log('loaded likes')

  $('.fa-heart').click(function() {
    // const currentPost = $(this)
    // alert('hello');
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
