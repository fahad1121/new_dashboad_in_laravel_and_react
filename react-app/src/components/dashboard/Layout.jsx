import React from 'react';
import Header from './partials/Header';

const Layout = ({ children }) => {
    return (
        <div className="wrapper">
            <Header />
            { children }
        </div>
    );
};

export default Layout;
