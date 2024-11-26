export const environment = {
    production: false,
    oauth: {
        issuer: 'https://accounts.google.com',
        clientId: '538920588017-pgjek6uqmc1ic838bo8ntn3q7l2368t7.apps.googleusercontent.com',
        redirectUri: window.location.origin,  // Tu URI de redirección
        scope: 'openid profile email',
        responseType: 'code'
    }
};