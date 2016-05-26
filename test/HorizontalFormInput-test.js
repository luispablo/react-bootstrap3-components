var test = require("tape");
var React = require("react");
var TestUtils = require("react-addons-test-utils");
var HorizontalFormInput = require("../lib/HorizontalFormInput");

var shallowRenderer = TestUtils.createRenderer();

test("lib/HorizontalFormInput - renders", function (assert) {
	var props = {type: "text", label: "Test label", value: "Test value", labelWidth: 3, inputWidth: 9};
	shallowRenderer.render(React.createElement(HorizontalFormInput, props));

	var mainDiv = shallowRenderer.getRenderOutput();
	var label = mainDiv.props.children[0];
	var inputDiv = mainDiv.props.children[1];

	assert.equal(mainDiv.type, "div", "The main HMTL object is a div");
	assert.equal(label.type, "label", "First a label");
	assert.equal(label.props.className, "control-label col-sm-3", "The CSS class name");
	assert.equal(inputDiv.type, "div", "Then the input div");
	assert.equal(inputDiv.props.className, "col-sm-9", "The input div CSS class name");
	assert.end();
});
