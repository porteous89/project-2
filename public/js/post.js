const postFormHandler = async (event) => {
    event.preventDefault();

    const rating = document.querySelector('#rating-box').value.trim();
    const feedback = document.querySelector('#comment-box').value.trim();
    const movieId = document.querySelector('#movie-id').value.trim();
    if (rating && feedback && movieId) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ rating, feedback, movie_id: movieId }),
            headers: { 'Content-Type': 'application/json' },
            
        });
       
        if (response.ok) {
            document.location.replace(`/profile`);
        } else {
            console.log(response.statusText);
            alert(response.statusText);
        }
    }
}

//addevent listener for submit buttun with prevent default

document.querySelector('.comment-form').addEventListener('submit', postFormHandler,);


