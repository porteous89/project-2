const postFormHandler = async (event) => {
    event.preventDefault();

    const rating = document.querySelector('#rating-box').value.trim();
    const feedback = document.querySelector('#comment-box').value.trim();
    const movieId = document.querySelector('#movie-id').value.trim();
    const userId = document.querySelector('#user-id').value.trim();
    if (rating && feedback && movieId && userId) {
        console.log(rating, feedback, movieId, userId);
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ rating, feedback, movie_id: movieId, user_id: userId }),
            headers: { 'Content-Type': 'application/json' },
            
        });
        console.log(response);
       
        if (response.ok) {
          
        } else {
            console.log(response.statusText);
            alert(response.statusText);
        }
    }
// }

//addevent listener for submit buttun with prevent default

document.querySelector('.comment-form').addEventListener('submit', postFormHandler,
    );


