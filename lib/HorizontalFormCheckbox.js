var React = require("react");

var HorizontalFormCheckbox = function (props) {
	var inputProps = {type: "checkbox", defaultChecked: props.value, onChange: props.onChange};
	var input = React.createElement("input", inputProps);
	var label = React.createElement("label", null, input, " "+ props.label);
	var labelDiv = React.createElement("div", {className: "checkbox"}, label);

	var widths = "col-sm-offset-"+ props.labelWidth +" col-sm-"+ props.inputWith;
	var widthsDiv = React.createElement("div", {className: widths}, labelDiv);

	return React.createElement("div", {className: "form-group"}, widthsDiv);
};

HorizontalFormCheckbox.propTypes = {
	value: React.PropTypes.bool,
	onChange: React.PropTypes.func,
	label: React.PropTypes.string,
	labelWidth: React.PropTypes.number,
	inputWith: React.PropTypes.number
};

module.exports = HorizontalFormCheckbox;
