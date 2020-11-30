// $(document).ready(function(e) {
//   $('.login-form').submit(function(e) {
//     const data = $(this).serialize();
//     e.preventDefault();
//     $.ajax({
//       method: "POST",
//       url: "/api/users/login",
//       data: data
//     })
//     .then(user => {
//       console.log(user.userRecord);
//       if (!user) {
//         console.log("no one here");
//         // Show error message here
//       } 
//       $(".login-form").append("logged in as: ", user.userRecord.name);
//     })
//   })
// })