'use strict';

var React = require('react'),
ToggleInputBtn;

ToggleInputBtn = React.createClass({
    propTypes: {
    	target: React.PropTypes.string
    },
    getDefaultProps: function() {
    	return {
    		target: ''
    	};
    },
    _toggleInputs: function(e){        
        $(this.props.target).slideToggle();
    },
	render: function() {
		return (
			/*jshint ignore:start */
			<div className="toggle-btn">
                <input type="button" value="Open/Close Form" onClick={this._toggleInputs} />
            </div>
            /*jshint ignore:end */
		);
	}
});

module.exports = ToggleInputBtn;