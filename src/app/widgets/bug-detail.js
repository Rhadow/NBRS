'use strict';

var React     = require('react'),
    CX        = require('react/lib/cx'),
    // constants
    constants = require('../constants/constants'),
    // Store
    appStore  = require('../stores/appStore.js'),
    BugDetail;

BugDetail = React.createClass({
    propTypes: {
        selectedBugName: React.PropTypes.string,
        selectedProjectBugComments: React.PropTypes.array,
        selectedBugPriority: React.PropTypes.string,
        isSelectedProjectClosed: React.PropTypes.bool
    },
    getDefaultProps: function() {
        return {
            selectedBugName: '',
            selectedProjectBugComments: [],
            selectedBugPriority: '',
            isSelectedProjectClosed: false
        };
    },
    getInitialState: function() {
        return {
            selectedBugPriority: this.props.selectedBugPriority 
        };
    },
    componentWillReceiveProps: function(nextProps) {
        this.setState({
            selectedBugPriority: nextProps.selectedBugPriority
        });
    },
    _renderCommentInputs: function(){
        var resultHTML, updateBugFormClasses;       
        updateBugFormClasses = CX({
            'update-bug-form-wrapper': true,
            'hide': !this.props.selectedBugName
        });
        if(this.props.selectedBugPriority !== constants.PRIORITY.SOLVED && !this.props.isSelectedProjectClosed){
            resultHTML = (
                /*jshint ignore:start */
                <div className={updateBugFormClasses}>
                    <h5>Update Bug Form</h5>
                    <div>
                        <select ref="updatePriority" value={this.state.selectedBugPriority} onChange={this._updatePriority}>
                            <option>{constants.PRIORITY.LOW}</option>
                            <option>{constants.PRIORITY.MEDIUM}</option>
                            <option>{constants.PRIORITY.HIGH}</option>
                            <option>{constants.PRIORITY.SOLVED}</option>
                        </select>
                        <input type="button" value="Add" />
                    </div>                    
                </div>
                /*jshint ignore:end */
            );
        }        
        return resultHTML;
    },
    _updatePriority: function(e){
        this.setState({
            selectedBugPriority: e.target.value
        });
    },
    render: function() {
        if(!this.props.selectedBugName){
            /* jshint ignore:start */
            return (
                <div className="bug-detail">Please select a Bug</div>
            );
            /* jshint ignore:end */
        }
        /* jshint ignore:start */
        return (
            <div className="bug-detail">
                <h2>{this.props.selectedBugName} Details</h2>
                {this._renderCommentInputs()}
                <div>
                    Some Bug Details
                </div>
            </div>
        );
        /* jshint ignore:end */
    }

});

module.exports = BugDetail;