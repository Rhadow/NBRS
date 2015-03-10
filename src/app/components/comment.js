'use strict';

var React = require('react'),
    Comment;

Comment = React.createClass({
	_intervalStamp: '',
	propTypes: {
		detail: React.PropTypes.object
	},
	getDefaultProps: function() {
		return {
			detail: {}
		};
	},
	componentDidMount: function() {
		var thisModule = this;
		this._intervalStamp = window.setInterval(function(){
			thisModule.forceUpdate();
		}, 60000);
	},
	componentWillUnmount: function() {
		window.clearInterval(this._intervalStamp);
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
			    <div className="comment-header">
			        <div className="comment-author">{this.props.detail.author}</div>
			        <div className="comment-time">{this._fromNow()}</div>
			    </div>
			    <div className="comment-body">
			        {this.props.detail.description}
			    </div>
			</div>
			/* jshint ignore:end */
		);
	}

});

module.exports = Comment;