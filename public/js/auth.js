const GOOGLE_CLIENT_ID = '722578409329-dr3min80edhae3n7i92qqeop2gob6sqo.apps.googleusercontent.com';
const FACEBOOK_CLIENT_ID = '249141440286033';
const GOOGLE_REDIRECT_URI = 'https://localhost/users/auth/google';
const FACEBOOK_REDIRECT_URI = 'https://localhost/users/auth/facebook';

// request auth code from google
function socialLogin(id) {
    // google oauth2 endpoint
    const googleOauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

    // facebook oauth2 endpoint
    const facebookOauth2Endpoint = 'https://www.facebook.com/v10.0/dialog/oauth';

    let google = false;
    let params = null;

    // check the clicked button id
    if (id === "google") {
        google = true;
    }

    // create form element to open oauth2 endpoint
    const form = document.createElement('form');
    form.setAttribute('method', 'GET');
    form.setAttribute('action', google ? googleOauth2Endpoint : facebookOauth2Endpoint);

    // parameters to pass to oauth2 endpoint
    if (google) {
        params = {
            'client_id': GOOGLE_CLIENT_ID,
            'redirect_uri': GOOGLE_REDIRECT_URI,
            'scope': 'https://www.googleapis.com/auth/userinfo.profile',
            'include_granted_scopes': 'true',
            'response_type': 'code'
        }
    } else {
        params = {
            'client_id': FACEBOOK_CLIENT_ID,
            'redirect_uri': FACEBOOK_REDIRECT_URI,
            'scope': 'public_profile,email',
            'include_granted_scopes': 'true',
            'response_type': 'code'
        }
    }

    // add form parameters as hidden input values
    for (let p in params) {
        let input = document.createElement('input');
        input.setAttribute('type', 'hidden');
        input.setAttribute('name', p);
        input.setAttribute('value', params[p]);
        form.appendChild(input);
    }

    // append form and submit
    document.body.appendChild(form);
    form.submit();
}