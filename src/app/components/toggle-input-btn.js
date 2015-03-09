'use strict';

var React = require('react'),
    ToggleInputBtn;

ToggleInputBtn = React.createClass({
    propTypes: {
    	target      : React.PropTypes.string,
        displayText : React.PropTypes.string
    },
    getDefaultProps: function() {
    	return {
    		target      : '',
            displayText : 'Open/Close Form'
    	};
    },
    _toggleInputs: function(e){        
        $(this.props.target).slideToggle();
    },
	render: function() {
		return (
			/*jshint ignore:start */
			<div className="toggle-btn">
                <input 
                    className="btn btn-info" 
                    type="button" 
                    value={this.props.displayText} 
                    onClick={this._toggleInputs} />
            </div>
            /*jshint ignore:end */
		);
	}
});

module.exports = ToggleInputBtn;