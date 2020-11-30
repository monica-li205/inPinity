$(document).ready(function(e) {
  $('.login-form').submit(function(e) {
    const data = $(this).serialize();
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/api/users/login",
      data: data
    })
  })
})