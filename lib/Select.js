var React = require("react");

var Select = function (props) {
	var options = props.options.map(function (option) {
		return React.createElement("option", { key: option.value, value: option.value }, option.label);
	});
	if (props.nullValueLabel) options.unshift(React.createElement("option", { key: -1 }, props.nullValueLabel));
	var selectProps = { className: "form-control", onChange: props.onChange };
	if (props.selectedValue) selectProps.defaultValue = props.selectedValue;
	return React.createElement("select", selectProps, options);
};

module.exports = Select;