'use strict';

var React          = require('react'),
    CX             = require('react/lib/cx'),
    // constants
    constants      = require('../constants/constants'),
    // Store
    appStore       = require('../stores/appStore.js'),
    // Components
    AddCommentForm = require('../components/add-comment-form'),
    ToggleInputBtn = require('../components/toggle-input-btn'),
    Comment        = require('../components/comment'),
    NoContent      = require('../components/no-content'),
    CloseBugBtn    = require('../components/close-bug-btn'),
    BugIntro       = require('../components/bug-intro'),
    BugDetail;

BugDetail = React.createClass({
    propTypes: {
        selectedBugName            : React.PropTypes.string,
        selectedProjectBugComments : React.PropTypes.array,
        selectedBugPriority        : React.PropTypes.string,
        isSelectedProjectClosed    : React.PropTypes.bool,
        selectedBugDescription     : React.PropTypes.string,
        selectedBugStartDate       : React.PropTypes.string,
        selectedBugEndDate         : React.PropTypes.string,
        selectedBugAuthor          : React.PropTypes.string
    },
    getDefaultProps: function() {
        return {
            selectedBugName            : '',
            selectedProjectBugComments : [],
            selectedBugPriority        : '',
            selectedBugDescription     : '',
            selectedBugStartDate       : '',
            selectedBugEndDate         : '',
            selectedBugAuthor          : '',
            isSelectedProjectClosed    : false
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
        var resultHTML;
        if(this.props.selectedBugPriority !== constants.PRIORITY.SOLVED && !this.props.isSelectedProjectClosed){
            resultHTML = (
                /*jshint ignore:start */
                <div className="comment-list-inputs">
                    <ToggleInputBtn 
                        target=".add-comment-form-wrapper"
                        displayText={constants.CH_LEXICON.NEW_COMMENT_TITLE} />
                    <CloseBugBtn
                        selectedProjectName={this.props.selectedProjectName}
                        selectedBugName={this.props.selectedBugName}/>
                    <AddCommentForm
                        selectedBugName={this.props.selectedBugName}/>
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
    _renderComments: function(){
        var resultHTML = this.props.selectedProjectBugComments.map(function(comment, i){
            /* jshint ignore:start */
            return (
                <Comment 
                    key={i}
                    detail={comment}/>
            );
            /* jshint ignore:end */
        });
        if(this.props.selectedProjectBugComments.length === 0){
            resultHTML = (
                /* jshint ignore:start */
                <NoContent message={constants.CH_LEXICON.NO_COMMENT_INFO + this.props.selectedBugName} />
                /* jshint ignore:end */
            );
        }
        return resultHTML;
    },
    render: function() {
        if(!this.props.selectedBugName){
            /* jshint ignore:start */
            return (
                <div className="bug-detail">
                    <NoContent message={constants.CH_LEXICON.NO_BUG_TITLE} />
                </div>
            );
            /* jshint ignore:end */
        }
        /* jshint ignore:start */
        return (
            <div className="bug-detail">
                <div className="title-wrapper">
                    <span className="comment-list-title">
                        {this.props.selectedBugName} {constants.CH_LEXICON.BUG_DETAIL_TITLE}
                    </span>                
                    {this._renderCommentInputs()}
                </div> 
                <BugIntro 
                    selectedBugDescription={this.props.selectedBugDescription}
                    selectedBugStartDate={this.props.selectedBugStartDate}
                    selectedBugEndDate={this.props.selectedBugEndDate}
                    selectedBugAuthor={this.props.selectedBugAuthor}/>
                <div className="comments">
                    <div className="comment-list-title">
                        {this.props.selectedProjectName} {constants.CH_LEXICON.BUG_COMMENT_TITLE}
                    </div>
                    {this._renderComments()}
                </div>
            </div>
        );
        /* jshint ignore:end */
    }
});

module.exports = BugDetail;
/* all rights reserved to Howard Chang */