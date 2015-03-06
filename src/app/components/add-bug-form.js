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
    componentDidMount: function(prevProps, prevState) {
        $('.add-bug-form-wrapper').hide();
    },
    componentWillUpdate: function(nextProps, nextState) {
        if(nextProps.selectedProjectName !== this.props.selectedProjectName){
            $('.add-bug-form-wrapper').slideUp();
            this._clearInput();
        }
        
    },
    _addBug: function(e){
        var newBugObj = {},
            newBugName = this.refs.newBugName.getDOMNode().value,
            newAuthorName = this.refs.newBugAuthor.getDOMNode().value,
            newDescription = this.refs.newBugDescription.getDOMNode().value,
            startDate = this.refs.startDate.getDOMNode().value,
            endDate = this.refs.endDate.getDOMNode().value,
            priority = this.refs.priority.getDOMNode().value;
        e.preventDefault();
        if(!newBugName || /[\.\#\$\[\]\/\\]/gi.test(newBugName)){            
            this.refs.newBugName.getDOMNode().value = '';
            $('.bug-name-input').effect('shake', {distance: 10});
            return;
        }
        if(!newAuthorName){
            $('.bug-author-input').effect('shake', {distance: 10});
            this.refs.newBugAuthor.getDOMNode().value = '';
            return;
        }
        if(!newDescription){
            $('.bug-description-input').effect('shake', {distance: 10});
            this.refs.newBugDescription.getDOMNode().value = '';
            return;
        }
        $('.add-bug-form-wrapper').slideUp();
        this._clearInput();
        newBugObj = {
            name     : newBugName,
            author   : newAuthorName,
            priority : priority,
            description: newDescription,
            startDate: startDate,
            endDate: endDate
        };
        AppActions.addBug(newBugObj);
        AppActions.selectBugByName(newBugName);
    },
    _clearInput: function(e){
        this.refs.newBugName.getDOMNode().value = '';
        this.refs.newBugDescription.getDOMNode().value = '';
        this.refs.newBugAuthor.getDOMNode().value = '';
        this.refs.startDate.getDOMNode().value = '';
        this.refs.endDate.getDOMNode().value = '';
        this.refs.priority.getDOMNode().value = constants.PRIORITY.LOW;
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
                <span>Author: </span>
                <input
                    className="bug-author-input"
                    type="text" 
                    ref="newBugAuthor"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Must not be empty"/>
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
            </div>
            /*jshint ignore:end */
		);
	}
});

module.exports = AddBugForm;