var test = require("tape");
var React = require("react");
var TestUtils = require("react-addons-test-utils");
var Icon = require("../lib/Icon");

var renderer = TestUtils.createRenderer();

test("lib/Icon - renders", function (assert) {
	renderer.render(React.createElement(Icon, { name: "ok" }));
	var span = renderer.getRenderOutput();
	assert.equal(span.type, "span", "The main HMTL element is a span");
	assert.equal(span.props.className, "glyphicon glyphicon-ok", "The expected CSS classname");
	assert.equal(span.props["aria-hidden"], "true", "Special accessibility property");
	assert.end();
});

test("lib/Icon - visible property", function (assert) {
	renderer.render(React.createElement(Icon, { name: "ok", visible: true }));
	assert.notOk(renderer.getRenderOutput() === null, "It is rendered");
	renderer.render(React.createElement(Icon, { name: "ok", visible: false }));
	assert.ok(renderer.getRenderOutput() === null, "It's not rendered");
	assert.end();
});
