var test = require("tape");
var React = require("react");
var TestUtils = require("react-addons-test-utils");
var HorizontalFormRadioButton = require("../lib/HorizontalFormRadioButton");

var shallowRenderer = TestUtils.createRenderer();
var onChange = function () { };

test("lib/HorizontalFormRadioButton - renders", function (assert) {
	var options = [{label: "Male", value: "M"}, {label: "Female", value: "F"}];
	var props = {value: "M", onChange: onChange, label: "sex", labelWidth: 3, inputWith: 9, options: options};

	shallowRenderer.render(React.createElement(HorizontalFormRadioButton, props));

	var mainDiv = shallowRenderer.getRenderOutput();

	assert.equal(mainDiv.type, "div", "The main HMTL object is a div");
	assert.end();
});
