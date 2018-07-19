import React, { Component } from 'react';
import loading from './loading.svg';

class Callback extends Component {
    render() {
        const style = {
            position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
            height: '100vh',
            width: '100vw',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'white',
        }

        return ( <
            div style = { style } >
            <
            img src = { loading }
            alt = "loading" / >
            <
            /div>
        );
    }
}
//getEnv() {
// return process.env.NODE_ENV === "production" ? "https://build-zzkiyezvcm.now.sh/" : "http://localhost:3000/callback";
//}
export default Callback;