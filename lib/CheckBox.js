require("./Object.assign.polyfill");

var React = require("react");

var mapCheckedValue = function (mappings, checked) {
	if (mappings) {
		return checked ? mappings.true : mappings.false;
	} else {
		return checked;
	}
};

var Label = function (props) {

	var inputProps = { type: "checkbox" };
	inputProps.checked = props.mappings ? props.object[props.field] === props.mappings.true : props.object[props.field];

	inputProps.onChange = function (event) {
		var checked = mapCheckedValue(props.mappings, event.target.checked);

		if (props.onChangeObject) {
			var newObject = Object.assign({}, props.object);
			newObject[props.field] = checked;
			props.onChangeObject(newObject);
		}
		if (props.onChangeValue) props.onChangeValue(checked);
	};

	var input = React.createElement("input", inputProps);
	var labelProps = { className: props.inline ? "checkbox-inline" : "" };
	return React.createElement("label", labelProps, input, " ", props.label);
};

Label.propTypes = {
	object: React.PropTypes.object,
	field: React.PropTypes.string,
	onChange: React.PropTypes.func,
	inline: React.PropTypes.bool,
	label: React.PropTypes.string
};

var Div = function (props) {
	var label = React.createElement(Label, props);
	return React.createElement("div", { className: "checkbox" }, label);
};

Div.propTypes = Label.propTypes;

var CheckBox = function (props) {
	return React.createElement(props.inline ? Label : Div, props);
};

CheckBox.propTypes = Label.propTypes;

CheckBox.Div = Div;
CheckBox.Label = Label;

module.exports = CheckBox;
