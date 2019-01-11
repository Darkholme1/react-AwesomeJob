import React, { Component } from 'react';
import { createForm, formShape } from 'rc-form';

class Form extends Component {
    static propTypes = {
        form: formShape,
    };

    submit = () => {
        this.props.form.validateFields((error, value) => {
            console.log(error, value);
        });
    }

    render() {
        let errors;
        const { getFieldProps, getFieldError } = this.props.form;
        return (
            <div>
                <input {...getFieldProps('username')} />
                <input {...getFieldProps('password', {
                    rules: [{ required: true }],
                })} />
                {(errors = getFieldError('password')) ? errors.join(',') : null}
                <button onClick={this.submit}>submit</button>
            </div>
        );
    }
}
 
export default createForm()(Form);