import React from 'react';
import Landing from '../../assets/images/landing.svg'
import { useHistory, useLocation } from 'react-router-dom';

export const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        fakeAuth.isAuthenticated = true;
        setTimeout(cb, 100); // fake async
    },
    signout(cb) {
        fakeAuth.isAuthenticated = false;
        setTimeout(cb, 100);
    },
};

export default function Layout() {
    const history = useHistory();
    const location = useLocation();

    const { from } = location.state || { from: { pathname: '/' } };
    const login = () => {
        fakeAuth.authenticate(() => {
            history.replace(from);
        });
    };

    return (
        <div>
            <p>You must log in to view the page at {from.pathname}</p>
            <button onClick={login}>Log in</button>
            <img src={Landing} />
        </div>
    );
}
