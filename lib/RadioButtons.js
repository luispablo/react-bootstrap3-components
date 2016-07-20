require("./Object.assign.polyfill");

var React = require("react");

var Label = function (props) {
	var optionProps = {
		type: "radio", name: props.name, value: props.value,
		onChange: props.onChange, checked: props.checked
	};
	var option = React.createElement("input", optionProps);
	var labelProps = { className: props.inline ? "radio-inline" : "" };
	var label = props.label + (props.inline ? " " : "");

	return React.createElement("label", labelProps, option, label);
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

var selectOption = function (options, selectedValue, optionsFields) {
	var filteredOptions = options.filter(function (option) {
		if (optionsFields) {
			return option[optionsFields.value] === selectedValue;
		} else {
			return option.value === selectedValue;
		}
	});
	return (filteredOptions && filteredOptions.length > 0) ? filteredOptions[0] : null;
};

var RadioButtons = function (props) {

	function _onChange (event) {
		var selectedValue = event.target.value;

		if (props.onChangeObject) {
			var newObject = Object.assign({}, props.object);
			newObject[props.field] = selectedValue;
			props.onChangeObject(newObject);
		}
		if (props.onChangeValue) {
			props.onChangeValue(selectOption(props.options, selectedValue, props.optionsFields));
		}
	}

	var options = props.options.map(function (option) {
		var optionProps = {
			name: props.field, inline: props.inline, onChange: _onChange,
			label: props.optionsFields ? option[props.optionsFields.label] : option.label,
			value: props.optionsFields ? option[props.optionsFields.value] : option.value,
			key: props.optionsFields ? option[props.optionsFields.value] : option.value,
			checked: option.value === props.object[props.field]
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
