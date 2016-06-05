var React = require("react");

var Select = function (props) {

	function _onChange (event) {
		props.object[props.field] = event.target.value;
	}

	var options = props.options.map(function (option) {
		var value = props.optionsFields ? option[props.optionsFields.value] : option.value;
		var label = props.optionsFields ? option[props.optionsFields.label] : option.label;
		return React.createElement("option", { key: value, value: value }, label);
	}).sort(function (a, b) {
		return a.props.children <= b.props.children ? -1 : 1;
	});

	if (props.null) options.unshift(React.createElement("option", { key: -1 }, props.null));

	var selectProps = {
		className: "form-control",
		defaultValue: props.object[props.field],
		onChange: props.onChange ? props.onChange : _onChange
	};

	return React.createElement("select", selectProps, options);
};

Select.propTypes = {
	object: React.PropTypes.object,
	field: React.PropTypes.string,
	options: React.PropTypes.array,
	optionsFields: React.PropTypes.object,
	null: React.PropTypes.string,
	onChange: React.PropTypes.func
};

module.exports = Select;
