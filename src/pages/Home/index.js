import React from "react";
import { withRouter } from 'react-router-dom';
import Layout from '../../layouts';
import { getUser } from "../../API";
import { SIGN_UP} from '../../routes';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formVals: {}
        };
    }

    componentDidMount() {
        window.firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                this.props.history.push(SIGN_UP);
            }
        });
    }

    render() {
        return (
            <Layout signedIn={true}>
                <h1>Home</h1>
            </Layout>
        );
    }
};

export default withRouter(Home);