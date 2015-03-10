'use strict';

var React          = require('react'),
    CX             = require('react/lib/cx'),
    // Actions
    AppActions     = require('../actions/appActions'),
    // Hash
    passwordHash   = require('password-hash'),
    // Constants
    constants      = require('../constants/constants'),
    // Components
    AddProjectForm = require('../components/add-project-form'),
    ToggleInputBtn = require('../components/toggle-input-btn'),
    ProjectList;

ProjectList = React.createClass({
    propTypes: {
        projects            : React.PropTypes.array.isRequired,
        selectedProjectName : React.PropTypes.string,
        combo               : React.PropTypes.string
    },
    getDefaultProps: function() {
        return {
            selectedProjectName: '',
            combo              : ''
        };
    },
    componentDidUpdate: function(prevProps, prevState) {
        var thisModule = this;
        $(function () {
            $(thisModule.getDOMNode()).find('[data-toggle="tooltip"]').tooltip();
        });        
    },
    _renderProjects: function(){
        var resultHTML = this.props.projects.map(function(project, i){
            var projectClosedClass = CX({
                'closed-label': true,
                'label': true,
                'label-danger': true,
                'hide': !project.isClosed
                }),
                projectClass = CX({
                    'project'  : true,
                    'highlight': project.name === this.props.selectedProjectName
                });
            return (
                /*jshint ignore:start */
                <div className={projectClass} key={i} id={project.name} onClick={this._onProjectSelect}>
                    {project.name}
                    <i className={projectClosedClass}>{constants.EN_LEXICON.PROJECT_CLOSED_TAG}</i>
                    <i  className='cancel-icon' 
                        data-name={project.name} 
                        onClick={this._deleteProjectByName}>
                    </i>
                </div>
                /*jshint ignore:end */
            );
        }, this);
        return resultHTML;
    },
    _deleteProjectByName: function(e){
        var passwordInput,
            hashedPassword = passwordHash.generate(this.props.combo),
            thisModule     = this,
            name           = e.target.getAttribute('data-name');
        e.preventDefault();
        e.stopPropagation();
        swal(
            {
                type: 'prompt',   
                title: 'Caution!',   
                text: 'Enter password to delete',   
                promptPlaceholder: 'Enter password...'
            }, 
            function(passwordInput){
                if(passwordHash.verify(passwordInput, hashedPassword)){
                    AppActions.deleteProject(name);
                    if(name === thisModule.props.selectedProjectName){
                        AppActions.selectProjectByName('');
                        AppActions.selectBugByName('');
                    }                  
                    swal('Deleted!', 'The selected project has been deleted.', 'success');
                }else{
                    swal('Oops...', 'wrong password!', 'error');
                } 
            }
        ); 
    },    
    _onProjectSelect: function(e){
        var selectedProjectName = $(e.target).closest('.project')[0].id;
        e.preventDefault();
        if(!$(e.target).hasClass('cancel-icon')){
            AppActions.selectProjectByName(selectedProjectName);
        }   
    },
    render: function() {
        return (
            /*jshint ignore:start */
            <div className="project-list">
                <div className="title-wrapper">
                    <div className="project-list-title">{constants.EN_LEXICON.PROJECT_LIST_TITLE}</div>
                    <div className="project-list-input">
                        <ToggleInputBtn 
                            target=".add-project-form-wrapper"
                            displayText={constants.EN_LEXICON.NEW_PROJECT_BTN} />
                    </div>                    
                </div>
                <AddProjectForm />
                <div className='projects'>
                    {this._renderProjects()}
                </div>
            </div>
            /*jshint ignore:end */
        );
    }
});

module.exports = ProjectList;