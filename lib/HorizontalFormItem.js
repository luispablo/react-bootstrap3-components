var React = require("react");

var HorizontalFormItem = function (props) {
	var labelProps = { className: "control-label col-sm-"+ props.labelWidth };
  var asterisk = props.showRequired ? React.createElement("span", { className: "required-asterisk" }, "*") : null;
	var label = React.createElement("label", labelProps, asterisk, props.label);
	var inputDivProps = { className: "col-sm-"+ props.inputWidth };
	var p = React.createElement("p", { className: "form-control-static" }, props.staticValue);
	var helperBlock = props.validation ? React.createElement("span", { className: "help-block" }, props.validation.message) : null;
	var inputDiv = React.createElement("div", inputDivProps, (props.staticValue ? p : props.children), helperBlock);
	var className = "form-group" + (props.validation ? " has-" + props.validation.state: "");
	return React.createElement("div", { className: className }, label, inputDiv);
};

HorizontalFormItem.propTypes = {
	labelWidth: React.PropTypes.number,
	label: React.PropTypes.string,
	inputWidth: React.PropTypes.number
};

module.exports = HorizontalFormItem;
