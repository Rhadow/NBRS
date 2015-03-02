'use strict';

var React = require('react'),
    // Store
    appStore = require('../stores/appStore'),
    // Widgets
    ProjectList = require('../widgets/project-list'),
    BugList = require('../widgets/bug-list'),
    BugDetail = require('../widgets/bug-detail'),
    MainContent;

MainContent = React.createClass({
    getInitialState: function() {
        return {
            projects: appStore.getProjectList()
        };
    },
    componentWillMount: function(){
        appStore.addChangeListener(this._onDataUpdate);
    },
    componentWillUnmount: function(){
        appStore.removeChangeListener(this._onDataUpdate);
    },
    _onDataUpdate: function(){
        this.setState({
            projects: appStore.getProjectList()
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
                    <BugList />
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