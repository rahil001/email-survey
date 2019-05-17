import React from 'react';
import { Link } from 'react-router-dom';
import Payments from './Payments';

export default class Header extends React.Component {
    renderContent () {
        const auth = this.props.auth;
        const credits = auth && auth.credits;
        switch(auth) {
            case null:
                return;
            case false:
                return <li><a href="/auth/google" key="1">Login with Google</a></li>
            default:
            return [
                <li key="2"><Payments /></li>,
                <li key="1" style={{ margin: '0 10px' }}>Credits {credits}</li>,
                <li key="3"><a href="/api/logout">Logout</a></li>
            ]
        }
    }
    render () {
        return (
            <nav>
                <div className="nav-wrapper">
                <Link
                    to={this.props.user ? '/surveys' : '/'}
                    className="brand-logo"
                >
                    Emaily
                </Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    { this.renderContent() }
                </ul>
                </div>
            </nav>
        )
    }
}
