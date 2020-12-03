$(document).ready(function(e) {
  console.log("dom ready");

  $(".login-form").submit(function(e) {
    const data = $(this).serialize();
    e.preventDefault();

    $.ajax({
      method: "POST",
      url: "/users/login",
      data: data,
    }).done((data) => {
      console.log(data);
    });
  });
});
