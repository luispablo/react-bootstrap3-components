require("./Object.assign.polyfill");

var React = require("react");

var selectOption = function (options, selectedValue, optionsFields) {
  var filteredOptions = options.filter(function (option) {
    if (optionsFields) {
      return option[optionsFields.value] === selectedValue;
    } else {
      return option.value === selectedValue;
    }
  });
  return (filteredOptions && filteredOptions.length > 0) ? filteredOptions[0] : null;
};

var Select = React.createClass({
  propTypes: {
    object: React.PropTypes.object,
    field: React.PropTypes.string,
    options: React.PropTypes.array,
    optionsFields: React.PropTypes.object,
    null: React.PropTypes.string,
    onChange: React.PropTypes.func
  },
  getInitialState: function () {
    return { value: this.props.object[this.props.field] };
  },
  componentWillReceiveProps: function (nextProps) {
    this.setState({ value: nextProps.object[nextProps.field] });
  },
  render: function () {
    var component = this;

    var options = this.props.options.map(function (option) {
      var value, label;

      if (typeof(option) === "string") {
        value = option;
        label = option;
      } else {
        value = component.props.optionsFields ? option[component.props.optionsFields.value] : option.value;
        label = component.props.optionsFields ? option[component.props.optionsFields.label] : option.label;
      }

      return React.createElement("option", { key: value, value: value }, label);
    }).sort(function (a, b) {
      return a.props.children <= b.props.children ? -1 : 1;
    });

    if (this.props.null) options.unshift(React.createElement("option", { key: -1 }, this.props.null));

    var that = this;
    var selectProps = { className: "form-control", value: this.state.value || "" };
    selectProps.onChange = function (event) {
      var newValue = event.target.value;
      var actualValue = that.props.null && that.props.null === newValue ? null : newValue;

      component.setState({ value: actualValue });

      if (component.props.onChangeObject) {
        var newObject = Object.assign({}, component.props.object);
        newObject[component.props.field] = actualValue;
        component.props.onChangeObject(newObject);
      }
      if (component.props.onChangeValue) {
        component.props.onChangeValue(selectOption(component.props.options, actualValue, component.props.optionsFields));
      }
    };

    return React.createElement("select", selectProps, options);
  }
});

module.exports = Select;
