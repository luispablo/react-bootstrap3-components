var test = require("tape");
var React = require("react");
var TestUtils = require("react-addons-test-utils");
var Select = require("../lib/Select");

var titles = [ {id: 1, name: "Mr."}, {id: 2, name: "Mrs."}];
var person = { name: "John", gender: "M", titleId: 1 };
var genders = [{label: "Male", value: "M"}, {label: "Female", value: "F"}];

test("lib/Select - renders", function (assert) {
	var selectProps = {object: person, field: "gender", options: genders, null: "- Gender -" };
	var renderer = TestUtils.createRenderer();
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
	assert.equal(select.props.value, person.gender, "The value prop is set");
	assert.end();
});

test("lib/Select - order by label", function (assert) {
	var selectProps = {object: person, field: "gender", options: genders, null: "- Gender -" };
	var renderer = TestUtils.createRenderer();
	renderer.render(React.createElement(Select, selectProps));

	var options = renderer.getRenderOutput().props.children;

	assert.equal(options[0].props.children, selectProps.null, "First the -");
	assert.equal(options[1].props.children, "Female", "Second the F");
	assert.equal(options[2].props.children, "Male", "Last the M");
	assert.end();
});

test("lib/Select - with array of string", function (assert) {
	var selectProps = {object: person, field: "gender", options: ["FEMALE", "MALE"], null: "- Gender -" };
	var renderer = TestUtils.createRenderer();
	renderer.render(React.createElement(Select, selectProps));

	var options = renderer.getRenderOutput().props.children;

	assert.equal(options[1].props.children, "FEMALE");
	assert.equal(options[1].props.value, "FEMALE");
	assert.equal(options[2].props.children, "MALE");
	assert.equal(options[2].props.value, "MALE");
	assert.end();
});

test("lib/Select - onChangeObject with null value", function (assert) {
  var nullLabel = "-";
	var props = { object: person, field: "gender", options: genders, null: nullLabel };

	assert.plan(1);
	props.onChangeObject = function (newPerson) {
		assert.equal(newPerson.gender, null, "The gender should be null and not -");
	};

	var renderer = TestUtils.createRenderer();
	renderer.render(React.createElement(Select, props));
	var select = renderer.getRenderOutput();
	select.props.onChange({ target: { value: nullLabel }});
});

test("lib/Select - onChangeObject without optionsFields", function (assert) {
	var props = { object: person, field: "gender", options: genders };

	assert.plan(1);
	props.onChangeObject = function (newPerson) {
		assert.equal(newPerson.gender, genders[1].value, "The gender is changed");
	};

	var renderer = TestUtils.createRenderer();
	renderer.render(React.createElement(Select, props));
	var select = renderer.getRenderOutput();
	select.props.onChange({ target: { value: genders[1].value }});
});

test("lib/Select - onChangeObject with optionsFields", function (assert) {
	var props = {
		object: person, field: "titleId", options: titles,
		optionsFields: { value: "id", label: "name" }
	};

	assert.plan(1);
	props.onChangeObject = function (newPerson) {
		assert.equal(newPerson.titleId, titles[1].id, "The title ID is changed");
	};

	var renderer = TestUtils.createRenderer();
	renderer.render(React.createElement(Select, props));
	var select = renderer.getRenderOutput();
	select.props.onChange({ target: { value: titles[1].id }});
});

test("lib/Select - onChangeValue without optionsFields", function (assert) {
	var props = { object: person, field: "gender", options: genders };

	assert.plan(1);
	props.onChangeValue = function (newGender) {
		assert.equal(newGender, genders[1], "The selected gender");
	};

	var renderer = TestUtils.createRenderer();
	renderer.render(React.createElement(Select, props));
	var select = renderer.getRenderOutput();
	select.props.onChange({ target: { value: genders[1].value }});
});

test("lib/Select - onChangeValue with optionsFields", function (assert) {
	var props = {
		object: person, field: "titleId", options: titles,
		optionsFields: { value: "id", label: "name" }
	};

	assert.plan(1);
	props.onChangeValue = function (newTitle) {
		assert.equal(newTitle, titles[1], "The selected title");
	};

	var renderer = TestUtils.createRenderer();
	renderer.render(React.createElement(Select, props));
	var select = renderer.getRenderOutput();
	select.props.onChange({ target: { value: titles[1].id }});
});
