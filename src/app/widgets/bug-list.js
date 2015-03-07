'use strict';

var React           = require('react'),
    CX              = require('react/lib/cx'),
    // Constants
    constants       = require('../constants/constants'),
    // Components
    AddBugForm      = require('../components/add-bug-form'),
    CloseProjectBtn = require('../components/close-project-btn'),
    ToggleInputBtn  = require('../components/toggle-input-btn'),
    Bug             = require('../components/bug'),
    BugList;

BugList = React.createClass({
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
            return (
                /* jshint ignore:start */
                <Bug key={i}
                    bugDetail={bug}
                    {...this.props} />
                /* jshint ignore:end */
            );
        }, this);
        if(this.props.selectedProjectBugs.length === 0){
            bugsHTML = (
                /* jshint ignore:start */
                <div>There are no bugs in {this.props.selectedProjectName}</div>
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
                <div>
                    <ToggleInputBtn 
                        target=".add-bug-form-wrapper"
                        displayText="New Bug" />
                    <AddBugForm selectedProjectName={this.props.selectedProjectName}/>
                    <CloseProjectBtn selectedProjectName={this.props.selectedProjectName} />
                </div>                
                /* jshint ignore:end */
            );
        }
        return resultHTML;
    },
    render: function() {
        if(!this.props.selectedProjectName){
            /* jshint ignore:start */
            return (
                <div className="bug-list">Please select a Project</div>
            );
            /* jshint ignore:end */
        }
        return (
            /* jshint ignore:start */
            <div className="bug-list">
                <h2>{this.props.selectedProjectName} Bug List</h2>                
                {this._renderInputs()}
                <ul className="bugs">
                    {this._renderBugs()}
                </ul>
            </div>
            /* jshint ignore:end */
        );        
    }
});

module.exports = BugList;