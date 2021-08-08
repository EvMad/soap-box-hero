// comment logic:

const postId = document.querySelector("#comment").getAttribute('data-post-id');

const commentHandler = async (event) => {
    event.preventDefault();
  
    // const username = document.querySelector("#username-input").value.trim();
    const message = document.querySelector("#comment").value.trim();
  
    if (message) {
      const response = await fetch('/api/comment', {
        method: "POST",
        body: JSON.stringify({ message }),
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


