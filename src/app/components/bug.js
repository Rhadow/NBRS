'use strict';

var React        = require('react'),
    CX           = require('react/lib/cx'),
    // Actions
    AppActions   = require('../actions/appActions'),    
    // Hash
    passwordHash = require('password-hash'),
    // Constants
    constants    = require('../constants/constants'),
    Bug;

Bug = React.createClass({
	propTypes: {
		selectedProjectName     : React.PropTypes.string,
		bugDetail               : React.PropTypes.object,
		selectedBugName         : React.PropTypes.string,
        isSelectedProjectClosed : React.PropTypes.bool,
        combo                   : React.PropTypes.string
	},
	getDefaultProps: function() {
		return {
			selectedProjectName     : '',
			bugDetail               : {},
			selectedBugName         : '',
            isSelectedProjectClosed : false,
            combo                   : ''
		};
	},
	_deleteBugByName: function(e){
        var bugName        = e.target.getAttribute('data-name'),
            projectName    = this.props.selectedProjectName,
            hashedPassword = passwordHash.generate(this.props.combo),
            passwordInput;
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
        var selectedBugName = $(e.target).closest('div')[0].id;
        e.preventDefault();
        if(!$(e.target).hasClass('cancel-icon')){
            AppActions.selectBugByName(selectedBugName);
        }
    },

	render: function() {
		var bugStatusTagClass, cancelClass, bugClass;

		if(this.props.bugDetail.priority){
			bugStatusTagClass = CX({
                'label'         : true,
                'label-success' : this.props.bugDetail.priority === constants.PRIORITY.SOLVED,
                'label-primary' : this.props.bugDetail.priority === constants.PRIORITY.LOW,
                'label-warning' : this.props.bugDetail.priority === constants.PRIORITY.MEDIUM,
                'label-danger'  : this.props.bugDetail.priority === constants.PRIORITY.HIGH,
            });
            cancelClass = CX({
                'cancel-icon' : true,
                'hide'        : this.props.isSelectedProjectClosed
            });
            bugClass = CX({
                'highlight': this.props.bugDetail.name === this.props.selectedBugName
            });
		}
            
		return (
			/* jshint ignore:start */
			<div className={bugClass} id={this.props.bugDetail.name} onClick={this._onBugSelect}>
                {this.props.bugDetail.name}
                <i className={bugStatusTagClass}>{this.props.bugDetail.priority}</i>
                <i 
                    className={cancelClass} 
                    data-name={this.props.bugDetail.name} 
                    onClick={this._deleteBugByName}></i>
            </div>
			/* jshint ignore:end */
		);
	}

});

module.exports = Bug;