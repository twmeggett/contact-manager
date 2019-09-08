import React from "react";
import { withRouter } from 'react-router-dom';
import Layout from '../../layouts';
import { SIGN_IN} from '../../routes';
import Grid from '../../shared/Grid';
import Modal from "react-bootstrap/Modal";
import { EmailField, TextField } from '../../shared/Form';
import { required, inmarEmail, minNameLength, maxNameLength } from '../../shared/Form/validations';
import { updateFormValue } from '../../utils';
import { updateGroup, createGroup, createContact, getUser, updateContact } from '../../API'

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

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formVals: {},
            editRow: {},
            data: [],
            contactModalOpen: false,
            groupModalOpen: false,
            newGroupModalOpen: false,
            newContactModalOpen: false,
        };

        this.updateFormValue = this.updateFormValue.bind(this);
        this.openContactModal = this.openContactModal.bind(this);
        this.closeContactModal = this.closeContactModal.bind(this);
        this.createGroup = this.createGroup.bind(this);
        this.openGroupModal = this.openGroupModal.bind(this);
        this.closeGroupModal = this.closeGroupModal.bind(this);
        this.updateContact = this.updateContact.bind(this);
        this.deleteContact = this.deleteContact.bind(this);
        this.updateGroup = this.updateGroup.bind(this);
        this.deleteGroup = this.deleteGroup.bind(this);
        this.openNewGroupModal = this.openNewGroupModal.bind(this);
        this.closeNewGroupModal = this.closeNewGroupModal.bind(this);
        this.openNewContactModal = this.openNewContactModal.bind(this);
        this.closeNewContactModal = this.closeNewContactModal.bind(this);
        this.addContact = this.addContact.bind(this);
        this.createContact = this.createContact.bind(this);
    }

    componentDidMount() {
        window.firebase.auth().onAuthStateChanged((user) => {
            const self = this;

            if (!user) {
                this.props.history.push(SIGN_IN);
            }

            const userDataRef = window.firebase.database().ref('user-data/' + getUser().uid);
            userDataRef.on('value', function(snapshot) {
                const responseData = snapshot.val();
                const response = Object.keys(responseData).map(key => (
                    {
                        ...responseData[key],
                        groupId: key,
                        contacts: responseData[key].contacts ? Object.keys(responseData[key].contacts).map(contactKey => {
                            return {
                                ...responseData[key].contacts[contactKey],
                                contactId: contactKey,
                            }
                        }) : []
                    }
                ));

                self.setState({
                    data: []
                })
                self.setState({
                    data: self.createData(response, self.fields)
                })
            });
        });
    }

    createData(data, fields) {
        var result = [];
        data.forEach(({name, status, contacts, groupId}) => {
            const groupRow = {groupId}
            const row = contacts.map(contact => ({...contact, group: name, groupStatus: status, groupId}));
            fields.forEach(field => {groupRow[field.name] = '-'})
            result = [...result, { ...groupRow, group: name, groupStatus: status}, ...row];
        })
        return result;
    }

    openContactModal(editRow) {
        this.setState({
            contactModalOpen: true, 
            formVals: {},
            editRow
        });
    }

    closeContactModal() {
        this.setState({contactModalOpen: false});
    }

    openGroupModal(editRow) {
        console.log(editRow)
        this.setState({
            groupModalOpen: true, 
            formVals: {
                name: editRow.name,
            },
            editRow
        });
    }

    closeGroupModal() {
        this.setState({groupModalOpen: false});
    }

    updateFormValue(name) {
        return updateFormValue(name, this);
    }

    updateContact() {
        updateContact({
            groupId: this.state.editRow.groupId,
            contactId: this.state.editRow.contactId,
            contact: {
                firstName: this.state.formVals.firstName,
                lastName: this.state.formVals.lastName,
                email: this.state.formVals.email,
                phone: this.state.formVals.phone,
                status: this.state.formVals.status || 'active',
            }
        });
        console.log(this.state.formVals, this.state.editRow)
    }

    deleteContact() {
        console.log(this.state.formVals, this.state.editRow)
    }

    updateGroup() {
        updateGroup({
            groupId: this.state.editRow.groupId,
            group: {
                contacts: this.state.editRow.contacts,
                name: this.state.formVals.name,
                status: this.state.formVals.status || 'active',
            }
        });
    }

    deleteGroup() {
        console.log(this.state.formVals, this.state.editRow)
    }

    createGroup() {
        createGroup({
            name: this.state.formVals.name,
            status: this.state.formVals.status || 'active',
            contacts: {},
        });
    }

    createContact() {
        createContact({
            groupId: this.state.editRow.groupId,
            contact: {
                status: this.state.formVals.status || 'active',
                firstName: this.state.formVals.firstName,
                lastName: this.state.formVals.lastName,
                phone: this.state.formVals.phone,
                email: this.state.formVals.email,
            },
        })
    }

    openNewGroupModal() {
        this.setState({
            newGroupModalOpen: true,
        })
    }

    closeNewGroupModal() {
        this.setState({
            newGroupModalOpen: false,
        })
    }

    openNewContactModal() {
        this.setState({
            newContactModalOpen: true,
        })
    }

    closeNewContactModal() {
        this.setState({
            newContactModalOpen: false,
        })
    }

    addContact() {
        this.closeGroupModal();
        this.openNewContactModal();
    }

    fields = [
        {
            title: 'Group St.',
            name: 'groupStatus',
            filter: 'dropdown',
            options: [{label: 'Active', value: 'active'}, {label: 'Inactive', value: 'inactive'}],
            onClick: (row) => () => {this.openGroupModal(row)}
        },
        {
            title: 'Group',
            name: 'group',
            onClick: (row) => () => {this.openGroupModal(row)}
        },
        {
            title: 'Status',
            name: 'status',
            filter: 'dropdown',
            options: [{label: 'Active', value: 'active'}, {label: 'Inactive', value: 'inactive'}],
            onClick: (row) => () => {this.openContactModal(row)}
        },
        {
            title: 'First Name',
            name: 'firstName',
            onClick: (row) => () => {this.openContactModal(row)}
        },
        {
            title: 'Last Name',
            name: 'lastName',
            onClick: (row) => () => {this.openContactModal(row)}
        },
        {
            title: 'Email',
            name: 'email',
            onClick: (row) => () => {this.openContactModal(row)}
        },
        {
            title: 'Phone',
            name: 'phone',
            onClick: (row) => () => {this.openContactModal(row)}
        }
    ]

    render() {
        return (
            <Layout signedIn={true} fullWidth={true}>
                <h1>Home</h1>
                <button className="btn btn-info" onClick={this.openNewGroupModal}>Add Group</button>

                <Grid
                    fields={this.fields}
                    data={this.state.data}
                    groups={['groupStatus', 'group']}
                />
                <Modal
                    show={this.state.contactModalOpen}
                    onHide={this.closeContactModal}
                    size="xl"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Contact</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <div className="col-sm-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                                <select onChange={this.updateFormValue('status')}>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                                <TextField 
                                    label="First Name" 
                                    onChange={this.updateFormValue('firstName')} 
                                    value={this.state.formVals.firstName} 
                                    validations={[required, minNameLength, maxNameLength]} />
                                <TextField 
                                    label="Last Name" 
                                    onChange={this.updateFormValue('lastName')} 
                                    value={this.state.formVals.lastName} 
                                    validations={[required, minNameLength, maxNameLength]} />
                                <TextField 
                                    label="Phone" 
                                    onChange={this.updateFormValue('phone')} 
                                    value={this.state.formVals.phone} 
                                    validations={[minNameLength, maxNameLength]} />
                                <EmailField 
                                    label="Email" 
                                    onChange={this.updateFormValue('email')} 
                                    value={this.state.formVals.email} 
                                    validations={[required, inmarEmail]} />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                    <button className="btn btn-success" onClick={this.updateContact}>
                        Submit
                    </button>
                    <button className="btn btn-danger" onClick={this.deleteContact}>
                        Delete
                    </button>
                    </Modal.Footer>
                </Modal>
                <Modal
                    show={this.state.groupModalOpen}
                    onHide={this.closeGroupModal}
                    size="xl"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Group</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <div className="col-sm-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                                <select onChange={this.updateFormValue('status')}>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                                <TextField 
                                    label="Group Name" 
                                    onChange={this.updateFormValue('name')} 
                                    value={this.state.formVals.name} 
                                    validations={[minNameLength, maxNameLength]} />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <div style={{float: 'left'}}>
                            <button className="btn btn-success" onClick={this.addContact}>
                                Add Contact
                            </button>
                        </div>
                        <button className="btn btn-success" onClick={this.updateGroup}>
                            Submit
                        </button>
                        <button className="btn btn-danger" onClick={this.deleteGroup}>
                            Delete
                        </button>
                    </Modal.Footer>
                </Modal>
                <Modal
                    show={this.state.newGroupModalOpen}
                    onHide={this.closeNewGroupModal}
                    size="xl"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Create Group</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <div className="container">
                                <div className="col-sm-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                                    <select onChange={this.updateFormValue('status')}>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                    <TextField 
                                        label="Group Name" 
                                        onChange={this.updateFormValue('name')} 
                                        value={this.state.formVals.name} 
                                        validations={[minNameLength, maxNameLength]} />
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                    <button className="btn btn-success" onClick={this.createGroup}>
                        Submit
                    </button>
                    </Modal.Footer>
                </Modal>
                <Modal
                    show={this.state.newContactModalOpen}
                    onHide={this.closeNewContactModal}
                    size="xl"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>New Contact - {this.state.editRow.group}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <div className="col-sm-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                                <select onChange={this.updateFormValue('status')}>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                                <TextField 
                                    label="First Name" 
                                    onChange={this.updateFormValue('firstName')} 
                                    value={this.state.formVals.firstName} 
                                    validations={[required, minNameLength, maxNameLength]} />
                                <TextField 
                                    label="Last Name" 
                                    onChange={this.updateFormValue('lastName')} 
                                    value={this.state.formVals.lastName} 
                                    validations={[required, minNameLength, maxNameLength]} />
                                <TextField 
                                    label="Phone" 
                                    onChange={this.updateFormValue('phone')} 
                                    value={this.state.formVals.phone} 
                                    validations={[minNameLength, maxNameLength]} />
                                <EmailField 
                                    label="Email" 
                                    onChange={this.updateFormValue('email')} 
                                    value={this.state.formVals.email} 
                                    validations={[required, inmarEmail]} />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-success" onClick={this.createContact}>
                            Save
                        </button>
                    </Modal.Footer>
                </Modal>
            </Layout>
        );
    }
};

export default withRouter(Home);