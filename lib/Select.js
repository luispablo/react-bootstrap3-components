var React = require("react");

var Select = function (props) {
	var options = props.options.map(function (option) {
		var value = props.valueField ? option[props.valueField] : option.value;
		var label = props.labelField ? option[props.labelField] : option.label;
		return React.createElement("option", { key: value, value: value }, label);
	}).sort(function (a, b) {
		return a.props.children <= b.props.children ? -1 : 1;
	});
	if (props.nullValueLabel) options.unshift(React.createElement("option", { key: -1 }, props.nullValueLabel));
	var selectProps = { className: "form-control", onChange: props.onChange };
	if (props.selectedValue) selectProps.defaultValue = props.selectedValue;
	return React.createElement("select", selectProps, options);
};

module.exports = Select;
