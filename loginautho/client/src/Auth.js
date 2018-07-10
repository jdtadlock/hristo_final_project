import auth0 from 'auth0-js'

export default class Auth {
    constructor(history) {
        this.auth0 = new auth0.WebAuth({
            domain: 'hln6480.auth0.com',
            clientID: 'MRdqUWCxfTqxRQW9RR4I6V9FxAmrWxda',
            redirectUri: 'http://localhost:3000/callback', //added to autho ignore
            audience: 'https://hln6480.auth0.com/userinfo',
            responseType: 'token id_token',
            scope: 'openid email'
        });

        this.login = this.login.bind(this);
        this.logout this.logout.bind(this);
        this.processAuthentication = this.processAuthentication.bind(this);

        this.history = history;
    }

    login() {
        this.auth0.authorize();
    }

    logout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        localStorage.removeItem('user_email');

        this.history.push('/');
    }

    processAuthentication() {
        this.auth0.parseHash((err, authResult) => {
            if (err) return console.log(err);

            if (authResult && authResult.accessToken && authResult.idToken) {
                let expires_at = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime());

                localStorage.setItem('access_token', authResult.accessToken);
                localStorage.setItem('id_token', authResult.idToken);
                localStorage.setItem('expires_at', expires_at);
                localStorage.setItem('user_email', authResult.idTokenPayload.email);

                this.history.push('/');
            }
        });
    }

    isAuthenticated() {
        let expires_at = JASON.parse(localStorage.getItem('expires_at'));

        return new Date().getTime() < expires_at;
    }

}