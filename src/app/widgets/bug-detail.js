'use strict';

var React    = require('react'),
    // Store
    appStore = require('../stores/appStore.js'),
    BugDetail;

BugDetail = React.createClass({
    propTypes: {
        selectedBugName: React.PropTypes.string,
        selectedProjectBugComments: React.PropTypes.array,
    },
    getDefaultProps: function() {
        return {
            selectedBugName: '',
            selectedProjectBugComments: [],
        };
    },
    render: function() {
        if(!this.props.selectedBugName){
            /* jshint ignore:start */
            return (
                <div>Please select a Bug</div>
            );
            /* jshint ignore:end */
        }
        /* jshint ignore:start */
        return (
            <div>
                <h2>{this.props.selectedBugName} Details</h2>
                <div>
                    Some Bug Details
                </div>
            </div>
        );
        /* jshint ignore:end */
    }

});

module.exports = BugDetail;