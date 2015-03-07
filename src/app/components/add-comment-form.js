'use strict';

var React = require('react'),
    CX           = require('react/lib/cx'),
    // Constants
    constants    = require('../constants/constants'),
    // Actions
    AppActions   = require('../actions/appActions'),
    AddCommentForm;

AddCommentForm = React.createClass({
    propTypes: {
        selectedBugName: React.PropTypes.string
    },
    getDefaultProps: function() {
        return {
            selectedBugName: ''
        };        
    },
    componentDidMount: function(prevProps, prevState) {
        $('.add-comment-form-wrapper').hide();
    },
    componentWillUpdate: function(nextProps, nextState) {
        if(nextProps.selectedBugName !== this.props.selectedBugName){
            $('.add-comment-form-wrapper').slideUp();
            this._clearInput();
        }        
    },
    _addComment: function(e){
        var newCommentObj = {},
            author = this.refs.newCommentAuthor.getDOMNode().value,
            description = this.refs.newCommentDescription.getDOMNode().value;
        e.preventDefault();
        if(!author){
            $('.comment-author-input').effect('shake', {distance: 10});
            this.refs.newCommentAuthor.getDOMNode().value = '';
            return;
        }
        if(!description){
            $('.comment-description-input').effect('shake', {distance: 10});
            this.refs.newCommentDescription.getDOMNode().value = '';
            return;
        }
        $('.add-comment-form-wrapper').slideUp();
        this._clearInput();
        newCommentObj = {
            author: author,
            description: description,
            postYear: new Date().getFullYear(),
            postMonth: new Date().getMonth(),
            postDay: new Date().getDate(),
            postHour: new Date().getHours(),
            postMinute: new Date().getMinutes(),
            postSecond: new Date().getSeconds()
        };
        AppActions.addComment(newCommentObj);
    },
    _clearInput: function(e){
        this.refs.newCommentAuthor.getDOMNode().value = '';
        this.refs.newCommentDescription.getDOMNode().value = '';
    },
	render: function() {
		var addCommentClasses = CX({
            'add-comment-form-wrapper': true
        });
		/* jshint ignore:start */
		return (
			<div className={addCommentClasses}>
                <div className="form-group">
			        <label>Author</label>
			        <input
			            className="form-control comment-author-input"
	                    type="text" 
	                    ref="newCommentAuthor"
	                    data-toggle="tooltip"
	                    data-placement="top"
	                    title="Must not be empty"
			            placeholder="Enter author name"/>
			    </div>
                <div className="form-group">
                    <label>Description:</label>
                    <textarea 
                        className="form-control comment-description-input" 
                        ref="newCommentDescription" 
                        rows="5"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Must not be empty"
                        placeholder="Enter description">
                    </textarea>
                </div>
                <input type="button" value="Add" onClick={this._addComment} />
                <input type="button" value="Clear" onClick={this._clearInput} />
			</div>
		);
		/* jshint ignore:end */
	}

});

module.exports = AddCommentForm;