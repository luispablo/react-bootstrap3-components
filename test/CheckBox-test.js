var test = require("tape");
var React = require("react");
var TestUtils = require("react-addons-test-utils");
var CheckBox = require("../lib/CheckBox");

var person = { name: "Tom", hasId: true, isActive: "TRUE" };

test("lib/CheckBox - renders", function (assert) {
	var renderer = TestUtils.createRenderer();
	var props = { object: person, field: "hasId", label: "Has ID?" };
	renderer.render(React.createElement(CheckBox, props));

	var Div = renderer.getRenderOutput();
	renderer.render(Div);
	var div = renderer.getRenderOutput();

	assert.equal(div.type, "div", "The main HMTL element is a div");
	assert.equal(div.props.className, "checkbox", "Bootstrap CSS class");

	renderer.render(div.props.children);
	var label = renderer.getRenderOutput();
	assert.equal(label.type, "label", "Label HTML element");
	assert.equal(label.props.children[0].type, "input", "The first child is the input");
	assert.equal(label.props.children[2], props.label, "The third is the label");
	assert.end();
});

test("lib/CheckBox - checked value with mappings", function (assert) {
	var props = { object: person, field: "isActive", label: "Is active?", mappings: { true: "TRUE", false: "FALSE" } };

	var renderer = TestUtils.createRenderer();
	renderer.render(React.createElement(CheckBox, props));
	var Div = renderer.getRenderOutput();
	renderer.render(Div);
	var div = renderer.getRenderOutput();
	renderer.render(div.props.children);
	var inputCheckbox = renderer.getRenderOutput().props.children[0];

	assert.equal(inputCheckbox.props.checked, true, "It must be checked");
	assert.end();
});

test("lib/CheckBox - unchecked value with mappings", function (assert) {
	var props = { object: person, field: "isActive", label: "Is active?", mappings: { true: "FALSE", false: "TRUE" } };

	var renderer = TestUtils.createRenderer();
	renderer.render(React.createElement(CheckBox, props));
	var Div = renderer.getRenderOutput();
	renderer.render(Div);
	var div = renderer.getRenderOutput();
	renderer.render(div.props.children);
	var inputCheckbox = renderer.getRenderOutput().props.children[0];

	assert.equal(inputCheckbox.props.checked, false, "It mustn't be checked");
	assert.end();
});

test("lib/CheckBox - inline", function (assert) {
	var renderer = TestUtils.createRenderer();
	var props = { object: person, field: "hasId", label: "Has ID?", inline: true };
	renderer.render(React.createElement(CheckBox, props));
	var Label = renderer.getRenderOutput();
	renderer.render(Label);
	var label = renderer.getRenderOutput();
	assert.equal(label.type, "label", "The main HTML element is label");
	assert.equal(label.props.className, "checkbox-inline", "The CSS class");
	assert.equal(label.props.children[0].type, "input", "Inside the label is the input");
	assert.end();
});

test("lib/CheckBox - uses ALL provided props", function (assert) {
	var renderer = TestUtils.createRenderer();
	var props = { object: person, field: "hasId", label: "Has ID?", autoFocus: true };
	renderer.render(React.createElement(CheckBox, props));
	var checkbox = renderer.getRenderOutput();

	assert.ok(checkbox.props.autoFocus, "Has the autoFocus set");
	assert.end();
});

test("lib/CheckBox - true / false mappings", function (assert) {
	var renderer = TestUtils.createRenderer();
	var props = { object: person, field: "isActive", label: "Is active?", mappings: { true: "TRUE", false: "FALSE" } };
	assert.plan(1);
	props.onChangeValue = function (newValue) {
		assert.equal(newValue, "FALSE", "Returns the mapping value");
	};
	renderer.render(React.createElement(CheckBox, props));
	var Div = renderer.getRenderOutput();
	renderer.render(Div);
	var div = renderer.getRenderOutput();
	renderer.render(div.props.children);
	var label = renderer.getRenderOutput();

	label.props.children[0].props.onChange({ target: { checked: false }});
});

test("lib/CheckBox - onChangeObject", function (assert) {
	var renderer = TestUtils.createRenderer();
	var props = { object: person, field: "hasId", label: "Has ID?" };
	assert.plan(2);
	props.onChangeObject = function (newPerson) {
		assert.notDeepEqual(person, newPerson, "The given object mustn't be changed");
		assert.notOk(newPerson.hasId, "The new person shouldn't have ID");
	};

	renderer.render(React.createElement(CheckBox, props));
	var Div = renderer.getRenderOutput();
	renderer.render(Div);
	var div = renderer.getRenderOutput();
	renderer.render(div.props.children);
	var label = renderer.getRenderOutput();

	label.props.children[0].props.onChange({ target: { checked: false }});
});

test("lib/CheckBox - onChangeValue", function (assert) {
	var renderer = TestUtils.createRenderer();
	var props = { object: person, field: "hasId", label: "Has ID?" };
	assert.plan(1);
	props.onChangeValue = function (newValue) {
		assert.notOk(newValue, "The new value is false");
	};

	renderer.render(React.createElement(CheckBox, props));
	var Div = renderer.getRenderOutput();
	renderer.render(Div);
	var div = renderer.getRenderOutput();
	renderer.render(div.props.children);
	var label = renderer.getRenderOutput();

	label.props.children[0].props.onChange({ target: { checked: false }});
});
