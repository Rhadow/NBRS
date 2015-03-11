'use strict';

var React = require('react'),
    // Constants
    constants = require('../constants/constants'),
    BugIntro;

BugIntro = React.createClass({
	propTypes: {
        selectedBugDescription : React.PropTypes.string,
        selectedBugStartDate   : React.PropTypes.string,
        selectedBugEndDate     : React.PropTypes.string,
        selectedBugAuthor      : React.PropTypes.string
    },
    getDefaultProps: function() {
    	return {
    		selectedBugDescription : '',
	        selectedBugStartDate   : '',
	        selectedBugEndDate     : '',
	        selectedBugAuthor      : ''
    	};
    },
    _renderStartDate: function(){
    	var resultHTML;
    	if(this.props.selectedBugStartDate){
    		resultHTML = (
    			/* jshint ignore:start */
    			<div>
                    <label>{constants.EN_LEXICON.START_DATE}</label>
                    <span className="info-value">{this.props.selectedBugStartDate}</span>
                </div>
    			/* jshint ignore:end */
    		); 
    	}
    	return resultHTML;
    },
    _renderEndDate: function(){
    	var resultHTML;
    	if(this.props.selectedBugEndDate){
    		resultHTML = (
    			/* jshint ignore:start */
    			<div>
                    <label>{constants.EN_LEXICON.END_DATE}</label>
                    <span className="info-value">{this.props.selectedBugEndDate}</span>
                </div>
    			/* jshint ignore:end */
    		); 
    	}
    	return resultHTML;
    },
	render: function() {
		return (
			/* jshint ignore:start */
			<div className="form-group bug-info">
                <label htmlFor="comment">{constants.EN_LEXICON.BUG_FORM_DESCRIPTION}</label>
                <textarea 
                    className="form-control allow-cursor"
                    disabled
                    rows="10"
                    id="comment"
                    value={this.props.selectedBugDescription}>
                </textarea>
                <div>
                    <label>{constants.EN_LEXICON.BUG_FORM_AUTHOR_NAME}</label>
                    <span className="info-value">{this.props.selectedBugAuthor}</span>
                </div>
                {this._renderStartDate()}
                {this._renderEndDate()}
            </div>
			/* jshint ignore:end */
		);
	}

});

module.exports = BugIntro;
/* Made By Rhadow.github.io */