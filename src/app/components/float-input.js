'use strict';

var React = require('react');

var FloatInput = React.createClass({

	propTypes: {
		inputType: React.PropTypes.string,
		promptMessage: React.PropTypes.string,
		xPostion: React.PropTypes.number,
		yPosition: React.PropTypes.number,
		onConfirm: React.PropTypes.func,
		onCancel: React.PropTypes.func,
	},

	getDefaultProps: function(){
		return {
			inputType: 'text',
			promptMessage: '',
			xPosition: -999999,
		    yPosition: -999999,
			onConfirm: function(){},
			onCancel: function(){}
		};
	},
	_renderInput: function(){
		var resultHTML, styleObj;
		console.log(this.props.xPosition);
		console.log(this.props.yPosition);
		if(this.props.xPosition && this.props.yPosition){
			styleObj = {
				top: this.props.xPostion,
				left: this.props.yPosition
			};
			resultHTML = (
				/* jshint ignore:start */
				<div className="float-input" style={styleObj}>
				    <div>{this.props.promptMessage}</div>
				    <input type={this.props.inputType} ref="floatInputValue"/>
				    <input type="button" value="Confirm" onClick={this._onConfirmClicked}/>
				    <input type="button" value="Cancel" onClick={this._onCancelClicked}/>
				</div>
				/* jshint ignore:end */
			);
		}
		return resultHTML;
	},
	_onConfirmClicked: function(){
		console.log(this.refs.floatInputValue.getDOMNode().value);
		this.props.onConfirm();
	},
	_onCancelClicked: function(){
		this.props.onCancel();
	},
	render: function() {
		return (
			/* jshint ignore:start */
			<div>
			    {this._renderInput()}
			</div>
			/* jshint ignore:end */
		);
	}

});

module.exports = FloatInput;