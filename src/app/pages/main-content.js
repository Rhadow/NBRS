'use strict';

var React = require('react'),
    // Store
    appStore = require('../stores/appStore'),
    // Widgets
    ProjectList = require('../widgets/project-list'),
    BugList = require('../widgets/bug-list'),
    BugDetail = require('../widgets/bug-detail'),
    // Firebase
    Firebase = require('firebase'),
    ReactFireMixin = require('reactfire'),
    MainContent;

MainContent = React.createClass({
    mixins: [ReactFireMixin],
    getInitialState: function() {
        return {
            projects: [],
            selectedProject: {},
            selectedProjectName: '',
            selectedProjectBugs: [],
            selectedProjectBugComments: [],
            selectedBug: {},
            selectedBugName: '',
            isSelectedProjectClosed: false
        };
    },
    componentWillMount: function(){
        this.bindAsArray(new Firebase('https://nbrs.firebaseio.com/projects'), 'projects');
        appStore.addChangeListener(this._onDataUpdate);
    },
    componentWillUnmount: function(){
        this.unbind('projects');
        appStore.removeChangeListener(this._onDataUpdate);
    },
    _onDataUpdate: function(){
        var bugsURL, commentsURL;
        if(appStore.selectedProject.name){
            bugsURL = 'https://nbrs.firebaseio.com/projects' + '/' + appStore.selectedProject.name + '/bugs';
            this.bindAsArray(new Firebase(bugsURL), 'selectedProjectBugs');
        }
        if(appStore.selectedBug.name){
            commentsURL = 'https://nbrs.firebaseio.com/projects' + '/' + appStore.selectedProject.name + '/bugs/' + appStore.selectedBug.name + '/comments';
            this.bindAsArray(new Firebase(commentsURL), 'selectedProjectBugComments');
        }
        this.setState({
            selectedProject: appStore.selectedProject,
            selectedProjectName: appStore.selectedProject.name,
            isSelectedProjectClosed: appStore.selectedProject.isClosed,
            selectedBug: appStore.selectedBug,
            selectedBugName: appStore.selectedBug.name,
            selectedBugPriority: appStore.selectedBug.priority
        });
    },
    render: function() {
        return (
            /*jshint ignore:start */
            <div className="main-content-wrapper row">
                <div className="col-xs-3 project-list-wrapper">
                    <ProjectList 
                        projects={this.state.projects}
                        selectedProjectName={this.state.selectedProjectName}/>
                </div>
                <div className="col-xs-3 bug-list-wrapper">
                    <BugList 
                        selectedProjectName={this.state.selectedProjectName}
                        selectedProjectBugs={this.state.selectedProjectBugs}
                        selectedBugName={this.state.selectedBugName}
                        isSelectedProjectClosed={this.state.isSelectedProjectClosed}/>
                </div>
                <div className="col-xs-6 bug-detail-wrapper">
                    <BugDetail 
                        selectedBugName={this.state.selectedBugName}
                        selectedProjectBugComments={this.state.selectedProjectBugComments}
                        selectedBugPriority={this.state.selectedBugPriority}
                        isSelectedProjectClosed={this.state.isSelectedProjectClosed}/>
                </div>
            </div>
            /*jshint ignore:end */
        );
    }
});

module.exports = MainContent;