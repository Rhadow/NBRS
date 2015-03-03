'use strict';

var appDispatcher = require('../dispatcher/appDispatcher.js'),
    eventEmitter  = require('events').EventEmitter,
    constants     = require('../constants/constants.js'),
    // Underscore
    _             = require('underscore'),
    // Firebase
    Firebase      = require('firebase'),   
    appStore;

appStore = _.extend({}, eventEmitter.prototype, {
    _firebaseRef: new Firebase('https://nbrs.firebaseio.com/projects'),
    selectedProject : '',

    addProject: function(newProject) {
        var isProjectIdentical = false;
        this._firebaseRef.on('value', function(snapshot){
            snapshot.forEach(function(project){
                if(project.val().name === newProject.name){
                    isProjectIdentical = true;
                }
            });
        });

        if(!isProjectIdentical){
            this._firebaseRef.push(newProject);
        }else{
            window.alert('Same project name already exists!');
        }
    },
    deleteProject: function(name) {
        var firebaseURLToDelete = this._firebaseRef;
        this._firebaseRef.on('value', function(snapshot){
            snapshot.forEach(function(project){
                if(project.val().name === name){
                    firebaseURLToDelete += '/' + project.key();
                }
            });
        });
        new Firebase(firebaseURLToDelete).remove();
    },
    selectProject: function(projectName){
        this.selectedProject = projectName;
    },
    emitChange: function() {
        this.emit('change');
    },
    addChangeListener: function(callback) {
        this.on('change', callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    },
});

appDispatcher.register(function(payload) {
    var action = payload.action;
    switch (action.actionType) {
        case constants.ADD_PROJECT:
            appStore.addProject(action.data);
            break;
        case constants.DELETE_PROJECT:
            appStore.deleteProject(action.data);
            break;
        case constants.SELECT_PROJECT:
            appStore.selectProject(action.data);
            break;
        default:
            return true;
    }
    appStore.emitChange();
    return true;
});

module.exports = appStore;