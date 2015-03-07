'use strict';

var React        = require('react'),
    CX           = require('react/lib/cx'),
    // Actions
    AppActions   = require('../actions/appActions'),    
    // Hash
    passwordHash = require('password-hash'),
    // Constants
    constants    = require('../constants/constants'),
    // Components
    AddBugForm   = require('../components/add-bug-form'),
    CloseProjectBtn  = require('../components/close-project-btn'),
    ToggleInputBtn = require('../components/toggle-input-btn'),
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
    _renderBugs: function(){
        var bugsHTML = this.props.selectedProjectBugs.map(function(bug, i){
            var bugStatusTagClass, cancelClass, listClass;
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
            listClass = CX({
                'highlight': bug.name === this.props.selectedBugName
            });
            return (
                /* jshint ignore:start */
                <li className={listClass} key={i} id={bug.name} onClick={this._onBugSelect}>
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
    _onBugSelect: function(e){
        var selectedBugName = $(e.target).closest('li')[0].id;
        e.preventDefault();
        if(!$(e.target).hasClass('cancel-icon')){
            AppActions.selectBugByName(selectedBugName);
        }
    },
    _renderInputs: function(){
        var resultHTML;
        if(!this.props.isSelectedProjectClosed){
            resultHTML = (
                /* jshint ignore:start */
                <div>
                    <ToggleInputBtn 
                        target=".add-bug-form-wrapper"
                        displayText="New Bug" />
                    <AddBugForm selectedProjectName={this.props.selectedProjectName}/>
                    <CloseProjectBtn selectedProjectName={this.props.selectedProjectName} />
                </div>                
                /* jshint ignore:end */
            );
        }
        return resultHTML;
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
                {this._renderInputs()}
                <ul className="bugs">
                    {this._renderBugs()}
                </ul>
            </div>
            /* jshint ignore:end */
        );        
    }
});

module.exports = BugList;