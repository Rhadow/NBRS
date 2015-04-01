'use strict';

var React = require('react'),
    // Constants
    constants = require('../constants/constants'),
    AuthorFilter;

AuthorFilter = React.createClass({
	_selectedAuthor: constants.EN_LEXICON.PRIORITY_ALL,
	propTypes: {
    	selectedProjectName: React.PropTypes.string,
    	selectedProjectBugs: React.PropTypes.array
    },
    getDefaultProps: function() {
    	return {
    		selectedProjectName: '',
    		selectedProjectBugs: [],
    		onSelectHandler: function(){}
    	};
    },
    componentDidMount: function() {
    	this.props.onSelectHandler(this._selectedAuthor);
    },
	componentWillUpdate: function(nextProps, nextState) {
        if(nextProps.selectedProjectName !== this.props.selectedProjectName){
            this._selectedAuthor = constants.EN_LEXICON.PRIORITY_ALL;            
		    this.props.onSelectHandler(this._selectedAuthor);
        }
    },
	_handleSelect: function(e){
		var selectedAuthor = this.refs.authorFilter.getDOMNode().value;
		this._selectedAuthor = selectedAuthor;
		this.forceUpdate();
		this.props.onSelectHandler(this._selectedAuthor);
	},
	_renderOptions: function() {
		var resultHTML, authors = [];
		for(var i = 0; i < this.props.selectedProjectBugs.length; i++){
			if(authors.indexOf(this.props.selectedProjectBugs[i].author) < 0){
				authors.push(this.props.selectedProjectBugs[i].author);
			}
		}
		if(authors !== []){
			resultHTML = authors.map(function(author, i){
				return (
					/* jshint ignore:start */
					<option key={i}>{author}</option>
					/* jshint ignore:end */
				);
			});
		}
		return resultHTML;
	},
	render: function() {
		return (
			/* jshint ignore:start */
			<div className="author-filter">
			    <label>{constants.EN_LEXICON.AUTHOR_TITLE}</label>
	            <select 
	                ref="authorFilter" 
	                onChange={this._handleSelect} 
	                value={this._selectedAuthor}>
	                <option>{constants.EN_LEXICON.PRIORITY_ALL}</option>
	                {this._renderOptions()}
	            </select>
			</div>			
            /* jshint ignore:end */
		);
	}
});

module.exports = AuthorFilter;