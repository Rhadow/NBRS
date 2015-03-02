'use strict';

var React    = require('react'),
    // Store
    appStore = require('../stores/appStore.js'),
    BugDetail;

BugDetail = React.createClass({
    render: function() {
        /* jshint ignore:start */
        return (
            <div>
                <h2>Details</h2>
                <div>
                    Some Bug Details
                </div>
            </div>
        );
        /* jshint ignore:end */
    }

});

module.exports = BugDetail;