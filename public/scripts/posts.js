// let offset = 0;

<<<<<<< HEAD
// $(document).ready(function (e) {
//   loadPosts();

//   $(window).scroll(function (e) {
//     if ($(window).scrollTop() + 1 >= $(document.body).height() - $(window).height()) {
//       loadMore();
//     }
//   })
// })

// const renderPosts = function (posts) {
//   const $post_area = $("#post-area");
//   for (const post of posts) {
//     $post_area.append(createPostElement(post));
//   }
// }

// const createPostElement = function (post) {
//   let $post = $(`
//   <article>
//   <a href="${escape(post.url)}" class="card box">
//     <div class="card-img-top image_edit">
//       <img
//         src="${escape(post.thumbnail_photo)}"
//         alt="image"
//         class="thumbnail box_img"
//       />
//     </div>
//     <div class="card-body">
//       <h5 class="title">${post.title}</h5>
//       <p class="card-text description">${post.description}</p>
//     </div>
//     <footer class="flex-row-space-center">
//       <div class="flex-row-center ml-2">
//         <img
//           src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairDreads01&accessoriesType=Round&hairColor=Auburn&facialHairType=Blank&clotheType=Overall&clotheColor=Black&eyeType=Dizzy&eyebrowType=RaisedExcitedNatural&mouthType=Serious&skinColor=Light"
//           class="avatar mb-2"
//           style="width: 2rem"
//         />
//         <p class="post-owner mt-2 ml-2">${escape(post.user_id)}</p>
//       </div>
//       <div class="flex-row-center mt-2">
//         <p class="rating mr-2">${escape(post.rating)}<i class="fa fa-star mr-2"></i></p>
//         <p class="liked mr-2"><i class="fa fa-heart mr-2">${escape(post.is_liked)}</i></p>
//       </div>
//     </footer>
//   </a>
// </article>
//   `)
//   return $post;
// }

// const loadPosts = function () {
//   $.ajax({
//       method: "GET",
//       url: "/api/posts"
//     })
//     .then(data => {
//       renderPosts(data);
//     });
// }

// const loadMore = function () {
//   offset += 10;
//   $.ajax({
//       method: "GET",
//       url: `/api/posts?offset=${offset}`
//     })
//     .then(data => {
//       renderPosts(data);
//     })
// }

// const escape = function (str) {
//   let div = document.createElement('div');
//   div.appendChild(document.createTextNode(str));
//   return div.innerHTML;
// };
=======
$(document).ready(function (e) {
  $(window).scroll(function (e) {
    if ($(window).scrollTop() + 1 >= $(document.body).height() - $(window).height()) {
      loadMore();
    }
  })
})

const loadMore = function () {
  offset += 15;
  $.ajax({
      method: "GET",
      url: `/?offset=${offset}`
    })
    .then(data => {
      const $data = $(data).find(".post-body");
      $("#post-area").append($data);
    })
}
>>>>>>> d9ecb60c0b5ab9f8c7cfc5bc93e0835918e42c7b
