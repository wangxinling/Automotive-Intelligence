// connect to the socket in server
const socket = io();

// delete tool or part
deleteItem = () => {
    const trash = document.querySelector('a.delete');
    const deleteEndpoint = `/${window.location.pathname.split('/')[1]}/${trash.dataset.id}`;

    fetch(deleteEndpoint, {
        method: 'DELETE'
    }).then(response => {
        return response.json();
    }).then(response => {
        window.location.href = response.redirect;
    }).catch(err => {
        console.log(err);
    });
}

// logout user
logoutUser = () => {
    const logoutEndpoint = "/users/logout";

    fetch(logoutEndpoint, {
        method: 'GET'
    }).then(response => {
        window.location.href = response.url;
    }).catch(err => {
        console.log(err);
    });
}