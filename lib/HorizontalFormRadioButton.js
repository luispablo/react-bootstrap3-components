var React = require("react");

var Option = function (props) {
	var inputProps = {
		type: "radio", name: props.groupLabel, value: props.value,
		defaultChecked: (props.value === props.currentValue), onChange: props.onChange
	};
	var input = React.createElement("input", inputProps);
	var label = React.createElement("label", null, input, props.label || props.value);

	return React.createElement("span", null, label, "\u2003");
};

Option.propTypes = {
	label: React.PropTypes.string,
	value: React.PropTypes.string,
	currentValue: React.PropTypes.string,
	onChange: React.PropTypes.func
};

var HorizontalFormRadioButton = function (props) {
	var options = props.options.map(function (option) {
		var optionProps = {
			label: option.label, value: option.value, key: option.value,
			onChange: props.onChange, currentValue: props.value, groupLabel: props.label
		};
		return React.createElement(Option, optionProps);
	});
	var radioDiv = React.createElement("div", {className: "radio"}, options);
	var radioWidthDiv = React.createElement("div", {className: "col-sm-"+ props.inputWith}, radioDiv);
	var label = React.createElement("label", {className: "control-label col-sm-"+ props.labelWidth}, props.label);

	return React.createElement("div", {className: "form-group"}, label, radioWidthDiv);
};

HorizontalFormRadioButton.propTypes = {
	value: React.PropTypes.string,
	onChange: React.PropTypes.func,
	label: React.PropTypes.string,
	labelWidth: React.PropTypes.number,
	inputWith: React.PropTypes.number,
	options: React.PropTypes.array
};

module.exports = HorizontalFormRadioButton;
