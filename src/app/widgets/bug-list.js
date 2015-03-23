'use strict';

var React           = require('react'),
    CX              = require('react/lib/cx'),
    // Constants
    constants       = require('../constants/constants'),
    // Actions
    AppActions   = require('../actions/appActions'),    
    // Components
    AddBugForm      = require('../components/add-bug-form'),
    CloseProjectBtn = require('../components/close-project-btn'),
    ToggleInputBtn  = require('../components/toggle-input-btn'),
    NoContent       = require('../components/no-content'),
    Bug             = require('../components/bug'),
    PriorityFilter  = require('../components/priority-filter'),
    BugList;

BugList = React.createClass({
    _selectedPriority: constants.CH_LEXICON.PRIORITY_ALL,
    propTypes: {
        selectedProjectName     : React.PropTypes.string,
        selectedProjectBugs     : React.PropTypes.array,
        selectedBugName         : React.PropTypes.string,
        isSelectedProjectClosed : React.PropTypes.bool,
        combo                   : React.PropTypes.string
    },
    getDefaultProps: function() {
        return {
            selectedProjectName     : '',
            selectedProjectBugs     : [],
            selectedBugName         : '',
            isSelectedProjectClosed : false,
            combo                   : ''
        };
    },
    componentDidUpdate: function(prevProps, prevState) {
        var thisModule = this;
        $(function () {
            $(thisModule.getDOMNode()).find('[data-toggle="tooltip"]').tooltip();
        });
        if((prevProps.selectedProjectName !== this.props.selectedProjectName) && this.refs.newBugName){
            this.refs.newBugName.getDOMNode().value = '';
            this.refs.priority.getDOMNode().value = constants.PRIORITY.LOW;
        }        
    },
    _renderBugs: function(){
        var bugsHTML = this.props.selectedProjectBugs.map(function(bug, i){
            var transformed = '';
            switch (bug.priority){
                case 'Low':
                    transformed = constants.CH_LEXICON.PRIORITY_LOW;
                    break;
                case 'Medium':
                    transformed = constants.CH_LEXICON.PRIORITY_MEDIUM;
                    break;
                case 'High':
                    transformed = constants.CH_LEXICON.PRIORITY_HIGH;
                    break;
                case 'Solved':
                    transformed = constants.CH_LEXICON.PRIORITY_SOLVED;
                    break;
                default:
                    throw 'Error!';
            }
            return (
                /* jshint ignore:start */
                <Bug 
                    key={i}
                    bugDetail={bug}
                    showBug={this._selectedPriority === transformed || this._selectedPriority === constants.CH_LEXICON.PRIORITY_ALL}
                    {...this.props} />
                /* jshint ignore:end */
            );
        }, this);
        if(this.props.selectedProjectBugs.length === 0){
            bugsHTML = (
                /* jshint ignore:start */
                <NoContent message={constants.CH_LEXICON.NO_BUG_INFO + this.props.selectedProjectName} />
                /* jshint ignore:end */
            );
        }
        return bugsHTML;
    },
    _renderInputs: function(){
        var resultHTML;
        if(!this.props.isSelectedProjectClosed){
            resultHTML = (
                /* jshint ignore:start */
                <div className="bug-list-inputs">                    
                    <ToggleInputBtn 
                        target=".add-bug-form-wrapper"
                        displayText={constants.CH_LEXICON.NEW_BUG_BTN} />
                    <CloseProjectBtn selectedProjectName={this.props.selectedProjectName} />
                    <AddBugForm selectedProjectName={this.props.selectedProjectName}/>                    
                    <PriorityFilter 
                        selectedProjectName={this.props.selectedProjectName}
                        onSelectHandler={this._filterBugs}/>
                </div>                
                /* jshint ignore:end */
            );
        }
        return resultHTML;
    },
    _filterBugs: function(condition){
        this._selectedPriority = condition;
        AppActions.clearSelectedBug();
        this.forceUpdate();
    },
    render: function() {
        if(!this.props.selectedProjectName){
            /* jshint ignore:start */
            return (
                <div className="bug-list">
                    <NoContent message={constants.CH_LEXICON.NO_PROJECT_TITLE} />
                </div>
            );
            /* jshint ignore:end */
        }
        return (
            /* jshint ignore:start */
            <div className="bug-list">                
                <div className="title-wrapper">
                    <span className="bug-list-title">
                        {this.props.selectedProjectName} {constants.CH_LEXICON.BUG_LIST_TITLE}
                    </span>                
                    {this._renderInputs()}
                </div> 
                <div className="bugs">
                    {this._renderBugs()}
                </div>
            </div>
            /* jshint ignore:end */
        );        
    }
});

module.exports = BugList;
/* all rights reserved to Howard Chang */