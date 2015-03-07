'use strict';

var React = require('react'),
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
    			<div>Start Date: {this.props.selectedBugStartDate}</div>
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
    			<div>End Date: {this.props.selectedBugEndDate}</div>
    			/* jshint ignore:end */
    		); 
    	}
    	return resultHTML;
    },
	render: function() {
		return (
			/* jshint ignore:start */
			<div className="form-group">
                <label htmlFor="comment">Bug Description:</label>
                <textarea 
                    className="form-control allow-cursor" 
                    disabled 
                    rows="5" 
                    id="comment" 
                    value={this.props.selectedBugDescription}>
                </textarea>
                {this._renderStartDate()}
                {this._renderEndDate()}
                <div>Author: {this.props.selectedBugAuthor}</div>
            </div>
			/* jshint ignore:end */
		);
	}

});

module.exports = BugIntro;