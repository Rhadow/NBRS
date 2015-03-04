'use strict';

var React      = require('react'),
    CX         = require('react/lib/cx'),
    // Actions
    AppActions = require('../actions/appActions'),
    // Constants
    constants  = require('../constants/constants'),
    BugList;

BugList = React.createClass({
    propTypes: {
        selectedProjectName: React.PropTypes.string,
        selectedProjectBugs: React.PropTypes.array,
        selectedBugName: React.PropTypes.string,
        isSelectedProjectClosed: React.PropTypes.bool
    },
    getDefaultProps: function() {
        return {
            selectedProjectName: '',
            selectedProjectBugs: [],
            selectedBugName: '',
            isSelectedProjectClosed: false
        };
    },
    componentDidUpdate: function(prevProps, prevState) {
        if((prevProps.selectedProjectName !== this.props.selectedProjectName) && this.refs.newBugName){
            this.refs.newBugName.getDOMNode().value = '';
            this.refs.priority.getDOMNode().value = constants.PRIORITY.LOW;
        }        
    },
    _renderBugInputs:function(){
        var resultHTML, addBugClasses;       
        addBugClasses = CX({
            'add-bug-form-wrapper': true,
            'hide': !this.props.selectedProjectName
        });
        if(!this.props.isSelectedProjectClosed){
            resultHTML = (
                /*jshint ignore:start */
                <div className={addBugClasses}>
                    <span>Add New Bug: </span>
                    <input type="text" ref="newBugName"/>
                    <select ref="priority">
                        <option>{constants.PRIORITY.LOW}</option>
                        <option>{constants.PRIORITY.MEDIUM}</option>
                        <option>{constants.PRIORITY.HIGH}</option>
                        <option>{constants.PRIORITY.SOLVED}</option>
                    </select>
                    <input type="button" value="Add" onClick={this._addBug} />
                    <input className="btn btn-danger" type="button" value="Close Project" onClick={this._closeProject} />
                </div>
                /*jshint ignore:end */
            );
        }        
        return resultHTML;
    },
    _renderBugs: function(){
        var bugsHTML = this.props.selectedProjectBugs.map(function(bug, i){
            var bugStatusTagClass, cancelClass;
            bugStatusTagClass = CX({
                'label': true,
                'label-success': bug.priority === constants.PRIORITY.SOLVED,
                'label-primary': bug.priority === constants.PRIORITY.LOW,
                'label-warning': bug.priority === constants.PRIORITY.MEDIUM,
                'label-danger': bug.priority === constants.PRIORITY.HIGH,
            });
            cancelClass = CX({
                'cancel-icon': true,
                'hide': this.props.isSelectedProjectClosed
            });
            return (
                /* jshint ignore:start */
                <li key={i} id={bug.name} onClick={this._onBugSelect}>
                    {bug.name}
                    <i className={bugStatusTagClass}>{bug.priority}</i>
                    <i className={cancelClass} data-name={bug.name} onClick={this._deleteBugByName}></i>
                </li>
                /* jshint ignore:end */
            );
        }, this);
        if(this.props.selectedProjectBugs.length === 0){
            bugsHTML = (
                /* jshint ignore:start */
                <div>There are no bugs in {this.props.selectedProjectName}</div>
                /* jshint ignore:end */
            );
        }
        return bugsHTML;
    },
    _addBug: function(e){
        var newBugObj = {},
            newBugName = this.refs.newBugName.getDOMNode().value,
            priority = this.refs.priority.getDOMNode().value;
        e.preventDefault();
        this.refs.newBugName.getDOMNode().value = '';
        this.refs.priority.getDOMNode().value = constants.PRIORITY.LOW;
        if(!newBugName || /[\.\#\$\[\]\/\\]/gi.test(newBugName)){
            window.alert('Invalid Bug Name');
            return;
        }
        newBugObj = {
            name     : newBugName,
            priority : priority
        };
        AppActions.addBug(newBugObj);
        AppActions.selectBugByName(newBugName);
    },
    _deleteBugByName: function(e){
        var bugName     = e.target.getAttribute('data-name'),
            projectName = this.props.selectedProjectName;
        e.preventDefault();
        e.stopPropagation();
        if(this.props.isSelectedProjectClosed){
            window.alert('Project is closed!');
            return;
        }
        AppActions.deleteBug(bugName);        
        if(bugName === this.props.selectedBugName){
            AppActions.selectBugByName('');
        } 
    },
    _closeProject: function(e){
        var confirmClose = window.confirm('Close this project?');
        if(confirmClose){
            AppActions.closeProject(this.props.selectedProjectName);
        }
    },
    _onBugSelect: function(e){
        var selectedBugName = $(e.target).closest('li')[0].id;
        e.preventDefault();
        if(!$(e.target).hasClass('cancel-icon')){
            AppActions.selectBugByName(selectedBugName);
        } 
    },
    render: function() {
        if(!this.props.selectedProjectName){
            /* jshint ignore:start */
            return (
                <div className="bug-list">Please select a Project</div>
            );
            /* jshint ignore:end */
        }        
        return (
            /* jshint ignore:start */
            <div className="bug-list">
                <h2>{this.props.selectedProjectName} Bug List</h2>
                {this._renderBugInputs()}
                <ul className="bugs">
                    {this._renderBugs()}
                </ul>
            </div>
            /* jshint ignore:end */
        );        
    }
});

module.exports = BugList;