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
    selectedProjectBugs: [],

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
            this._firebaseRef.child(newProject.name).set(newProject);
            this._firebaseRef.child(newProject.name).child('bugs').child('_init').child('name').set('init');
            this._firebaseRef.child(newProject.name).child('bugs').child('_init').child('comments').set('none');
        }else{
            window.alert('Same project name already exists!');
        }
    },
    deleteProject: function(name) {
        this._firebaseRef.child(name).remove();
    },
    selectProject: function(projectName){   
        this.selectedProject = projectName;
    },
    addBug: function(newBug){
        var isBugIdentical = false;
        this._firebaseRef.child(this.selectedProject).child('bugs').on('value', function(snapshot){
            snapshot.forEach(function(project){
                if(project.val().name === newBug.name){
                    isBugIdentical = true;
                }
            });
        });
        if(!isBugIdentical){
            this._firebaseRef.child(this.selectedProject).child('bugs').child(newBug.name).set(newBug);
        }else{
            window.alert('Same project name already exists!');
        }
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
        case constants.ADD_BUG:
            appStore.addBug(action.data);
            break;
        default:
            return true;
    }
    appStore.emitChange();
    return true;
});

module.exports = appStore;