'use strict';

var React        = require('react'),
    CX           = require('react/lib/cx'),
    // Actions
    AppActions   = require('../actions/appActions'),    
    // Hash
    passwordHash = require('password-hash'),
    // Constants
    constants    = require('../constants/constants'),
    BugList;

BugList = React.createClass({
    propTypes: {
        selectedProjectName: React.PropTypes.string,
        selectedProjectBugs: React.PropTypes.array,
        selectedBugName: React.PropTypes.string,
        isSelectedProjectClosed: React.PropTypes.bool,
        combo: React.PropTypes.string
    },
    getDefaultProps: function() {
        return {
            selectedProjectName: '',
            selectedProjectBugs: [],
            selectedBugName: '',
            isSelectedProjectClosed: false,
            combo: ''
        };
    },
    componentDidUpdate: function(prevProps, prevState) {
        var thisModule = this;
        $(function () {
            $(thisModule.getDOMNode()).find('[data-toggle="tooltip"]').tooltip();
        });
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
                    <input
                        className="bug-name-input"
                        type="text" 
                        ref="newBugName"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Must not be empty or contain the following characters: '. # $ [ ] / \'"/>
                    <div className="form-group">
                        <label htmlFor="comment">Description:</label>
                        <textarea className="form-control bug-description-input" ref="newBugDescription" rows="5" id="comment"></textarea>
                    </div>
                    <select ref="priority">
                        <option>{constants.PRIORITY.LOW}</option>
                        <option>{constants.PRIORITY.MEDIUM}</option>
                        <option>{constants.PRIORITY.HIGH}</option>
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
            newDescription = this.refs.newBugDescription.getDOMNode().value,
            priority = this.refs.priority.getDOMNode().value;
        e.preventDefault();
        this.refs.priority.getDOMNode().value = constants.PRIORITY.LOW;
        if(!newBugName || /[\.\#\$\[\]\/\\]/gi.test(newBugName)){            
            this.refs.newBugName.getDOMNode().value = '';
            $('.bug-name-input').effect('shake', {distance: 10});
            return;
        }
        if(!newDescription){
            $('.bug-description-input').effect('shake', {distance: 10});
            this.refs.newBugDescription.getDOMNode().value = '';
            return;
        }        
        this.refs.newBugName.getDOMNode().value = '';
        this.refs.newBugDescription.getDOMNode().value = '';
        newBugObj = {
            name     : newBugName,
            priority : priority,
            description: newDescription
        };
        AppActions.addBug(newBugObj);
        AppActions.selectBugByName(newBugName);
    },
    _deleteBugByName: function(e){
        var bugName        = e.target.getAttribute('data-name'),
            projectName    = this.props.selectedProjectName,
            passwordInput,
            hashedPassword = passwordHash.generate(this.props.combo);
        e.preventDefault();
        e.stopPropagation();
        passwordInput = window.prompt('Please enter password to delete:');
        if(passwordHash.verify(passwordInput, hashedPassword)){
            if(this.props.isSelectedProjectClosed){
                swal('Oops...', 'project is closed!', 'error');
                return;
            }
            AppActions.deleteBug(bugName);        
            if(bugName === this.props.selectedBugName){
                AppActions.selectBugByName('');
            }
        }else{
            swal('Oops...', 'wrong password!', 'error');
        }        
    },
    _closeProject: function(e){
        var thisModule = this;
        swal({
                title: 'Close this project?',   
                text: 'You will not be able to edit this project anymore!',   
                type: 'warning',   
                showCancelButton: true,   
                confirmButtonColor: '#DD6B55',   
                confirmButtonText: 'Yes, close it!',   
                closeOnConfirm: false
            }, function(){
                AppActions.closeProject(thisModule.props.selectedProjectName);
                swal('Closed!', thisModule.props.selectedProjectName + ' has been closed.', 'success'); 
        });
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