const GOOGLE_CLIENT_ID = '722578409329-dr3min80edhae3n7i92qqeop2gob6sqo.apps.googleusercontent.com';
const REDIRECT_URI = 'https://localhost/users/auth/google';
const fragmentString = location.hash.substring(1);

// request auth code from google
function googleLogin() {
    // google oauth2 endpoint
    const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

    // create form element to open oauth2 endpoint
    const form = document.createElement('form');
    form.setAttribute('method', 'GET');
    form.setAttribute('action', oauth2Endpoint);

    // parameters to pass to oauth2 endpoint
    const params = {
        'client_id': GOOGLE_CLIENT_ID,
        'redirect_uri': REDIRECT_URI,
        'scope': 'https://www.googleapis.com/auth/userinfo.email',
        'include_granted_scopes': 'true',
        'response_type': 'code'
    }

    // add form parameters as hidden input values
    for (var p in params) {
        var input = document.createElement('input');
        input.setAttribute('type', 'hidden');
        input.setAttribute('name', p);
        input.setAttribute('value', params[p]);
        form.appendChild(input);
    }

    // append form and submit
    document.body.appendChild(form);
    form.submit();
}