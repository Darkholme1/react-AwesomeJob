import React, { Component } from 'react';
import { createForm } from 'rc-form';
 
class Form extends Component {
  componentWillMount() {
    this.requiredDecorator = this.props.form.getFieldDecorator('required', {
      rules: [{required: true}],
    });
  }
 
  submit = () => {
    this.props.form.validateFields((error, value) => {
      console.log(error, value);
    });
  }
 
  render() {
    let errors;
    const { getFieldError } = this.props.form;
    return (
      <div>
        {this.requiredDecorator(
          <input

          />
        )}
        {(errors = getFieldError('required')) ? errors.join(',') : null}
        <button onClick={this.submit}>submit</button>
      </div>
    );
  }
}
 
export default createForm()(Form);