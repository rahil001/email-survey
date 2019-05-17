import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';

const Dashboard = () => {
    return ( <h2>Dashboard</h2>);
}
const SurveyNew = () => {
    return ( <h2>SurveyNew</h2>);
}

class App extends Component {

    componentDidMount() {
        this.props.getUserDetails();
    }
    render () {
        return (
            <div className="container">
                <BrowserRouter>
                    <Header auth={this.props.auth} />
                    <Route exact path="/" component={Landing}/>
                    <Route exact path="/surveys" component={Dashboard}/>
                    <Route path="/surveys/new" component={SurveyNew}/>
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
