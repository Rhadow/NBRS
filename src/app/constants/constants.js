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
	}
};

module.exports = constants;