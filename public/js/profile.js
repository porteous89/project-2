const deleteButtons = document.querySelectorAll('.delete-comment');

deleteButtons.forEach((button) => {
    addEventListener('click', async (event) => {
        const commentId = event.target.id
        if (button.id == commentId) {
            const response = await fetch(`/api/comments/${commentId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                document.location.replace('/profile');
            } else {
                alert(response.statusText);
            }
        }
            
    });
})
