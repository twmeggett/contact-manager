import React from 'react';

export const createInput = (label = '', type, validations = []) => {
    class BaseInput extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                error: ''
            }
            this.handleChange = this.handleChange.bind(this);
        }
        handleChange(event) {
            const validationsArray = [...validations, ...this.props.validations];
            if (validationsArray.length > 0) {
                validationsArray.some(check => {
                    const result = check(event.target.value);
                    this.setState({
                        error: result
                    })
                    return result;
                });
            }
            this.props.onChange(event);
        };
        render() {
            return (
                <div className="form-group">
                    <label>{label || this.props.label }</label>
                    <input type={type} className="form-control" placeholder={this.props.placeholder} value={this.props.value} onChange={this.handleChange} />
                    <small className="form-text" style={{color: 'red'}}>{this.state.error}</small>
                </div>
            );
        }
    }

    BaseInput.defaultProps = {
        label: '',
        validations: [],
    }

    return BaseInput;
};