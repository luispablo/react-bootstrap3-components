var React = require("react");

var SortableTH = function (props) {
  var ASC = "ASC";
  var DESC = "DESC";
  var enabled = props.enabled == undefined || props.enabled;
  var orderBy = props.orderBy.split(" ");
  var isSelected = orderBy[0] === props.field;
  var isASC = orderBy[1] && orderBy[1] === ASC;
  var iconProps = { className: "glyphicon glyphicon-triangle-"+ (isASC ? "bottom" : "top"), "aria-hidden": "true" };
  var icon = React.createElement("span", iconProps);

  var onClick = function () {
    props.onClick(props.field +" "+ (isSelected && isASC ? DESC : ASC));
  };

  var thProps = enabled ? { className: props.className || "sortable", onClick: onClick } : {};

  return React.createElement("th", thProps, props.label, " ", (enabled && isSelected ? icon : null));
};

SortableTH.propTypes = {
  label: React.PropTypes.string,
  field: React.PropTypes.string,
  orderBy: React.PropTypes.string,
  onClick: React.PropTypes.func
};

module.exports = SortableTH;
