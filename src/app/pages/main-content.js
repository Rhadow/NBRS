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
            selectedProject: ''
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
        this.setState({
            selectedProject: appStore.selectedProject
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
                        selectedProject={this.state.selectedProject}/>
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