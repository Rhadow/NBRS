'use strict';

var React      = require('react'),
    CX         = require('react/lib/cx'),
    // Actions
    AppActions = require('../actions/appActions'),
    BugList;

BugList = React.createClass({
    propTypes: {
        selectedProject: React.PropTypes.string
    },
    getDefaultProps: function() {
        return {
            selectedProject: '',
            selectedProjectBugs: []
        };
    },
    _renderBugs: function(){
        var bugsHTML = this.props.selectedProjectBugs.map(function(bug, i){
            if(bug.name !== '_init'){
                return (
                    /* jshint ignore:start */
                    <li key={i}>{bug.name}</li>
                    /* jshint ignore:end */
                );
            }            
        }, this);
        return bugsHTML;
    },
    _addBug: function(e){
        var newBugObj = {},
            newBugName = this.refs.newBugName.getDOMNode().value;
        e.preventDefault();
        if(!newBugName){
            window.alert('Invalid Bug Name');
            return;
        }
        newBugObj = {
            name     : newBugName,
            isClosed : false
        };
        this.refs.newBugName.getDOMNode().value = '';
        AppActions.addBug(newBugObj);
    },
    render: function() {
        var addBugClasses = CX({
            'add-bug-wrapper': true,
            'hide': !this.props.selectedProject
        });
        /* jshint ignore:start */
        return (
            <div>
                <h2>{this.props.selectedProject} Bug List</h2>
                <div className={addBugClasses}>
                    <span>Add New Bug: </span>
                    <input type="text" ref="newBugName"/>
                    <input type="button" value="Add" onClick={this._addBug} />
                </div>
                <ul>
                    {this._renderBugs()}
                </ul>
            </div>
        );
        /* jshint ignore:end */
    }

});

module.exports = BugList;