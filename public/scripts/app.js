$(document).ready(function (e) {
  $.ajax({
      method: "GET",
      url: "/api/posts"
    })
    .done((posts) => {
      for (post of posts.posts) {
        $('.container').append(createPostElement(post));
      }
    })
})


const createPostElement = function (post) {
  let $post = $(`
    <div class="post">
      <h3 class="title">${escape(post.title)}</h3>
      <img class="thumbnail" src="${escape(post.thumbnail_photo)}"></img>
      <p class="description">${escape(post.description)}</p>
      <p class="post-owner">${escape(post.user_id)}</p>
    </div>
  `)
  return $post;
}

const escape = function (str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
