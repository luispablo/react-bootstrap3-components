var test = require("tape");
var React = require("react");
var TestUtils = require("react-addons-test-utils");
var Input = require("../lib/Input");
var HorizontalFormItem = require("../lib/HorizontalFormItem");

var renderer = TestUtils.createRenderer();
var person = { name: "Tom" };

test("lib/HorizontalFormItem - renders", function (assert) {
	var input = React.createElement(Input, { type: "text", object: person, field: "name", placeholder: "Name" });
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
	assert.equal(label.props.children[1], props.label, "The label text");
	assert.equal(inputDiv.type, "div", "The input container is a DIV");
	assert.equal(inputDiv.props.className, "col-sm-10", "input DIV CSS class");
	assert.end();
});

test("lib/HorizontalFormItem - validation", function (assert) {
	var input = React.createElement(Input, { type: "text", object: person, field: "name", placeholder: "Name" });
	var validation = { state: "error", message: "Use only numbers and letters" };
	var props = { label: "Name", labelWidth: 2, inputWidth: 10, validation: validation };
	var hfi = React.createElement(HorizontalFormItem, props, input);
	renderer.render(hfi);

	var div = renderer.getRenderOutput();
	var span = div.props.children[1].props.children[1];

	assert.equal(div.props.className, "form-group has-error", "CSS class to mark a validation item");
	assert.equal(span.type, "span", "The helper text block");
	assert.equal(span.props.className, "help-block", "CSS class for helper block");
	assert.equal(span.props.children, validation.message, "The validation message given");
	assert.end();
});

test("lib/HorizontalFormItem - showRequired", function (assert) {
  var input = React.createElement(Input, { type: "text", object: person, field: "name" });
  var props = { label: "Name", labelWidth: 2, inputWidth: 10, showRequired: true };
  var hfi = React.createElement(HorizontalFormItem, props, input);
  renderer.render(hfi);

  var div = renderer.getRenderOutput();
  var label = div.props.children[0];
  var span = label.props.children[0];

  assert.equal(span.type, "span", "The asterisk SPAN");
  assert.equal(span.props.className, "required-asterisk", "The asterisk CSS class");
  assert.equal(span.props.children, "*", "The SPAN content");
  assert.end();
});

test("lib/HorizontalFormItem - static", function (assert) {
	var props = { label: "Name", staticValue: "Tom", labelWidth: 3, inputWidth: 9 };
	var hfi = React.createElement(HorizontalFormItem, props);
	renderer.render(hfi);

	var div = renderer.getRenderOutput();
	var p = div.props.children[1].props.children[0];

	assert.equal(p.type, "p", "It has a paragraph");
	assert.equal(p.props.className, "form-control-static", "The p CSS class");
	assert.equal(p.props.children, props.staticValue, "The p content is staticValue");
	assert.end();
});
