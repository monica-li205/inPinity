$(document).ready(function (e) {
  console.log("got here");
  $.ajax({
      method: "GET",
      url: "/api/posts"
    })
    .done((posts) => {
      for (post of posts.posts) {
        $('.post-area').append(createPostElement(post));
      }
    })
})

const createPostElement = function (post) {
  let $post = $(`
  <article>
  <a href="${post.url}" class="card box">
    <div class="card-img-top image_edit">
      <img
        src="https://cdn.dribbble.com/users/146124/screenshots/14664420/media/48be6b80d8b275d5d54e7fe86c567bc6.jpg"
        alt="image"
        class="thumbnail box_img"
      />
    </div>
    <div class="card-body">
      <h5 class="title">${post.title}</h5>
      <p class="card-text description">${post.description}</p>
    </div>
    <footer class="flex-row-space-center">
      <div class="flex-row-center ml-2">
        <img
          src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairDreads01&accessoriesType=Round&hairColor=Auburn&facialHairType=Blank&clotheType=Overall&clotheColor=Black&eyeType=Dizzy&eyebrowType=RaisedExcitedNatural&mouthType=Serious&skinColor=Light"
          class="avatar mb-2"
          style="width: 2rem"
        />
        <p class="post-owner mt-2 ml-2">id</p>
      </div>
      <div class="flex-row-center mt-2">
        <p class="rating mr-2"><i class="fa fa-star mr-2">rating</i></p>
        <p class="liked mr-2"><i class="fa fa-heart mr-2">likes</i></p>
      </div>
    </footer>
  </a>
</article>
  `)
  return $post;
}

const escape = function (str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
