var test = require("tape");
var React = require("react");
var TestUtils = require("react-addons-test-utils");
var InputText = require("../lib/InputText");

var renderer = TestUtils.createRenderer();
var person = { name: "Tom" };

test("lib/InputText - renders", function (assert) {
	renderer.render(React.createElement(InputText, { object: person, field: "name", placeholder: "Name" }));

	var input = renderer.getRenderOutput();

	assert.equal(input.type, "input", "The main HMTL element is a input");
	assert.equal(input.props.className, "form-control", "Bootstrap CSS class");
	assert.equal(input.props.defaultValue, person.name, "The defaul value");

	var newName = "Wilson";
	input.props.onChange({ target: { value: newName }});
	assert.equal(person.name, newName, "The onChange updates the person name");
	assert.end();
});
