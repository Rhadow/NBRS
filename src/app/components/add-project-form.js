'use strict';

var React      = require('react'),
    CX         = require('react/lib/cx'),
    // Constants
    constants  = require('../constants/constants'),
    // Actions
    AppActions = require('../actions/appActions'),
    AddProjectForm;

AddProjectForm = React.createClass({
    componentDidMount: function() {
        $('.add-project-form-wrapper').hide();
    },
    _addProject: function(e){
        var newProjectObj  = {},
            newProjectName = this.refs.newProjectName.getDOMNode().value;
        e.preventDefault();
        this._clearInput();
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
	render: function() {
		return (
			/*jshint ignore:start */
            <div className="add-project-form-wrapper">
                <div className="form-group">
                    <label>{constants.EN_LEXICON.PROJECT_FORM_TITLE}: </label>
                    <input
                        className="form-control project-name-input"
                        type="text"
                        maxLength={17} 
                        ref="newProjectName" 
                        data-toggle="tooltip" 
                        data-placement="top" 
                        title="Must not be empty or contain the following characters: '. # $ [ ] / \'"
                        placeholder={constants.EN_LEXICON.PROJECT_FORM_PLACEHOLDER}/>
                </div>
                <input 
                    type="button"
                    className="btn btn-success" 
                    value={constants.EN_LEXICON.CONFIRM} 
                    onClick={this._addProject} />
                <input 
                    type="button"
                    className="btn btn-warning"
                    value={constants.EN_LEXICON.CLEAR}
                    onClick={this._clearInput} />
            </div>			
            /*jshint ignore:end */
		);
	}
});

module.exports = AddProjectForm;