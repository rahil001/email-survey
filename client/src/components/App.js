import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';

class App extends React.Component {

    componentDidMount() {
        this.props.getUserDetails();
    }
    render () {
        return (
            <div className="container">
                <BrowserRouter>
                    <Header auth={this.props.auth} />
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/surveys" component={Dashboard} />
                    <Route path="/surveys/new" component={SurveyNew} />
                </BrowserRouter>
            </div>
        );
    }
};

function mapStateToProps({ auth }) {
    return {
        auth
    }
}

export default connect(mapStateToProps, actions)(App);
