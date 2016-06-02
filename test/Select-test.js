var test = require("tape");
var React = require("react");
var TestUtils = require("react-addons-test-utils");
var Select = require("../lib/Select");

var shallowRenderer = TestUtils.createRenderer();
var onChange = function (event) { };
var sexes = [{label: "Male", value: "M"}, {label: "Female", value: "F"}];

test("lib/Select - renders", function (assert) {
	shallowRenderer.render(React.createElement(Select, { options: sexes, onChange: onChange }));

	var select = shallowRenderer.getRenderOutput();
	var options = select.props.children;

	assert.equal(select.type, "select", "The main HMTL object is a select");
	assert.equal(select.props.className, "form-control", "Bootstrap CSS class");
	assert.equal(select.props.onChange, onChange, "The onChange event function");
	assert.equal(options.length, sexes.length, "Each option has an element");
	assert.equal(options[0].type, "option", "Each child is an option");
	assert.equal(options[0].props.value, sexes[0].value, "The value is set");
	assert.equal(options[0].props.children, sexes[0].label, "The label is set");
	assert.end();
});

test("lib/Select - nullValueLabel", function (assert) {
	var nullValueLabel = "- Sex -";
	var props = { options: sexes, onChange: onChange, nullValueLabel: nullValueLabel };
	shallowRenderer.render(React.createElement(Select, props));

	var select = shallowRenderer.getRenderOutput();
	var options = select.props.children;

	assert.equal(options.length, sexes.length + 1, "The nullValueLabel adds an option");
	assert.ok(options[0].value === undefined, "The first option has no value defined");
	assert.equal(options[0].props.children, nullValueLabel, "The label is set in the first option");
	assert.end();
});

// var Select = require("react-bootstrap3-components").Select;
//
// var options = [{label: "Male", value: "M"}, {label: "Female", value: "F"}];
//
// var onChange = function (event) {
// 	// do your React stuff here
// };
//
// <Select options={options} onChange={onChange} nullValueLabel="- Sex -" />
// ```
//
// This will render
//
// ```
// <select class="form-control">
//   <option>- Sex -</option>
//   <option value="M">Male</option>
//   <option value="F">Female</option>
// </select>
