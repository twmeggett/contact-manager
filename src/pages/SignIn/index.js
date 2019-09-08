import React from "react";
import { withRouter } from 'react-router-dom';
import Layout from '../../layouts';
import { EmailField, PasswordField } from '../../shared/Form';
import { signInUser } from '../../API';
import { updateFormValue } from '../../utils';

export const ActionBtn = ({label, bsClass, action}) => (
    <button className={`btn btn-${bsClass}`} onClick={action}>
        {label}
    </button>
)

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formVals: {
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
        signInUser(this.state.formVals, () => {
            this.props.history.push('/');
        });
    }

    render() {
        return (
            <Layout>
                <h1>Sign In</h1>
                <EmailField onChange={this.updateFormValue('email')} value={this.state.formVals.email} />
                <PasswordField onChange={this.updateFormValue('password')} value={this.state.formVals.password} />
                <button className="btn btn-success" onClick={this.submit}>Submit</button>
            </Layout>
        );
    }
};

export default withRouter(SignUp);