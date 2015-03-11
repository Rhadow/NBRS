'use strict';

var React      = require('react'),
    CX         = require('react/lib/cx'),
    // Constants
    constants  = require('../constants/constants'),
    // Actions
    AppActions = require('../actions/appActions'),
    AddBugForm;

AddBugForm = React.createClass({
    propTypes: {
    	selectedProjectName: React.PropTypes.string
    },
    getDefaultProps: function() {
    	return {
    		selectedProjectName: ''
    	};
    },
    componentDidMount: function(prevProps, prevState) {
        $('.add-bug-form-wrapper').hide();
        $(function () {
            $('#bug-start-time-picker, #bug-end-time-picker').datetimepicker({
                viewMode: 'days',
                format: 'YYYY/MM/DD'
            });
            $('#bug-start-time-picker').on('dp.change', function (e) {
                $('#bug-end-time-picker').data('DateTimePicker').minDate(e.date);
            });
        });
    },
    componentWillUpdate: function(nextProps, nextState) {
        if(nextProps.selectedProjectName !== this.props.selectedProjectName){
            $('.add-bug-form-wrapper').slideUp();
            this._clearInput();
        }        
    },
    _addBug: function(e) {
        var newBugObj      = {},
            newBugName     = this.refs.newBugName.getDOMNode().value,
            newAuthorName  = this.refs.newBugAuthor.getDOMNode().value,
            newDescription = this.refs.newBugDescription.getDOMNode().value,
            startDate      = this.refs.startDate.getDOMNode().value,
            endDate        = this.refs.endDate.getDOMNode().value,
            priority       = this.refs.priority.getDOMNode().value;            
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
            name        : newBugName,
            author      : newAuthorName,
            priority    : priority,
            description : newDescription,
            startDate   : startDate,
            endDate     : endDate
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
            'add-bug-form-wrapper' : true,
            'hide'                 : !this.props.selectedProjectName
        });
		return (
			/*jshint ignore:start */
            <div className={addBugClasses}>
                <div className="form-group">
                    <label>{constants.EN_LEXICON.BUG_FORM_NEW_NAME}</label>
                    <input
                        className="bug-name-input form-control"
                        type="text" 
                        ref="newBugName"
                        maxLength={17} 
                        data-toggle="tooltip"
                        data-placement="top"
                        title={constants.EN_LEXICON.BUG_FORM_NEW_NAME_TOOLTIP}
                        placeholder={constants.EN_LEXICON.BUG_FORM_NEW_NAME_PLACEHOLDER}/> 
                </div>
                <div className="form-group">
                    <label>{constants.EN_LEXICON.BUG_FORM_AUTHOR_NAME}</label>
                    <input
                        className="bug-author-input form-control"
                        type="text" 
                        ref="newBugAuthor"
                        maxLength={17} 
                        data-toggle="tooltip"
                        data-placement="top"
                        title={constants.EN_LEXICON.NOT_EMPTY_TOOLTIP}
                        placeholder={constants.EN_LEXICON.BUG_FORM_AUTHOR_NAME_PLACEHOLDER}/> 
                </div>
                <div className="form-group">
                    <label>{constants.EN_LEXICON.BUG_FORM_DESCRIPTION}</label>
                    <textarea 
                        className="form-control bug-description-input" 
                        ref="newBugDescription" 
                        rows="5"
                        data-toggle="tooltip"
                        data-placement="top"
                        title={constants.EN_LEXICON.NOT_EMPTY_TOOLTIP}
                        placeholder={constants.EN_LEXICON.FORM_DESCRIPTION_PLACEHOLDER}>
                    </textarea>
                </div>
                <div className="form-group">
                    <label>{constants.EN_LEXICON.START_DATE}</label>
                    <div className='input-group date' id='bug-start-time-picker'>
                        <input type='text' className="form-control" ref="startDate"/>
                        <span className="input-group-addon">
                            <span className="glyphicon glyphicon-calendar"></span>
                        </span>
                    </div>
                </div>
                <div className="form-group">
                    <label>{constants.EN_LEXICON.END_DATE}</label>
                    <div className='input-group date' id='bug-end-time-picker'>
                        <input type='text' className="form-control" ref="endDate"/>
                        <span className="input-group-addon">
                            <span className="glyphicon glyphicon-calendar"></span>
                        </span>
                    </div>
                </div>
                <div className="form-group">
                    <label>{constants.EN_LEXICON.PRIORITY_TITLE}</label>
                    <select className="form-control" ref="priority">
                        <option>{constants.EN_LEXICON.PRIORITY_LOW}</option>
                        <option>{constants.EN_LEXICON.PRIORITY_MEDIUM}</option>
                        <option>{constants.EN_LEXICON.PRIORITY_HIGH}</option>
                    </select>
                </div>
                <input 
                    type="button"
                    className="btn btn-success" 
                    value={constants.EN_LEXICON.CONFIRM}
                    onClick={this._addBug} />
                <input 
                    type="button"
                    className="btn btn-warning" 
                    value={constants.EN_LEXICON.CLEAR}
                    onClick={this._clearInput} />
            </div>
            /*jshint ignore:end */
		);
	}
});

module.exports = AddBugForm;