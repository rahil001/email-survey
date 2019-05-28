import React from 'react';
import formFields from './formFields';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions/index';

const SurveyFormReview  = ({ onCancel, surveyForm: { values }, submitSurvey, history }) => {
    return (
        <div>
            <h5>Please confirm your enteries</h5>
            { formFields.map(({ label, name }) => {
                return (
                    <div key={`name-${name}`}>
                        <label>{label}</label>
                        <div>{values[name]}</div>
                    </div>
                );
            })}
            <button
                className="yellow darken-3 white-text btn-flat"
                onClick= {onCancel}
            >
                Back
            </button>
            <button
                className="green white-text right btn-flat"
                onClick= {() => { submitSurvey(values, history); }}
            >
                Send Survey
                <i className="material-icons right">email</i>
            </button>
        </div>
    )
}
const mapStateToProps = ({form : { surveyForm }}) => {
    return {
        surveyForm
    }
}
export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
