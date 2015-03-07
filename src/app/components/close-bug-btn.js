'use strict';

var React        = require('react'),
    CX           = require('react/lib/cx'),
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
                title: 'Mark this bug as solved?',   
                text: 'You will not be able to edit this bug anymore!',   
                type: 'warning',   
                showCancelButton: true,   
                confirmButtonColor: '#DD6B55',   
                confirmButtonText: 'Yes, close it!',   
                closeOnConfirm: false
            }, function(){
                AppActions.closeBug(thisModule.props.selectedBugName);
                swal('Closed!', 
                    thisModule.props.selectedProjectName + ' has been marked as solved.', 'success'); 
        });
    },
	render: function() {
		return (
			/*jshint ignore:start */
			<div>
			    <input className="btn btn-success" type="button" value="Solved" onClick={this._closeBug} />
			</div>
			/*jshint ignore:end */			
		);
	}
});
module.exports = CloseBugBtn;