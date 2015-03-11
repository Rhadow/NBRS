'use strict';

var React        = require('react'),
    Router       = require('react-router'),
    // Constants
    constants    = require('../constants/constants'),
    // Router Methods
    Route        = Router.Route,
    RouteHandler = Router.RouteHandler,
    Main;

Main = React.createClass({
    render: function() {
        return (
            /* jshint ignore:start */
            <div className="content-wrapper">
                <nav className="navbar navbar-default navbar-fixed-top">
                    <div className='hide maker'>All rights reserved to Howard Chang</div>
                    <a className="navbar-brand" href="#/">
                        <span className="navbar-title">{constants.CH_LEXICON.NAV_TITLE}</span>
                    </a> 
                </nav>
                <RouteHandler/>              
            </div>
            /* jshint ignore:end */
        );
    }
});

module.exports = Main;