import React from "react";
import { withRouter } from 'react-router-dom';
import Layout from '../../layouts';
import { EmailField, PasswordField, TextField } from '../../shared/Form';
import { required, inmarEmail, password, minNameLength, maxNameLength } from '../../shared/Form/validations';
import { updateFormValue } from '../../utils';
import { createUser } from '../../API';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formVals: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
            }
        };

        this.updateFormValue = this.updateFormValue.bind(this);
        this.submit = this.submit.bind(this);
    }

    updateFormValue(name) {
        return updateFormValue(name, this);
    }

    submit() {
        createUser(this.state.formVals, () => {
            this.props.history.push('/');
        });
    }

    render() {
        return (
            <Layout>
                <h1>Sign Up</h1>
                <TextField label="First Name" onChange={this.updateFormValue('firstName')} value={this.state.formVals.firstName} validations={[minNameLength, maxNameLength]} />
                <TextField label="Last Name" onChange={this.updateFormValue('lastName')} value={this.state.formVals.lastName} validations={[minNameLength, maxNameLength]} />
                <EmailField onChange={this.updateFormValue('email')} value={this.state.formVals.email} validations={[required, inmarEmail]} />
                <PasswordField onChange={this.updateFormValue('password')} value={this.state.formVals.password} validations={[required, password]} />
                <button className="btn btn-success" onClick={this.submit}>Submit</button>
            </Layout>
        );
    }
};

export default withRouter(SignUp);