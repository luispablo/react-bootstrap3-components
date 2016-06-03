var test = require("tape");
var React = require("react");
var TestUtils = require("react-addons-test-utils");
var HorizontalFormInputText = require("../lib/HorizontalFormInputText");

var renderer = TestUtils.createRenderer();
var person = { name: "Tom" };

test("lib/HorizontalFormInputText - renders", function (assert) {
	var props = { object: person, field: "name", label: "Name", widths: [2, 10] };
	renderer.render(React.createElement(HorizontalFormInputText, props));

	var mainDiv = renderer.getRenderOutput();
	var label = mainDiv.props.children[0];
	var inputDiv = mainDiv.props.children[1];
	var inputText = inputDiv.props.children;

	assert.equal(mainDiv.type, "div", "The main HMTL object is a div");
	assert.equal(label.type, "label", "First a label");
	assert.equal(label.props.children, "Name", "The label content");
	assert.equal(inputDiv.type, "div", "Then the input div");
	assert.equal(inputText.type, "input", "The input element");
	assert.equal(inputText.props.type, "text", "Input type text");
	assert.equal(label.props.className, "control-label col-sm-2", "Label width");
	assert.equal(inputDiv.props.className, "col-sm-10", "Input width");
	assert.equal(inputText.props.defaultValue, person.name, "The input default value");
	assert.end();
});

test("lib/HorizontalFormInputText - onChange", function (assert) {
	var newName = "Wilson";
	var otherPerson = { name: "Tom" };
	var props = { object: otherPerson, field: "name", label: "Name", widths: [2, 10] };
	renderer.render(React.createElement(HorizontalFormInputText, props));

	var mainDiv = renderer.getRenderOutput();
	var inputText = mainDiv.props.children[1].props.children;
	inputText.props.onChange({ target: { value: newName }});

	assert.equal(otherPerson.name, newName, "Changed the name of the person");
	assert.end();
});
