// comment logic:

const postId = document.querySelector("#comment").getAttribute('data-post-id');

const commentHandler = async (event) => {
    event.preventDefault();
  
    // const username = document.querySelector("#username-input").value.trim();
    // reach into html
    // grab the message text area
    const messageElement = document.querySelector("#comment")
    // pull the the value
    const message = messageElement.value.trim();
    // pull the data attributes
    // const user_id = messageElement.getAttribute('data-userId')
    const post_id = messageElement.getAttribute('data-postId')

  
    if (message) {
      const response = await fetch('/api/comment', {
        method: "POST",
        body: JSON.stringify({ message, post_id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        // console.log("hello");
        alert("Comment posted!");
        document.location.reload();
        // document.location.replace(`/post/${post_id}`);
      } else {
        alert("Failed to create comment");
        // console.log(error)
      }
    }
};

//delete comment button:

// const delBtnHandler = async (event) => {
//   if (event.target.hasAttribute("data-id")) {
//     const id = event.target.getAttribute("data-id");

//     const response = await fetch(`/api/comment/${id}`, {
//       method: "DELETE",
//     });
// console.log(response)
//     if (response.ok) {
//       document.location.replace(`/post/${postId}`);
//     } else {
//       alert("Failed to delete comment");
//     }
//   }
// };


document
    .querySelector(".comment-form")
    .addEventListener("submit", commentHandler);

    // document.querySelector(".comments").addEventListener("click", delBtnHandler);


