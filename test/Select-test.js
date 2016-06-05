var test = require("tape");
var React = require("react");
var TestUtils = require("react-addons-test-utils");
var Select = require("../lib/Select");

var renderer = TestUtils.createRenderer();
var onChange = function (event) { };
var titles = [ {id: 1, name: "Mr."}, {id: 2, name: "Mrs."}];
var person = { name: "John", gender: "M", titleId: 1 };
var genders = [{label: "Male", value: "M"}, {label: "Female", value: "F"}];

test("lib/Select - renders", function (assert) {
	var selectProps = {object: person, field: "gender", options: genders, null: "- Gender -" };
	renderer.render(React.createElement(Select, selectProps));

	var select = renderer.getRenderOutput();
	var options = select.props.children;

	assert.equal(select.type, "select", "The main HMTL object is a select");
	assert.equal(select.props.className, "form-control", "Bootstrap CSS class");
	assert.equal(options.length, genders.length + 1, "Each option has an element");
	assert.equal(options[0].type, "option", "Each child is an option");
	assert.equal(options[0].props.children, selectProps.null, "The null option label");
	assert.equal(options[1].props.value, genders[1].value, "The value is set");
	assert.equal(options[1].props.children, genders[1].label, "The label is set");
	assert.equal(select.props.defaultValue, person.gender, "The defaultValue prop is set");
	assert.end();
});

test("lib/Select - value and label fields", function (assert) {
	var selectProps = {
		object: person, field: "titleId", options: titles,
		optionsFields: {value: "id", label: "name"},
		onChange: function (e) { person.titleId = parseInt(e.target.value) }
	};
	renderer.render(React.createElement(Select, selectProps));

	var select = renderer.getRenderOutput();
	var options = select.props.children;

	assert.equal(options[0].props.value, titles[0].id, "The value is the ID");
	assert.equal(options[0].props.children, titles[0].name, "The label is the name");

	select.props.onChange({ target: { value: "2" }});

	assert.equal(person.titleId, 2, "The title ID is changed");
	assert.end();
});

test("lib/Select - order by label", function (assert) {
	var selectProps = {object: person, field: "gender", options: genders, null: "- Gender -" };
	renderer.render(React.createElement(Select, selectProps));

	var options = renderer.getRenderOutput().props.children;

	assert.equal(options[0].props.children, selectProps.null, "First the -");
	assert.equal(options[1].props.children, "Female", "Second the F");
	assert.equal(options[2].props.children, "Male", "Last the M");
	assert.end();
});
