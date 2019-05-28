import React from 'react';

const SurveyField = ({ input, label, meta }) => {
    const { error, touched } = meta;
    return (
        <div className="row">
            <div className="input-field col s12">
            <input {...input} style={{marginBottom: '5px'}} className="validate" placeholder={label} />
            <div className="red-text" style={{marginBottom: '20px'}}>
                {touched && error}
            </div>
            </div>
        </div>
    )
}
export default SurveyField;
