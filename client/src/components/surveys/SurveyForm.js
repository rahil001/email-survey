import React from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmail';
import formFields from './formFields';

class SurveyForm extends React.Component {
    renderFields () {
        return (
            <div>
                {
                    formFields.map(({label, name}) => {
                        return (
                            <Field
                                    name={name}
                                    type="text"
                                    component={SurveyField}
                                    label={label}
                                    key={name}
                            />
                        )     
                    })
            
                }
            </div>
        )
    }
    render() {
        return (
            <form onSubmit={this.props.handleSubmit(() => { this.props.onSurveySubmit(); })} className="col s12"> 
                {this.renderFields()}
                <button type="submit" className="teal btn-flat right white-text">
                Next
                <i className="material-icons right">done</i>
                </button>
                <Link to="/surveys" className="red btn-flat white-text">
                    Cancel
                </Link>
            </form>
        );
    }
}

function validate (values) {
    const errors = {}
    const defaultText = 'You must provide a';
    if (!values.title) {
        errors.title = `${defaultText} title`;
      }
      if (!values.subject) {
        errors.subject = `${defaultText} subject`;
      }
      if (!values.body) {
        errors.body = `${defaultText} body`;
      }
      if (!values.recipients) {
        errors.recipients = `${defaultText} email`;
      }
      errors.recipients = validateEmails(values.recipients);

      return errors;
}

export default reduxForm({
    form: 'surveyForm',
    validate,
    destroyOnUnmount: false
})(SurveyForm);