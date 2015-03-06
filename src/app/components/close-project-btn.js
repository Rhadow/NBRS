'use strict';

var React = require('react'),
    CX           = require('react/lib/cx'),
    // Constants
    constants    = require('../constants/constants'),
    // Actions
    AppActions   = require('../actions/appActions'),    
    CloseProjectBtn;

CloseProjectBtn = React.createClass({
    propTypes: {
    	selectedProjectName: React.PropTypes.string
    },
    getDefaultProps: function() {
    	return {
    		selectedProjectName: '',
    	};
    },
    _closeProject: function(e){
        var thisModule = this;
        swal({
                title: 'Close this project?',   
                text: 'You will not be able to edit this project anymore!',   
                type: 'warning',   
                showCancelButton: true,   
                confirmButtonColor: '#DD6B55',   
                confirmButtonText: 'Yes, close it!',   
                closeOnConfirm: false
            }, function(){
                AppActions.closeProject(thisModule.props.selectedProjectName);
                swal('Closed!', thisModule.props.selectedProjectName + ' has been closed.', 'success'); 
        });
    },
	render: function() {
		return (
			/*jshint ignore:start */
			<div>
			    <input className="btn btn-danger" type="button" value="Close Project" onClick={this._closeProject} />
			</div>
			/*jshint ignore:end */			
		);
	}
});
module.exports = CloseProjectBtn;