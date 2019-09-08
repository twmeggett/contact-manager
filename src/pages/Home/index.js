import React from "react";
import { withRouter } from 'react-router-dom';
import Layout from '../../layouts';
import { SIGN_IN} from '../../routes';
import Grid from '../../shared/Grid';

const response = [
    {
        name: 'Group 1',
        status: 'active',
        contacts: [
            {
                status: 'inactive',
                firstName: 'Bob',
                lastName: 'Guy',
                email: 'test@inmar.com',
                phone: '555-555-5555',
            },
            {
                status: 'active',
                firstName: 'Bobby',
                lastName: '',
                email: 'test@inmar.com',
                phone: '555-555-5555',
            },
            {
                status: 'inactive',
                firstName: 'Jim',
                lastName: 'Matthew',
                email: 'test@inmar.com',
                phone: '555-555-5555',
            },
            {
                status: 'active',
                firstName: 'Gary',
                lastName: 'Blue',
                email: 'test@inmar.com',
                phone: '555-555-0098',
            },
            {
                status: 'active',
                firstName: 'Samantha',
                lastName: 'Yellow',
                email: 'test@inmar.com',
                phone: '555-567-5555',
            },
            {
                status: 'active',
                firstName: 'Steve',
                lastName: 'Smith',
                email: 'test@inmar.com',
                phone: '555-555-5555',
            },
        ],
    },
    {
        name: 'Group 2',
        status: 'inactive',
        contacts: [
            {
                status: 'active',
                firstName: 'Terry',
                lastName: 'Crews',
                email: 'test@inmar.com',
                phone: '778-778-7785',
            },
            {
                status: 'inactive',
                firstName: 'Stan',
                lastName: 'Smith',
                email: 'test@inmar.com',
                phone: '778-789-7785',
            },
        ]
    },
    {
        name: 'Group 3',
        status: 'inactive',
        contacts: [
            {
                status: 'active',
                firstName: 'Terry',
                lastName: 'Crews',
                email: 'test@inmar.com',
                phone: '778-778-7785',
            },
            {
                status: 'inactive',
                firstName: 'Stan',
                lastName: 'Smith',
                email: 'test@inmar.com',
                phone: '778-789-7785',
            },
            {
                status: 'active',
                firstName: 'Blue',
                lastName: 'Horizon',
                email: 'blue@inmar.com',
                phone: '778-789-7785',
            },
            {
                status: 'inactive',
                firstName: 'Red',
                lastName: 'Dawn',
                email: 'red@inmar.com',
                phone: '778-789-7785',
            },
            {
                status: 'inactive',
                firstName: 'Green',
                lastName: 'Gang',
                email: 'green@inmar.com',
                phone: '778-789-7785',
            },
            {
                status: 'active',
                firstName: 'Purple',
                lastName: 'Haze',
                email: 'purple@inmar.com',
                phone: '778-789-7785',
            },
        ]
    }
];

const fields = [
    {
        title: 'Group St.',
        name: 'groupStatus',
        filter: 'dropdown',
        options: [{label: 'Active', value: 'active'}, {label: 'Inactive', value: 'inactive'}],
    },
    {
        title: 'Group',
        name: 'group',
    },
    {
        title: 'Status',
        name: 'status',
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
]
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formVals: {},
            data: [],
        };
    }

    componentDidMount() {
        window.firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                this.props.history.push(SIGN_IN);
            }
        });

        this.setState({
            data: this.createData(response, fields)
        })
    }

    createData(data, fields) {
        var result = [];
        data.forEach(({name, status, contacts}) => {
            const groupRow = {}
            const row = contacts.map(contact => ({...contact, group: name, groupStatus: status}));
            fields.forEach(field => {groupRow[field.name] = '-'})
            result = [...result, { ...groupRow, group: name, groupStatus: status}, ...row];
        })
        return result;
    }

    render() {
        return (
            <Layout signedIn={true} fullWidth={true}>
                <h1>Home</h1>
                <Grid 
                    fields={fields}
                    data={this.state.data}
                    groups={['groupStatus', 'group']}
                />
            </Layout>
        );
    }
};

export default withRouter(Home);