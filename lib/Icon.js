var React = require("react");

var Icon = function (props) {
	if (props.visible === undefined || props.visible) {
		var className = "glyphicon glyphicon-"+ props.name;
		return React.createElement("span", { className: className, "aria-hidden": "true" });
	} else {
		return null;
	}
};

module.exports = Icon;
