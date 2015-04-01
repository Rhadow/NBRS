'use strict';

var React = require('react'),
    // Constants
    constants = require('../constants/constants'),
    TeamFilter;

TeamFilter = React.createClass({
	_selectedTeam: constants.EN_LEXICON.PRIORITY_ALL,
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
    	this.props.onSelectHandler(this._selectedTeam);
    },
	componentWillUpdate: function(nextProps, nextState) {
        if(nextProps.selectedProjectName !== this.props.selectedProjectName){
            this._selectedTeam = constants.EN_LEXICON.PRIORITY_ALL;            
		    this.props.onSelectHandler(this._selectedTeam);
        }
    },
	_handleSelect: function(e){
		var selectedTeam = this.refs.teamFilter.getDOMNode().value;
		this._selectedTeam = selectedTeam;
		this.forceUpdate();
		this.props.onSelectHandler(this._selectedTeam);
	},
	_renderOptions: function() {
		var resultHTML, teams = [];
		for(var i = 0; i < this.props.selectedProjectBugs.length; i++){
			if(teams.indexOf(this.props.selectedProjectBugs[i].team) < 0 && this.props.selectedProjectBugs[i].team !== undefined){
				teams.push(this.props.selectedProjectBugs[i].team);
			}
		}
		if(teams !== []){
			resultHTML = teams.map(function(team, i){
				return (
					/* jshint ignore:start */
					<option key={i}>{team}</option>
					/* jshint ignore:end */
				);
			});
		}
		return resultHTML;
	},
	render: function() {
		return (
			/* jshint ignore:start */
			<div className="team-filter">
			    <label>{constants.EN_LEXICON.BUG_FORM_AUTHOR_TEAM}</label>
	            <select 
	                ref="teamFilter" 
	                onChange={this._handleSelect} 
	                value={this._selectedTeam}>
	                <option>{constants.EN_LEXICON.PRIORITY_ALL}</option>
	                {this._renderOptions()}
	            </select>
			</div>			
            /* jshint ignore:end */
		);
	}
});

module.exports = TeamFilter;