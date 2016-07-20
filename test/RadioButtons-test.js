var test = require("tape");
var React = require("react");
var TestUtils = require("react-addons-test-utils");
var RadioButtons = require("../lib/RadioButtons");

var person = { name: "John", gender: "M", titleId: 1 };
var genders = [{label: "Male", value: "M"}, {label: "Female", value: "F"}];
var titles = [{id: 1, name: "Mr."}, {id: 2, name: "Mrs."}];

test("lib/RadioButtons - renders", function (assert) {
	var props = { object: person, field: "gender", options: genders, inline: true };
	var renderer = TestUtils.createRenderer();
	renderer.render(React.createElement(RadioButtons, props));

	var containerSpan = renderer.getRenderOutput();
	var labels = containerSpan.props.children;

	assert.equal(labels.length, 2, "Two items");
	assert.equal(labels[0].type, RadioButtons.Label, "Label element");

	renderer.render(labels[0]);
	var label0 = renderer.getRenderOutput();

	assert.equal(label0.props.className, "radio-inline", "The CSS class");
	assert.equal(label0.props.children[1], genders[0].label + " ", "The label");

	var input0 = label0.props.children[0];
	assert.equal(input0.type, "input", "Input element");
	assert.equal(input0.props.name, props.field, "The name is the field");
	assert.equal(input0.props.value, genders[0].value, "The input 0 value");
	assert.ok(input0.props.checked, "This is the value selected by default");
	assert.end();
});

test("lib/RadioButtons - not inline", function (assert) {
	var props = { object: person, field: "gender", options: genders };
	var renderer = TestUtils.createRenderer();
	renderer.render(React.createElement(RadioButtons, props));

	var containerSpan = renderer.getRenderOutput();
	var divs = containerSpan.props.children;

	assert.equal(divs[0].type, RadioButtons.Div, "A container DIV");

	renderer.render(divs[0]);
	var div0 = renderer.getRenderOutput();

	assert.equal(div0.props.className, "radio", "The DIV CSS class");
	assert.equal(div0.props.children.type, RadioButtons.Label, "Inside the DIV is the label");
	assert.end();
});

test("lib/RadioButtons - with custom value and label", function (assert) {
	var props = {
		object: person, field: "titleId", options: titles, inline: true,
		optionsFields: {value: "id", label: "name"},
		onChange: function (e) { person.titleId = parseInt(e.target.value); }
	};
	var renderer = TestUtils.createRenderer();
	renderer.render(React.createElement(RadioButtons, props));

	var containerSpan = renderer.getRenderOutput();
	var labels = containerSpan.props.children;

	renderer.render(labels[0]);
	var label0 = renderer.getRenderOutput();

	assert.equal(label0.props.children[1], titles[0].name + " ", "The label is the name");
	assert.equal(label0.props.children[0].props.value, titles[0].id, "The ID is the value");
	assert.end();
});

test("lib/RadioButtons - onChangeObject without optionsFields", function (assert) {
	var props = { object: person, field: "gender", options: genders };

	assert.plan(2);
	props.onChangeObject = function (newPerson) {
		assert.notDeepEqual(newPerson, person, "It's not the same object");
		assert.equal(newPerson.gender, genders[1].value, "The gender is updated");
	};

	var renderer = TestUtils.createRenderer();
	renderer.render(React.createElement(RadioButtons, props));
	var containerSpan = renderer.getRenderOutput();
	renderer.render(containerSpan.props.children[1]);
	var div = renderer.getRenderOutput();
	renderer.render(div.props.children);
	var inputRadio = renderer.getRenderOutput().props.children[0];
	inputRadio.props.onChange({ target: { value: genders[1].value }});
});

test("lib/RadioButtons - onChangeObject with optionsFields", function (assert) {
	var props = {
		object: person, field: "titleId",
		options: titles, optionsFields: {value: "id", label: "name"}
	};

	assert.plan(2);
	props.onChangeObject = function (newPerson) {
		assert.notDeepEqual(newPerson, person, "It's not the same object");
		assert.equal(newPerson.titleId, titles[1].id, "The title ID is updated");
	};

	var renderer = TestUtils.createRenderer();
	renderer.render(React.createElement(RadioButtons, props));
	var containerSpan = renderer.getRenderOutput();
	renderer.render(containerSpan.props.children[1]);
	var div = renderer.getRenderOutput();
	renderer.render(div.props.children);
	var inputRadio = renderer.getRenderOutput().props.children[0];
	inputRadio.props.onChange({ target: { value: titles[1].id }});
});

test("lib/RadioButtons - onChangeValue without optionsFields", function (assert) {
	var props = { object: person, field: "gender", options: genders };

	assert.plan(1);
	props.onChangeValue = function (newGender) {
		assert.deepEqual(newGender, genders[1], "The selected gender");
	};

	var renderer = TestUtils.createRenderer();
	renderer.render(React.createElement(RadioButtons, props));
	var containerSpan = renderer.getRenderOutput();
	renderer.render(containerSpan.props.children[1]);
	var div = renderer.getRenderOutput();
	renderer.render(div.props.children);
	var inputRadio = renderer.getRenderOutput().props.children[0];
	inputRadio.props.onChange({ target: { value: genders[1].value }});
});

test("lib/RadioButtons - onChangeValue with optionsFields", function (assert) {
	var props = {
		object: person, field: "titleId",
		options: titles, optionsFields: {value: "id", label: "name"}
	};

	assert.plan(1);
	props.onChangeValue = function (newTitle) {
		assert.deepEqual(newTitle, titles[1], "The title selected");
	};

	var renderer = TestUtils.createRenderer();
	renderer.render(React.createElement(RadioButtons, props));
	var containerSpan = renderer.getRenderOutput();
	renderer.render(containerSpan.props.children[1]);
	var div = renderer.getRenderOutput();
	renderer.render(div.props.children);
	var inputRadio = renderer.getRenderOutput().props.children[0];
	inputRadio.props.onChange({ target: { value: titles[1].id }});
});
