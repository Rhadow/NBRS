'use strict';

var React = require('react'),
    CX           = require('react/lib/cx'),
    // Constants
    constants    = require('../constants/constants'),
    // Actions
    AppActions   = require('../actions/appActions'),
    AddCommentForm;

AddCommentForm = React.createClass({
    propTypes: {},
    getDefaultProps: function() {},
    _addComment: function(){},
    _clearInput: function(){},
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