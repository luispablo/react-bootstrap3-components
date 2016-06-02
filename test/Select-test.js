var test = require("tape");
var React = require("react");
var TestUtils = require("react-addons-test-utils");
var Select = require("../lib/Select");

var renderer = TestUtils.createRenderer();
var onChange = function (event) { };
var sexes = [{label: "Female", value: "F"}, {label: "Male", value: "M"}];

test("lib/Select - renders", function (assert) {
	renderer.render(React.createElement(Select, { options: sexes, onChange: onChange }));

	var select = renderer.getRenderOutput();
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
	renderer.render(React.createElement(Select, props));

	var select = renderer.getRenderOutput();
	var options = select.props.children;

	assert.equal(options.length, sexes.length + 1, "The nullValueLabel adds an option");
	assert.ok(options[0].value === undefined, "The first option has no value defined");
	assert.equal(options[0].props.children, nullValueLabel, "The label is set in the first option");
	assert.end();
});

test("lib/Select - selected value", function (assert) {
	renderer.render(React.createElement(Select, { options: sexes, onChange: onChange, selectedValue: sexes[1].value }));

	var select = renderer.getRenderOutput();

	assert.equal(select.props.defaultValue, sexes[1].value, "The defaultValue prop of React");
	assert.end();
});

test("lib/Select - value and label fields", function (assert) {
	var people = [{id: 1, name: "Tom"}, {id: 2, name: "William"}];
	renderer.render(React.createElement(Select, {options: people, onChange: onChange, valueField: "id", labelField: "name"}));
	var options = renderer.getRenderOutput().props.children;
	assert.equal(options[0].props.value, people[0].id, "The value is the ID");
	assert.equal(options[0].props.children, people[0].name, "The label is the name");
	assert.end();
});

test("lib/Select - order by label", function (assert) {
	var people = [{id: 1, name: "Wilson"}, {id: 2, name: "Bewolf"}, {id: 3, name: "Alex"}];
	renderer.render(React.createElement(Select, {options: people, onChange: onChange, valueField: "id", labelField: "name"}));
	var options = renderer.getRenderOutput().props.children;
	assert.equal(options[0].props.children, "Alex", "First the A");
	assert.equal(options[1].props.children, "Bewolf", "Second the B");
	assert.equal(options[2].props.children, "Wilson", "And last the W");
	assert.end();
});
