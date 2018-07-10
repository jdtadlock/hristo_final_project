import React, {
    Component
} from 'react';

class Callback extends Component {
    componentDidMount() {
        this.props.processAuth();
    }

    render() {
        return ( <
            div > < /div>
        )
    }
}

export default Callback;