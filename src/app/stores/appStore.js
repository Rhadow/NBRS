'use strict';

var appDispatcher = require('../dispatcher/appDispatcher.js'),
    eventEmitter  = require('events').EventEmitter,
    constants     = require('../constants/constants.js'),
    _             = require('underscore'),
    appStore,
    _projects;


//Creating Fake Data

_projects = [
    {
        name: 'IFA3610',
        bugs:[
            {
                name: 'Can not turn on device',
                assignee: 'Simon',
                startDate: '2015-02-28',
                description: 'Cannot turn on device, after several hours of debugging, we found out that the input was short circuited'
            }
        ]
    },
    {
        name: 'GTR6574',
        bugs:[]
    },
    {
        name: 'SVG1337'
    }

];

appStore = _.extend({}, eventEmitter.prototype, {
    getProjectList: function() {
        return _projects;
    },
    addProject: function(newProject) {
        var isProjectIdentical = false;
        _projects.forEach(function(project){
            if(project.name === newProject.name){
                isProjectIdentical = true;
            }
        });
        if(!isProjectIdentical){
            _projects.push(newProject);
        }else{
            alert('Same project name already exists!');
        }
    },
    deleteProject: function(index) {
        _projects.splice(index, 1);
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
        default:
            return true;
    }
    appStore.emitChange();
    return true;
});

module.exports = appStore;