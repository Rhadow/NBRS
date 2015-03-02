'use strict';

var React = require('react'),
    Router = require('react-router'),
    BugList;

BugList = React.createClass({    
    mixins: [Router.State],
    //propTypes: {},
    //getDefaultProps: function() {},
    //getInitialState: function() {},
    //componentWillMount: function() {},
    //componentDidMount: function() {},
    //componentWillReceiveProps: function() {},
    

    render: function() {
        /* jshint ignore:start */
        return (
            <div>
                {this.getParams().projectName} Bug List
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