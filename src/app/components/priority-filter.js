'use strict';

var React = require('react'),
    // Constants
    constants = require('../constants/constants'),
    PriorityFilter;

PriorityFilter = React.createClass({
	_selectedPriority: constants.EN_LEXICON.PRIORITY_ALL,
	propTypes: {
    	selectedProjectName: React.PropTypes.string,
    },
    getDefaultProps: function() {
    	return {
    		selectedProjectName: '',
    		onSelectHandler: function(){}
    	};
    },
    componentDidMount: function() {
    	this.props.onSelectHandler(this._selectedPriority);
    },
	componentWillUpdate: function(nextProps, nextState) {
        if(nextProps.selectedProjectName !== this.props.selectedProjectName){
            this._selectedPriority = constants.EN_LEXICON.PRIORITY_ALL;            
		    this.props.onSelectHandler(this._selectedPriority);
        }
    },
	_handleSelect: function(e){
		var selectedPriority = this.refs.priorityFilter.getDOMNode().value;
		this._selectedPriority = selectedPriority;
		this.forceUpdate();
		this.props.onSelectHandler(this._selectedPriority);
	},
	render: function() {
		return (
			/* jshint ignore:start */
			<div className="priority-filter">
			    <label>{constants.EN_LEXICON.PRIORITY_TITLE}</label>
	            <select 
	                ref="priorityFilter" 
	                onChange={this._handleSelect} 
	                value={this._selectedPriority}>
	                <option>{constants.EN_LEXICON.PRIORITY_ALL}</option>
	                <option>{constants.EN_LEXICON.PRIORITY_LOW}</option>
	                <option>{constants.EN_LEXICON.PRIORITY_MEDIUM}</option>
	                <option>{constants.EN_LEXICON.PRIORITY_HIGH}</option>
	                <option>{constants.EN_LEXICON.PRIORITY_SOLVED}</option>
	            </select>
			</div>			
            /* jshint ignore:end */
		);
	}

});

module.exports = PriorityFilter;