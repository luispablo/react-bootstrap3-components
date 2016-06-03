var React = require("react");

var HorizontalFormInputText = function (props) {

	function onChange (event) {
		props.object[props.field] = event.target.value;
	}

	var inputProps = {
		type: "text", className: "form-control", placeholder: props.label,
		defaultValue: props.object[props.field], onChange: onChange
	};

	var input = React.createElement("input", inputProps);
	var inputDiv = React.createElement("div", {className: "col-sm-"+ props.widths[1]}, input);
	var label = React.createElement("label", {className: "control-label col-sm-"+ props.widths[0]}, props.label);

	return React.createElement("div", {className: "form-group"}, label, inputDiv);
};

HorizontalFormInputText.propTypes = {
	object: React.PropTypes.object,
	field: React.PropTypes.string,
	widths: React.PropTypes.array,
	onChange: React.PropTypes.func
};

module.exports = HorizontalFormInputText;
