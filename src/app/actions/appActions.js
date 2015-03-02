'use strict';

var appDispatcher = require('../dispatcher/appDispatcher.js');
var constants = require('../constants/constants.js');

var appActions = {
	addUser: function(user){
		appDispatcher.handleViewAction({
			actionType: constants.ADD_USER,
			data: user
		});
	},
	deleteUser: function(index){
		appDispatcher.handleViewAction({
			actionType: constants.DELETE_USER,
			data: index
		});
	}
};

module.exports = appActions;