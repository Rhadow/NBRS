'use strict';

var React = require('react'),
    CX           = require('react/lib/cx'),
    // Constants
    constants    = require('../constants/constants'),
    // Actions
    AppActions   = require('../actions/appActions'),
    AddBugForm;

AddBugForm = React.createClass({
	mixins: [],
    propTypes: {
    	selectedProjectName: React.PropTypes.string,
    },
    getDefaultProps: function() {
    	return {
    		selectedProjectName: '',
    	};
    },
    _addBug: function(e){
        var newBugObj = {},
            newBugName = this.refs.newBugName.getDOMNode().value,
            newDescription = this.refs.newBugDescription.getDOMNode().value,
            startDate = this.refs.startDate.getDOMNode().value,
            endDate = this.refs.endDate.getDOMNode().value,
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
        console.log(typeof startDate, endDate);
        this._clearInput();
        newBugObj = {
            name     : newBugName,
            priority : priority,
            description: newDescription
        };
        AppActions.addBug(newBugObj);
        AppActions.selectBugByName(newBugName);
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
    _clearInput: function(e){
        this.refs.newBugName.getDOMNode().value = '';
        this.refs.newBugDescription.getDOMNode().value = '';
        this.refs.startDate.getDOMNode().value = '';
        this.refs.endDate.getDOMNode().value = '';
    },
	render: function() {
		var addBugClasses = CX({
            'add-bug-form-wrapper': true,
            'hide': !this.props.selectedProjectName
        });
		return (
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
                    <label>Description:</label>
                    <textarea 
                        className="form-control bug-description-input" 
                        ref="newBugDescription" 
                        rows="5"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Must not be empty">
                    </textarea>
                </div>
                <div className="form-group">
                    <label>Start Date:</label>
                    <div className='input-group date' id='bug-start-time-picker'>
                        <input type='text' className="form-control" ref="startDate"/>
                        <span className="input-group-addon"><span className="glyphicon glyphicon-calendar"></span>
                        </span>
                    </div>
                </div>
                <div className="form-group">
                    <label>End Date:</label>
                    <div className='input-group date' id='bug-end-time-picker'>
                        <input type='text' className="form-control" ref="endDate"/>
                        <span className="input-group-addon"><span className="glyphicon glyphicon-calendar"></span>
                        </span>
                    </div>
                </div>
                <select ref="priority">
                    <option>{constants.PRIORITY.LOW}</option>
                    <option>{constants.PRIORITY.MEDIUM}</option>
                    <option>{constants.PRIORITY.HIGH}</option>
                </select>
                <input type="button" value="Add" onClick={this._addBug} />
                <input type="button" value="Clear" onClick={this._clearInput} />
                <input className="btn btn-danger" type="button" value="Close Project" onClick={this._closeProject} />
            </div>
            /*jshint ignore:end */
		);
	}
});

module.exports = AddBugForm;