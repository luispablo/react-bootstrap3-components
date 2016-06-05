var React = require("react");

var Label = function (props) {

	function _onChange (event) {
		props.object[props.field] = event.target.checked;
	}

	var inputProps = {
		type: "checkbox", defaultChecked: props.object[props.field],
		onChange: props.onChange ? props.onChange : _onChange
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
