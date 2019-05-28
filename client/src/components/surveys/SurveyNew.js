import React from 'react';
import SurveyForm from './SurveyForm';
import { reduxForm } from 'redux-form';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends React.Component {
    state = { showReview: false }
    changeReviewForm () {
        this.setState({ showReview: true });
    }
    renderContent () {
        if (this.state.showReview) {
            return (
            <SurveyFormReview
                onCancel={() => { this.setState({ showReview: false }) }}
            />
            )
        }
        return <SurveyForm onSurveySubmit={this.changeReviewForm.bind(this)}/>
    }
    render() {
        return (
            <div> 
                {this.renderContent()}
            </div>
        );
    }
}
export default reduxForm({
    form: 'surveyForm'
})(SurveyNew)