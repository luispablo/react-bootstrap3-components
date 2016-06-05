var test = require("tape");
var React = require("react");
var TestUtils = require("react-addons-test-utils");
var InputText = require("../lib/InputText");
var HorizontalFormItem = require("../lib/HorizontalFormItem");

var renderer = TestUtils.createRenderer();
var person = { name: "Tom" };

test("lib/HorizontalFormItem - renders", function (assert) {
	var input = React.createElement(InputText, { object: person, field: "name", placeholder: "Name" });
	var props = { label: "Name", labelWidth: 2, inputWidth: 10 };
	var hfi = React.createElement(HorizontalFormItem, props, input);
	renderer.render(hfi);

	var div = renderer.getRenderOutput();
	var label = div.props.children[0];
	var inputDiv = div.props.children[1];

	assert.equal(div.type, "div", "The main HMTL element is a div");
	assert.equal(div.props.className, "form-group", "Bootstrap CSS class");
	assert.equal(label.type, "label", "First child the label");
	assert.equal(label.props.className, "control-label col-sm-2", "label CSS classes");
	assert.equal(label.props.children, props.label, "The label text");
	assert.equal(inputDiv.type, "div", "The input container is a DIV");
	assert.equal(inputDiv.props.className, "col-sm-10", "input DIV CSS class");
	assert.end();
});

test("lib/HorizontalFormItem - static", function (assert) {
	var props = { label: "Name", staticValue: "Tom", labelWidth: 3, inputWidth: 9 };
	var hfi = React.createElement(HorizontalFormItem, props);
	renderer.render(hfi);

	var div = renderer.getRenderOutput();
	var p = div.props.children[1].props.children;

	assert.equal(p.type, "p", "It has a paragraph");
	assert.equal(p.props.className, "form-control-static", "The p CSS class");
	assert.equal(p.props.children, props.staticValue, "The p content is staticValue");
	assert.end();
});
