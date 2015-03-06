'use strict';

var React = require('react'),
    CX           = require('react/lib/cx'),
    // Constants
    constants    = require('../constants/constants'),
    // Actions
    AppActions   = require('../actions/appActions'),
    AddProjectForm;

AddProjectForm = React.createClass({
    propTypes: {},
    getDefaultProps: function() {},
    componentDidMount: function() {
        $('.add-project-form-wrapper').hide();
    },
    _addProject: function(e){
        var newProjectObj = {},
            newProjectName = this.refs.newProjectName.getDOMNode().value;
        e.preventDefault();
        this.refs.newProjectName.getDOMNode().value = '';
        if(!newProjectName || /[\.\#\$\[\]\/\\]/gi.test(newProjectName)){
            $('.project-name-input').effect('shake', {distance: 10});
            return;
        }
        newProjectObj = {
            name     : newProjectName,
            isClosed : false
        };
        $('.add-project-form-wrapper').slideUp(function(){
            $('.project-list .toggle-btn').slideDown();
        });
        AppActions.addProject(newProjectObj);
        AppActions.selectProjectByName(newProjectName);
    },
    _clearInput: function(e){
        this.refs.newProjectName.getDOMNode().value = '';                
    },
    _foldInput: function(e){        
        this._clearInput();
        $('.add-project-form-wrapper').slideUp(function(){
            $('.project-list .toggle-btn').slideDown();
        });
    },
    _showInputs: function(e){        
        $('.project-list .toggle-btn').slideUp(function(){
            $('.add-project-form-wrapper').slideDown();
        });
    },
	render: function() {
		return (
			/*jshint ignore:start */
			<div>
			    <div className="toggle-btn">
	                <input type="button" value="New Project" onClick={this._showInputs} />
	            </div>
	            <div className="add-project-form-wrapper">
	                <span>Add New Project: </span>
	                <input
	                    className="project-name-input"
	                    type="text" 
	                    ref="newProjectName" 
	                    data-toggle="tooltip" 
	                    data-placement="top" 
	                    title="Must not be empty or contain the following characters: '. # $ [ ] / \'"/>
	                <input type="button" value="Confirm" onClick={this._addProject} />
	                <input type="button" value="Clear" onClick={this._clearInput} />
	                <input type="button" value="Fold" onClick={this._foldInput} />
	            </div>
			</div>			
            /*jshint ignore:end */
		);
	}
});

module.exports = AddProjectForm;