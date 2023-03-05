const updateButton = document.querySelector(".update-comment");

if (updateButton) {
  updateButton.addEventListener("click", async (event) => {
    event.preventDefault();
    const rating = document.querySelector("#edit-rating").value.trim();
    const feedback = document.querySelector("#edit-feedback").value.trim();
    const commentId = event.target.id;

    const response = await fetch(`/api/comments/${commentId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating, feedback }),
    });
    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert(response.statusText);
    }
  });
}
