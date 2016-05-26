var test = require("tape");
var React = require("react");
var TestUtils = require("react-addons-test-utils");
var HorizontalFormCheckbox = require("../lib/HorizontalFormCheckbox");

var shallowRenderer = TestUtils.createRenderer();
var onChange = function () { };

test("lib/HorizontalFormCheckbox - renders", function (assert) {
	var props = {value: true, onChange: onChange, label: "test label", labelWidth: 3, inputWith: 9};

	shallowRenderer.render(React.createElement(HorizontalFormCheckbox, props));

	var mainDiv = shallowRenderer.getRenderOutput();

	assert.equal(mainDiv.type, "div", "The main HMTL object is a div");
	assert.end();
});
