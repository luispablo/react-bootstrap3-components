var test = require("tape");
var React = require("react");
var TestUtils = require("react-addons-test-utils");
var Input = require("../lib/Input");

var renderer = TestUtils.createRenderer();
var person = { name: "Tom" };

test("lib/Input - renders", function (assert) {
	renderer.render(React.createElement(Input, { type: "text", object: person, field: "name", placeholder: "Name" }));

	var input = renderer.getRenderOutput();

	assert.equal(input.type, "input", "The main HMTL element is a input");
	assert.equal(input.props.type, "text", "The input type is text");
	assert.equal(input.props.className, "form-control", "Bootstrap CSS class");
	assert.equal(input.props.defaultValue, person.name, "The defaul value");

	var newName = "Wilson";
	input.props.onChange({ target: { value: newName }});
	assert.equal(person.name, newName, "The onChange updates the person name");
	assert.end();
});

test("lib/Input - type number", function (assert) {
	renderer.render(React.createElement(Input, { type: "number", object: person, field: "name", placeholder: "Name" }));
	var input = renderer.getRenderOutput();
	assert.equal(input.props.type, "number", "The input type is number");
	assert.end();
});
