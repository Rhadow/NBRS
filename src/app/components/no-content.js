'use strict';

var React = require('react');

var NoContent = React.createClass({
    propTypes: {
    	message: React.PropTypes.string
    },
    getDefaultProps: function() {
    	return {
    		message: ''
    	};
    },
	render: function() {
		return (
			/* jshint ignore:start */
			<div className="alert alert-warning" role="alert">
			    <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
			    <span className="sr-only">Error: </span>
			    <span className="no-content-message">{this.props.message}</span>
			</div>
			/* jshint ignore:end */
		);
	}

});

module.exports = NoContent;