'use strict';

var React        = require('react'),
    CX           = require('react/lib/cx'),
    // Constants
    constants    = require('../constants/constants'),
    // Actions
    AppActions   = require('../actions/appActions'),    
    CloseBugBtn;

CloseBugBtn = React.createClass({
    propTypes: {
    	selectedProjectName : React.PropTypes.string,
        selectedBugName     : React.PropTypes.string
    },
    getDefaultProps: function() {
    	return {
    		selectedProjectName : '',
            selectedBugName     : ''
    	};
    },
    _closeBug: function(e){
        var thisModule = this;
        swal({
                title: constants.CH_LEXICON.BUG_ALERT_TITLE,   
                text: constants.CH_LEXICON.BUG_ALERT_SUBTITLE,   
                type: 'warning',   
                showCancelButton: true,   
                confirmButtonColor: '#DD6B55',   
                confirmButtonText: constants.CH_LEXICON.ALERT_CLOSE_CONFIRM,   
                closeOnConfirm: false
            }, function(){
                AppActions.closeBug(thisModule.props.selectedBugName);
                swal(constants.CH_LEXICON.ALERT_CLOSED_RESULT, 
                    thisModule.props.selectedProjectName + constants.CH_LEXICON.BUG_CLOSE_RESULT_SUFFIX, 
                    'success'); 
        });
    },
	render: function() {
		return (
			/*jshint ignore:start */
			<div className="close-bug-btn">
			    <input 
                    className="btn btn-success" 
                    type="button" 
                    value={constants.CH_LEXICON.PRIORITY_SOLVED}
                    onClick={this._closeBug} />
			</div>
			/*jshint ignore:end */			
		);
	}
});
module.exports = CloseBugBtn;