$(document).ready(function (e) {
  $.ajax({
      method: "GET",
      url: "/api/posts"
    })
    .done((posts) => {
      for (post of posts.posts) {
        $('.posts-container').append(createPostElement(post));
      }
    })
})

const createPostElement = function (post) {
  let $post = $(`
    <a href="${post.url}">
      <h3 class="title">${post.title}</h3>
      <img src="${post.thumbnail_photo}" alt="" class="thumbnail">
      <p class="description">${post.description}</p>
      <p for="" class="post-owner">Owner: ${post.user_id}</p>
      <p class="date-posted">${post.date_created}</p>
      <p for="" class="rating">${post.rating}</p>
      <p for="" class="liked">${post.is_liked}</p>
    </a>
  `)
  return $post;
}

const escape = function (str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
