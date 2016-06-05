var React = require("react");

var HorizontalFormItem = function (props) {
	var labelProps = { className: "control-label col-sm-"+ props.labelWidth };
	var label = React.createElement("label", labelProps, props.label);
	var inputDivProps = { className: "col-sm-"+ props.inputWidth };
	var p = React.createElement("p", { className: "form-control-static" }, props.staticValue);
	var inputDiv = React.createElement("div", inputDivProps, props.staticValue ? p : props.children);
	return React.createElement("div", { className: "form-group" }, label, inputDiv);
};

HorizontalFormItem.propTypes = {
	labelWidth: React.PropTypes.number,
	label: React.PropTypes.string,
	inputWidth: React.PropTypes.number
};

module.exports = HorizontalFormItem;
