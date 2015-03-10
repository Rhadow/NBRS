'use strict';

var constants = {
	ADD_PROJECT    : 'ADD_PROJECT',
	DELETE_PROJECT : 'DELETE_PROJECT',
	SELECT_PROJECT : 'SELECT_PROJECT',
	ADD_BUG        : 'ADD_BUG',
	DELETE_BUG     : 'DELETE_BUG',
	SELECT_BUG     : 'SELECT_BUG',
	CLOSE_PROJECT  : 'CLOSE_PROJECT',
	ADD_COMMENT    : 'ADD_COMMENT',
	CLOSE_BUG      : 'CLOSE_BUG',
	PRIORITY: {
		LOW    : 'Low',
		MEDIUM : 'Medium',
		HIGH   : 'High',
		SOLVED : 'Solved'
	},
	FIREBASE: {
		PROJECT_URL  : 'https://nbrs.firebaseio.com/projects',
		PASSWORD_URL : 'https://nbrs.firebaseio.com/password'
	},
	EN_LEXICON: {
		NAV_TITLE: 'Bug Report System',
		NOT_FOUND_TITLE: 'Page Not Found',
		PROJECT_LIST_TITLE: 'Project List',
		NEW_PROJECT_BTN: 'New Project',
		PROJECT_CLOSED_TAG: 'Project Closed',
		PROJECT_FORM_TITLE: 'New Project Name',
		PROJECT_FORM_PLACEHOLDER: 'Enter project name',
		CONFIRM: 'Confirm',
		CLEAR: 'Clear',
		BUG_LIST_TITLE: 'Bug List',
		NO_PROJECT_TITLE: 'Please select a project',
		NEW_BUG_BTN: 'New Bug',
		NO_BUG_INFO: 'There are no bugs in ',
		CLOSE_PROJECT_BTN: 'Close Project',
		PROJECT_ALERT_TITLE: 'Close this project?',
		PROJECT_ALERT_SUBTITLE: 'You will not be able to edit this project anymore!',
		ALERT_CLOSE_CONFIRM: 'Yes, close it!',
		ALERT_CLOSED_RESULT: 'Closed!',
		ALERT_CLOSED_RESULT_SUFFIX: ' has been closed.'
	}
};

module.exports = constants;