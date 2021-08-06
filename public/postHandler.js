const newPostHandler = async (event) =>

  {
    event.preventDefault();
    const title = document.querySelector("#post-title").value.trim();
    const content = document.querySelector("#post-content").value.trim();

    if (title && content) {
      console.log(title, content);
      fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          title,
          content
        }),
        headers: {
          "Content-Type": "application/json"
        },
      }).then((response) => {
        if (response.ok) {
          document.location.replace("/");
        } else {
          alert("Please fill out title and content fields before submitting.")
        }
      })
    };

  };

  document.getElementById("postBtn").addEventListener(
    "click",

    newPostHandler
  );



  // comment logic:

  const postId = document.querySelector("#comment").getAttribute('data-post-id');

const commentHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector("#username-input").value.trim();
    const message = document.querySelector("#comment").value.trim();
  
    if (username && message) {
      const response = await fetch(`/api/comment/${postId}`, {
        method: "POST",
        body: JSON.stringify({ username, message }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        // console.log("hello");
        document.location.replace(`/post/${postId}`);
        // document.location.replace(`/post/${post_id}`);
      } else {
        alert("Failed to create comment");
        // console.log(error)
      }
    }
};

//delete comment button:

const delBtnHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/comment/${id}`, {
      method: "DELETE",
    });
console.log(response)
    if (response.ok) {
      document.location.replace(`/post/${postId}`);
    } else {
      alert("Failed to delete comment");
    }
  }
};


document
    .querySelector(".comment-form")
    .addEventListener("submit", commentHandler);

    document.querySelector(".comments").addEventListener("click", delBtnHandler);




