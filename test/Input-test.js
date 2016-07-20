require("../lib/Object.assign.polyfill");

var test = require("tape");
var React = require("react");
var TestUtils = require("react-addons-test-utils");
var Input = require("../lib/Input");

var person = { name: "Tom" };
var defaultProps = { type: "text", object: person, field: "name" };

test("lib/Input - renders", function (assert) {
	var renderer = TestUtils.createRenderer();
	renderer.render(React.createElement(Input, { type: "text", object: person, field: "name", placeholder: "Name" }));

	var input = renderer.getRenderOutput();

	assert.equal(input.type, "input", "The main HMTL element is a input");
	assert.equal(input.props.type, "text", "The input type is text");
	assert.equal(input.props.className, "form-control", "Bootstrap CSS class");
	assert.equal(input.props.value, person.name, "The controlled value");
	assert.end();
});

test("lib/Input - type number", function (assert) {
	var renderer = TestUtils.createRenderer();
	renderer.render(React.createElement(Input, { type: "number", object: person, field: "name", placeholder: "Name" }));
	var input = renderer.getRenderOutput();
	assert.equal(input.props.type, "number", "The input type is number");
	assert.end();
});

test("lib/Input - uses ALL provided props", function (assert) {
	var renderer = TestUtils.createRenderer();
	var props = Object.assign({}, defaultProps, { autoFocus: true });
	renderer.render(React.createElement(Input, props));
	var input = renderer.getRenderOutput();
	assert.ok(input.props.autoFocus, "Has the autoFocus set");
	assert.end();
});

test("lib/Input - onChangeObject", function (assert) {
	var renderer = TestUtils.createRenderer();
	var newName = "William";
	var onChangeObject = function (newPerson) {
		assert.equal(newPerson.name, newName, "The new name is already set");
		assert.end();
	};
	var props = Object.assign({}, defaultProps, { onChangeObject: onChangeObject });
	renderer.render(React.createElement(Input, props));
	var input = renderer.getRenderOutput();

	input.props.onChange({ target: { value: newName }});
});

test("lib/Input - onChangeValue", function (assert) {
	var renderer = TestUtils.createRenderer();
	var newName = "William";
	var onChangeValue = function (name) {
		assert.equal(name, newName, "The new name is already set");
		assert.end();
	};
	var props = Object.assign({}, defaultProps, { onChangeValue: onChangeValue });
	renderer.render(React.createElement(Input, props));
	var input = renderer.getRenderOutput();

	input.props.onChange({ target: { value: newName }});
});

test("lib/Input - debounce onChangeObject", function (assert) {
	var renderer = TestUtils.createRenderer();
	var newName = "William";
	var wait = 50;
	var start = Date.now();
	var onChangeValue = function (name) {
		var elapsedTime = Date.now() - start;
		assert.equal(name, newName, "The new name is already set");
		assert.ok(elapsedTime >= wait && elapsedTime <= wait + 10, "The exact wait time, or 10 milliseconds delay for test run time");
	};
	var props = Object.assign({}, defaultProps, { onChangeValue: onChangeValue, wait: wait });
	renderer.render(React.createElement(Input, props));
	var input = renderer.getRenderOutput();
	assert.plan(2);
	input.props.onChange({ target: { value: newName }});
});

test("lib/Input - debounce onChangeObject", function (assert) {
	var renderer = TestUtils.createRenderer();
	var newName = "William";
	var wait = 50;
	var start = Date.now();
	var onChangeObject = function (newPerson) {
		var elapsedTime = Date.now() - start;
		assert.equal(newPerson.name, newName, "The new name is already set");
		assert.ok(elapsedTime >= wait && elapsedTime <= wait + 10, "The exact wait time, or 10 milliseconds delay for test run time");
	};
	var props = Object.assign({}, defaultProps, { onChangeObject: onChangeObject, wait: wait });
	renderer.render(React.createElement(Input, props));
	var input = renderer.getRenderOutput();
	assert.plan(2);
	input.props.onChange({ target: { value: newName }});
});
