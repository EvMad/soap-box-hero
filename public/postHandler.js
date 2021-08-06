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


