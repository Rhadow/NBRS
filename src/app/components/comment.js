'use strict';

var React = require('react'),
    Comment;

Comment = React.createClass({

	propTypes: {
		detail: React.PropTypes.object
	},

	getDefaultProps: function() {
		return {
			detail: {}
		};
	},
	_fromNow: function(){
		return moment([
			this.props.detail.postYear, 
			this.props.detail.postMonth,
			this.props.detail.postDay,
			this.props.detail.postHour,
			this.props.detail.postMinute,
			this.props.detail.postSecond
		 ]).fromNow();
	},
	render: function() {
		return (
			/* jshint ignore:start */
			<div className="comment">
			    <div>
			        {this.props.detail.description}
			    </div>
			    <div>
			        Message leave by: {this.props.detail.author} on {this._fromNow()}
			    </div>
			</div>
			/* jshint ignore:end */
		);
	}

});

module.exports = Comment;