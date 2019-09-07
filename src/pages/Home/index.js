import React from "react";
import { withRouter } from 'react-router-dom';
import Layout from '../../layouts';
import { SIGN_IN} from '../../routes';
import Grid from '../../shared/Grid';

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
                this.props.history.push(SIGN_IN);
            }
        });
    }

    render() {
        return (
            <Layout signedIn={true} fullWidth={true}>
                <h1>Home</h1>
                <Grid 
                    fields={[
                        {
                            title: 'Active',
                            name: 'active',
                            filter: 'dropdown',
                            options: [{label: 'Active', value: 'active'}, {label: 'Inactive', value: 'inactive'}],
                        },
                        {
                            title: 'First Name',
                            name: 'firstName',
                        },
                        {
                            title: 'Last Name',
                            name: 'lastName',
                        },
                        {
                            title: 'Email',
                            name: 'email',
                        },
                        {
                            title: 'Phone',
                            name: 'phone',
                        }
                    ]}
                    data={[
                        {
                            active: 'inactive',
                            firstName: 'Bob',
                            lastName: 'Guy',
                            email: 'test@inmar.com',
                            phone: '555-555-5555',
                        },
                        {
                            active: 'active',
                            firstName: 'Bobby',
                            lastName: 'Guy',
                            email: 'test@inmar.com',
                            phone: '555-555-5555',
                        },
                        {
                            active: 'inactive',
                            firstName: 'Jim',
                            lastName: 'Matthew',
                            email: 'test@inmar.com',
                            phone: '555-555-5555',
                        },
                        {
                            active: 'active',
                            firstName: 'Gary',
                            lastName: 'Blue',
                            email: 'test@inmar.com',
                            phone: '555-555-5555',
                        },
                        {
                            active: 'active',
                            firstName: 'Samantha',
                            lastName: 'Yellow',
                            email: 'test@inmar.com',
                            phone: '555-555-5555',
                        },
                        {
                            active: 'active',
                            firstName: 'Steve',
                            lastName: 'Smith',
                            email: 'test@inmar.com',
                            phone: '555-555-5555',
                        },
                    ]}
                />
            </Layout>
        );
    }
};

export default withRouter(Home);