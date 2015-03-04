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
        var bugsURL = 'https://nbrs.firebaseio.com/projects' + '/' + appStore.selectedProject.name + '/bugs';
        this.bindAsArray(new Firebase(bugsURL), 'selectedProjectBugs');
        this.setState({
            selectedProject: appStore.selectedProject,
            selectedProjectName: appStore.selectedProject.name,
            isSelectedProjectClosed: appStore.selectedProject.isClosed
        });
    },
    render: function() {
        return (
            /*jshint ignore:start */
            <div className="main-content-wrapper row">
                <div className="col-xs-3 project-list-wrapper">
                    <ProjectList 
                        projects={this.state.projects}/>
                </div>
                <div className="col-xs-3 bug-list-wrapper">
                    <BugList 
                        selectedProjectName={this.state.selectedProjectName}
                        selectedProjectBugs={this.state.selectedProjectBugs}
                        isSelectedProjectClosed={this.state.isSelectedProjectClosed}/>
                </div>
                <div className="col-xs-6 bug-detail-wrapper">
                    <BugDetail />
                </div>
            </div>
            /*jshint ignore:end */
        );
    }
});

module.exports = MainContent;