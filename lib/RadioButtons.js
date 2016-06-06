var React = require("react");

var Label = function (props) {
	var optionProps = {
		type: "radio", name: props.name, value: props.value,
		onChange: props.onChange
	};
	var option = React.createElement("input", optionProps);
	var labelProps = { className: props.inline ? "radio-inline" : "" };

	return React.createElement("label", labelProps, option, props.label);
};

Label.propTypes = {
	name: React.PropTypes.string,
	value: React.PropTypes.node,
	onChange: React.PropTypes.func,
	inline: React.PropTypes.bool,
	label: React.PropTypes.string
};

var Div = function (props) {
	var label = React.createElement(Label, props);
	return React.createElement("div", { className: "radio" }, label);
};

Div.propTypes = Label.propTypes;

var RadioButtons = function (props) {

	function _onChange (event) {
		props.object[props.field] = event.target.value;
	}

	var options = props.options.map(function (option) {
		var optionProps = {
			name: props.field, inline: props.inline, onChange: _onChange,
			label: props.optionsFields ? option[props.optionsFields.label] : option.label,
			value: props.optionsFields ? option[props.optionsFields.value] : option.value,
			key: props.optionsFields ? option[props.optionsFields.value] : option.value
		};
		return React.createElement(props.inline ? Label : Div, optionProps);
	});
	return React.createElement("span", null, options);
};

RadioButtons.propTypes = {
	object: React.PropTypes.object,
	field: React.PropTypes.string,
	options: React.PropTypes.array,
	inline: React.PropTypes.bool,
	label: React.PropTypes.string,
	value: React.PropTypes.node,
	optionsFields: React.PropTypes.object
};

RadioButtons.Div = Div;
RadioButtons.Label = Label;

module.exports = RadioButtons;
