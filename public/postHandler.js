const newPostHandler = async (event) =>

{
  const title = document.querySelector("#post-title").value.trim();
  const content = document.querySelector("#post-content").value.trim();

  if (title && content) {
    console.log(title, content);
      fetch("/api/post", {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
    if (response.ok) {
      document.location.replace("/homePage");
    } else {
      alert("Please fill out title and content fields before submitting.")
    }
  }
    )};

document.getElementById("postBtn").addEventListener(
"click",

function (e) {
e.preventDefault();
console.log("clicked!!!!");
},
false
)};


newPostHandler();