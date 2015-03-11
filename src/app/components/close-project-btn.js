'use strict';

var React      = require('react'),
    CX         = require('react/lib/cx'),
    // Constants
    constants  = require('../constants/constants'),
    // Actions
    AppActions = require('../actions/appActions'),    
    CloseProjectBtn;

CloseProjectBtn = React.createClass({
    propTypes: {
    	selectedProjectName: React.PropTypes.string
    },
    getDefaultProps: function() {
    	return {
    		selectedProjectName: ''
    	};
    },
    _closeProject: function(e){
        var thisModule = this;
        swal({
                title: constants.CH_LEXICON.PROJECT_ALERT_TITLE,   
                text: constants.CH_LEXICON.PROJECT_ALERT_SUBTITLE,   
                type: 'warning',   
                showCancelButton: true,   
                confirmButtonColor: '#DD6B55',   
                confirmButtonText: constants.CH_LEXICON.ALERT_CLOSE_CONFIRM,   
                closeOnConfirm: false
            }, function(){
                AppActions.closeProject(thisModule.props.selectedProjectName);
                swal(constants.CH_LEXICON.ALERT_CLOSED_RESULT, 
                    thisModule.props.selectedProjectName + constants.CH_LEXICON.ALERT_CLOSED_RESULT_SUFFIX, 
                    'success');
        });
    },
	render: function() {
		return (
			/*jshint ignore:start */
			<div className="close-project-btn">
			    <input 
                    className="btn btn-danger" 
                    type="button" 
                    value={constants.CH_LEXICON.CLOSE_PROJECT_BTN} 
                    onClick={this._closeProject} />
			</div>
			/*jshint ignore:end */			
		);
	}
});
module.exports = CloseProjectBtn;
/* Made By Rhadow.github.io */