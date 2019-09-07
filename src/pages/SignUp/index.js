import React from "react";
import { EmailField, PasswordField, TextField } from '../../shared/Form';
import { required, inmarEmail, password, minNameLength, maxNameLength } from '../../shared/Form/validations';

export default class extends React.Component {
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
        return (event) => {
            this.setState({
                formVals: {
                    ...this.state.formVals,
                    [name]: event.target.value
                },
            })
        };
    }

    submit() {
        console.log(this.state.formVals, window.firebase);
        window.firebase.auth().signInWithEmailAndPassword(this.state.formVals.email, this.state.formVals.password)
        .then((res) => {
            console.log('success', res);
        })
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(`${errorCode} - ${errorMessage}`)
        });
    }

    render() {
        return (
            <div>
                <h1>Sign Up</h1>
                <TextField label="First Name" onChange={this.updateFormValue('firstName')} value={this.state.formVals.firstName} validations={[minNameLength, maxNameLength]} />
                <TextField label="Last Name" onChange={this.updateFormValue('lastName')} value={this.state.formVals.lastName} validations={[minNameLength, maxNameLength]} />
                <EmailField onChange={this.updateFormValue('email')} value={this.state.formVals.email} validations={[required, inmarEmail]} />
                <PasswordField onChange={this.updateFormValue('password')} value={this.state.formVals.password} validations={[required, password]} />
                <button className="btn btn-success" onClick={this.submit}>Submit</button>
            </div>
        );
    }
};