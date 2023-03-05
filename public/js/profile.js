const profileData = async () => {
   //asign user_id to a variable
    const user_id = document.querySelector('#user-id').value.trim();
    //fetch user data
    

    const response = await fetch(`/api/users/${{user_id}}/comments`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        document.location.replace('/profile');
    } else {
        alert(response.statusText);
        alert(response.statusText);
    }
}

profileData();