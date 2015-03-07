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
                        <span className="navbar-title">Bug Report System</span>
                    </a> 
                </nav>
                <RouteHandler/>              
            </div>
            /* jshint ignore:end */
        );
    }
});

module.exports = Main;