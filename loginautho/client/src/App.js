import React, {
    Component
} from 'react';
import {
    Route,
    withRouter
} from 'react-router-dom';

import Auth from './Auth';

import Callback from './components/Callback';
// import axios from 'axios';

// src/Auth/Auth.js

class App extends Component {
    // componentDidMount = () => {
    //   axios.get('/user')
    //     .then(res => {
    //       console.log(res.data);
    //     });
    // }


    render() {
            const auth = new Auth(this.props.history);
            const isAuth = auth.isAuthenticated(); // Boolean true/false

            return ( <
                div >
                <
                header >
                <
                h3 > Logo < /h3>

                <
                p > {
                    isAuth
                } < /p>

                <
                nav >
                <
                span > {
                    isAuth ? localStorage.getItem('user_email') : < button onClick = {
                            auth.login
                        } > Login < /button> }</span >

                        {
                            isAuth ? < span onClick = {
                                auth.logout
                            } > Logout < /span> : ''} < /
                            nav > <
                            /header>


                            <
                            Route path = "/callback"
                            render = {
                                () => ( <
                                    Callback processAuth = {
                                        auth.processAuthentication
                                    }
                                    />
                                )
                            }
                            />

                            { /* <button onClick={auth.logout}>Logout</button> */ } <
                            /div>  
                        );
                }
            }

            export default withRouter(App);