var test = require("tape");
var React = require("react");
var TestUtils = require("react-addons-test-utils");
var CheckBox = require("../lib/CheckBox");

var renderer = TestUtils.createRenderer();
var person = { name: "Tom", hasId: true };

test("lib/CheckBox - renders", function (assert) {
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

	label.props.children[0].props.onChange({ target: { checked: false }});
	assert.notOk(person.hasId, "Now it hasn't got ID");
	assert.end();
});

test("lib/CheckBox - inline", function (assert) {
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

test("lib/CheckBox - override onChange", function (assert) {
	var _onChange = function (e) { person.hasId = e.target.checked ? "t" : "f" };
	var props = { object: person, field: "hasId", label: "Has ID?", onChange: _onChange };
	renderer.render(React.createElement(CheckBox, props));

	var Div = renderer.getRenderOutput();
	renderer.render(Div);
	var div = renderer.getRenderOutput();
	renderer.render(div.props.children);
	var label = renderer.getRenderOutput();
	label.props.children[0].props.onChange({ target: { checked: false }});

	assert.equal(person.hasId, "f", "hasId now should be f");
	assert.end();
});
