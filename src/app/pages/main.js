'use strict';

var React        = require('react'),
    Router       = require('react-router'),
    // Router Methods
    Route        = Router.Route,
    RouteHandler = Router.RouteHandler,
    Main;

Main = React.createClass({
    render: function() {
        return (
            /* jshint ignore:start */
            <div className="content-wrapper">
                <nav className="navbar navbar-inverse navbar-fixed-top">
                    <a className="navbar-brand" href="#/">
                        <img className="company-logo" src="../assets/images/nexcom_icon.jpg"/>
                        <span className="navbar-title">Bug 回報系統</span>
                    </a>                    
                    <ul className="nav navbar-nav">
                        <li className="active"><a href="#/project">專案列表</a></li>
                        <li><a href="#/test">測試連結</a></li>
                    </ul>
                </nav>
                <RouteHandler/>              
            </div>
            /* jshint ignore:end */
        );
    }
});

module.exports = Main;