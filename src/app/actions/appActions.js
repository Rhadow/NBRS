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
	deleteProject: function(index){
		appDispatcher.handleViewAction({
			actionType: constants.DELETE_PROJECT,
			data: index
		});
	}
};

module.exports = appActions;