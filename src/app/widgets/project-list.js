'use strict';

var React      = require('react'),
    CX         = require('react/lib/cx'),
    // Actions
    AppActions = require('../actions/appActions'),
    ProjectList;

ProjectList = React.createClass({
    propTypes: {
        projects: React.PropTypes.array.isRequired
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
                <li key={i}>
                    {project.name}
                    <i className='cancel-icon' data-name={project.name} onClick={this._deleteProjectByName}></i>
                    <i className={projectClosedClass}>Project Closed</i>
                </li>
                /*jshint ignore:end */
            );
        }, this);
        return resultHTML;
    },
    _deleteProjectByName: function(e){
        var name = e.target.getAttribute('data-name');
        e.preventDefault();
        AppActions.deleteProject(name);
    },
    _addProject: function(e){
        var newProjectObj = {},
            newProjectName = this.refs.newProjectName.getDOMNode().value;
        e.preventDefault();
        if(!newProjectName){
            alert('Invalid Project Name');
            return;
        }        
        newProjectObj.name = newProjectName;
        newProjectObj.isClosed = false;
        this.refs.newProjectName.getDOMNode().value = '';
        AppActions.addProject(newProjectObj);
        
    },
    render: function() {
        return (
            /*jshint ignore:start */
            <div className="project-list">
                <h2>Project List</h2>
                <div className="add-project-wrapper">
                    <span>Add New Project: </span>
                    <input type="text" ref="newProjectName"/>
                    <input type="button" value="Add" onClick={this._addProject} />
                </div>
                <ul className='projects'>
                    {this._renderProjects()}
                </ul>
            </div>
            /*jshint ignore:end */
        );
    }

});

module.exports = ProjectList;