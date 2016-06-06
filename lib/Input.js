var React = require("react");

var Input = function (props) {

	function onChange (event) {
		props.object[props.field] = event.target.value;
	}

	var inputProps = {
		type: props.type, className: "form-control", placeholder: props.placeholder,
		defaultValue: props.object[props.field], onChange: onChange
	};

	return React.createElement("input", inputProps);
};

Input.propTypes = {
	object: React.PropTypes.object,
	field: React.PropTypes.string,
	placeholder: React.PropTypes.string
};

module.exports = Input;
