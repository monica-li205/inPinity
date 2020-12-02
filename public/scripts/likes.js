$(document).ready(function () {
 //calls likedPostsByUser() to get the data containing liked posts ids
  const likePost = function (userID) {
    const currentLikedPosts = [];
    const currentPost = $(post.id);

    $('.fa fa-heart mr-2 liked').click(function() {
      // if post is not in the obj, $(.liked mr-2).css('colour', 'grey')
      if(!currentLikedPosts.includes(currentPost)) {
        $('.fa fa-heart mr-2 liked').css('colour', 'pink')
      } else {
        $('.fa fa-heart mr-2 liked').css('colour', 'grey')
      }
    })
  }
});
