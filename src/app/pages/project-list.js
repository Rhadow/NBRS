'use strict';

var React = require('react'),
    Router        = require('react-router'),
    UserList = require('../../app/components/UserList.js'),
    Input = require('../../app/components/Input.js'),
    appStore = require('../stores/appStore.js'),
    // Router Methods
    Route         = Router.Route,
    RouteHandler  = Router.RouteHandler,
    ProjectList;

ProjectList = React.createClass({
    getInitialState: function(){
        return {
            users: appStore.getUserList()
        };        
    },
    componentWillMount: function(){
        appStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function(){
        appStore.removeChangeListener(this._onChange);
    },
    _onChange: function(){
        this.setState({
            users: appStore.getUserList()
        });
    },
    render: function() {
        return (
            /*jshint ignore:start */
            <div className="main-content-wrapper row">
                <div className="col-xs-4 project-list-wrapper">
                    專案列表
                    <ul>
                        <li><a href="#/project/NEXT511">NEXT511</a></li>
                        <li><a href="#/project/COWA328">COWA328</a></li>
                        <li><a href="#/project/POLI567">POLI567</a></li>
                    </ul>
                </div>
                <div className="col-xs-8 bug-list-wrapper">             
                    <RouteHandler/>
                </div>
            </div>
            /*jshint ignore:end */
        );
    }

});

module.exports = ProjectList;