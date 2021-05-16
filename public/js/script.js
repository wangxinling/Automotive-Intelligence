deleteItem = () => {
    const trash = document.querySelector('a.delete');

    trash.addEventListener('click', (event) => {
        const deleteEndpoint = `/parts/${trash.dataset.id}`;

        fetch(deleteEndpoint, {
            method: 'DELETE'
        }).then(response => {
            response.json();
        }).then(response => {
            window.location.href = response.redirect;
        }).catch(err => {
            console.log(err);
        });
    });
}

logoutUser = () => {
    const logout = document.querySelector('button.logout');
    
    logout.addEventListener('click', (event) => {
        const logoutEndpoint = "/users/logout";

        fetch(logoutEndpoint, {
            method: 'GET'
        }).then(response => {
            window.location.href = response.url;
        }).catch(err => {
            console.log(err);
        });
    });
}