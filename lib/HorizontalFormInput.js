var React = require("react");

var HorizontalFormInput = function (props) {
	var inputProps = {
		type: props.type, className: "form-control", placeholder: props.label,
		defaultValue: props.value, onChange: props.onChange
	};
	var input = React.createElement("input", inputProps);
	var inputDiv = React.createElement("div", {className: "col-sm-"+ props.inputWidth}, input);
	var label = React.createElement("label", {className: "control-label col-sm-"+ props.labelWidth}, props.label);

	return React.createElement("div", {className: "form-group"}, label, inputDiv);
};

HorizontalFormInput.propTypes = {
	type: React.PropTypes.string,
	onChange: React.PropTypes.func,
	label: React.PropTypes.string,
	labelWidth: React.PropTypes.number,
	inputWith: React.PropTypes.number
};

module.exports = HorizontalFormInput;
