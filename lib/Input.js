require("./Object.assign.polyfill");

var React = require("react");
var debounce = require("../lib/debounce");

var Input = React.createClass({
	getInitialState: function() {
		if (this.props.onChangeObject) {
			this.onChangeObject = this.props.wait ? debounce(this.props.onChangeObject, this.props.wait) : this.props.onChangeObject;
		}
		if (this.props.onChangeValue) {
			this.onChangeValue = this.props.wait ? debounce(this.props.onChangeValue, this.props.wait) : this.props.onChangeValue;
		}

		return { value: this.props.object[this.props.field] };
	},
	componentWillReceiveProps: function (nextProps) {
		this.setState({ value: nextProps.object[nextProps.field] });
	},
	render: function () {
		var onChange = function (event) {
			var newObject = Object.assign({}, this.props.object);
			newObject[this.props.field] = event.target.value;
			this.setState({ value: newObject[this.props.field]});

			if (this.onChangeObject) this.onChangeObject(newObject);
			if (this.onChangeValue) this.onChangeValue(newObject[this.props.field]);
		}.bind(this);

		var inputProps = Object.assign({}, this.props, {
			className: "form-control", onChange: onChange,
			value: this.state.value || ""
		});

		delete inputProps.object;
		delete inputProps.field;
		delete inputProps.onChangeObject;
		delete inputProps.onChangeValue;
		delete inputProps.wait;

		return React.createElement("input", inputProps);
	}
});

module.exports = Input;
