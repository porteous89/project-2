const postFormHandler = async (event) => {
    event.preventDefault();
    const rating = document.querySelector('#rating-box').value.trim();
    const feedback = document.querySelector('#comment-box').value.trim();
    if (rating && feedback) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            // body: JSON.stringify({ rating, feedback, movie_id: movieId, user_id: userId }),
            body: JSON.stringify({ rating, feedback, movie_id: movieId, user_id: userId }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.post-form').addEventListener('submit', postFormHandler);
