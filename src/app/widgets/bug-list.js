'use strict';

var React    = require('react'),
    // Store
    appStore = require('../stores/appStore.js'),
    BugList;

BugList = React.createClass({
    render: function() {
        /* jshint ignore:start */
        return (
            <div>
                <h2>Bug List</h2>
                <ul>
                    <li><a href="#/detail/A/1">A</a></li>
                    <li><a href="#/detail/B/2">B</a></li>
                    <li><a href="#/detail/C/3">C</a></li>
                </ul>
            </div>
        );
        /* jshint ignore:end */
    }

});

module.exports = BugList;