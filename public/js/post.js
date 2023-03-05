const postFormHandler = async (event) => {
  event.preventDefault();
  const rating = document.querySelector("#rating").value.trim();
  const feedback = document.querySelector("#comment").value.trim();
  const movie_id = document.querySelector("#movie-id").value.trim();

  if (movie_id && rating && feedback) {
    const response = await fetch("/api/comments/", {
      method: "POST",
      body: JSON.stringify({ rating, feedback, movie_id }),

      headers: { "Content-Type": "application/json" },
    });
    console.log(response);

    if (response.ok) {
        document.location.replace("/profile");
    } else {
      console.log(response.statusText);
      alert(response.statusText);
    }
  }
};

//addevent listener for submit buttun with prevent default

document
  .querySelector(".comment-form")
  .addEventListener("submit", postFormHandler);
