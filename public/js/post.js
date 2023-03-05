const postFormHandler = async (event) => {
    event.preventDefault();
    const rating = document.querySelector('#rating').value.trim();
    console.log(rating);
    const feedback = document.querySelector('#comment').value.trim();
    console.log(feedback);
    const movie_id = document.querySelector('#movie-id').value.trim();
    console.log(movie_id);
    const user_id = document.querySelector('#user-id').value.trim();
    console.log(user_id);



    // if (user_id && movie_id && rating && feedback) {
       
        const response = await fetch('/api/comments/', {
            method: 'POST',
            body: JSON.stringify({ rating, feedback, movie_id, }),
            

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



