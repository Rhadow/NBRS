'use strict';

var React      = require('react'),
    CX         = require('react/lib/cx'),
    // Actions
    AppActions = require('../actions/appActions'),
    ProjectList;

ProjectList = React.createClass({
    propTypes: {
        projects: React.PropTypes.array.isRequired,
        selectedProjectName: React.PropTypes.string
    },
    getDefaultProps: function() {
        return {
            selectedProjectName: ''
        };
    },
    _renderProjectInputs: function(){
        var resultHTML = (
            /*jshint ignore:start */
            <div className="add-project-form-wrapper">
                <span>Add New Project: </span>
                <input type="text" ref="newProjectName"/>
                <input type="button" value="Add" onClick={this._addProject} />
            </div>
            /*jshint ignore:end */
        );
        return resultHTML;
    },
    _renderProjects: function(){
        var resultHTML = this.props.projects.map(function(project, i){
            var projectClosedClass = CX({
                'label': true,
                'label-danger': true,
                'hide': !project.isClosed
            });
            return (
                /*jshint ignore:start */
                <li key={i} id={project.name} onClick={this._onProjectSelect}>
                    {project.name}
                    <i className={projectClosedClass}>Project Closed</i>
                    <i className='cancel-icon' data-name={project.name} onClick={this._deleteProjectByName}></i>
                </li>
                /*jshint ignore:end */
            );
        }, this);
        return resultHTML;
    },
    _deleteProjectByName: function(e){
        var name = e.target.getAttribute('data-name');
        e.preventDefault();
        e.stopPropagation();
        AppActions.deleteProject(name);
        if(name === this.props.selectedProjectName){
            AppActions.selectProjectByName('');
            AppActions.selectBugByName('');
        }        
    },
    _addProject: function(e){
        var newProjectObj = {},
            newProjectName = this.refs.newProjectName.getDOMNode().value;
        e.preventDefault();
        this.refs.newProjectName.getDOMNode().value = '';
        if(!newProjectName || /[\.\#\$\[\]\/\\]/gi.test(newProjectName)){
            window.alert('Invalid Project Name');
            return;
        }
        newProjectObj = {
            name     : newProjectName,
            isClosed : false
        };
        AppActions.addProject(newProjectObj);
        AppActions.selectProjectByName(newProjectName);
    },
    _onProjectSelect: function(e){
        var selectedProjectName = $(e.target).closest('li')[0].id;
        e.preventDefault();
        if(!$(e.target).hasClass('cancel-icon')){
            AppActions.selectProjectByName(selectedProjectName);
        }   
    },
    render: function() {
        return (
            /*jshint ignore:start */
            <div className="project-list">
                <h2>Project List</h2>
                {this._renderProjectInputs()}
                <ul className='projects'>
                    {this._renderProjects()}
                </ul>
            </div>
            /*jshint ignore:end */
        );
    }

});

module.exports = ProjectList;