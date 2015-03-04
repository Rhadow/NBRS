'use strict';

var appDispatcher = require('../dispatcher/appDispatcher.js');
var constants = require('../constants/constants.js');

var appActions = {
	addProject: function(project){
		appDispatcher.handleViewAction({
			actionType: constants.ADD_PROJECT,
			data: project
		});
	},
	deleteProject: function(projectName){
		appDispatcher.handleViewAction({
			actionType: constants.DELETE_PROJECT,
			data: projectName
		});
	},
	closeProject: function(projectName){
		appDispatcher.handleViewAction({
			actionType: constants.CLOSE_PROJECT,
			data: projectName
		});
	},
	selectProjectByName: function(projectName){
		appDispatcher.handleViewAction({
			actionType: constants.SELECT_PROJECT,
			data: projectName
		});
	},
	addBug: function(bug){
		appDispatcher.handleViewAction({
			actionType: constants.ADD_BUG,
			data: bug
		});
	},
	deleteBug: function(bugName){
		appDispatcher.handleViewAction({
			actionType: constants.DELETE_BUG,
			data: bugName
		});
	},
	selectBugByName: function(bugName){
		appDispatcher.handleViewAction({
			actionType: constants.SELECT_BUG,
			data: bugName
		});
	},
};

module.exports = appActions;