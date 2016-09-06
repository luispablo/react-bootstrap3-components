var test = require("tape");
var React = require("react");
var TestUtils = require("react-addons-test-utils");
var SortableTH = require("../lib/SortableTH");

var renderer = TestUtils.createRenderer();
var LABEL = "test label";
var FIELD = "testField";
var func = function () {};

test("lib/SortableTH - show only label", function (assert) {
  var props = { label: LABEL, field: FIELD, orderBy: "lastName ASC", onClick: func };
  renderer.render(React.createElement(SortableTH, props));
  var th = renderer.getRenderOutput();
  assert.equal(th.type, "th", "TH element");
  assert.equal(th.props.children[0], LABEL, "Shows the label");
  assert.equal(th.props.children[1], " ", "Whitespace separates");
  assert.equal(th.props.children[2], null, "No icon");
  assert.equal(th.props.className, "sortable", "CSS class");
  assert.end();
});

test("lib/SortableTH - custom CSS class", function (assert) {
  var props = { label: LABEL, className: "customCSSClass", field: FIELD, orderBy: "lastName ASC", onClick: func };
  renderer.render(React.createElement(SortableTH, props));
  var th = renderer.getRenderOutput();
  assert.equal(th.props.className, props.className, "CSS class");
  assert.end();
});

test("lib/SortableTH - show ordered ASC", function (assert) {
  var props = { label: LABEL, field: FIELD, orderBy: FIELD +" ASC", onClick: func };
  renderer.render(React.createElement(SortableTH, props));
  var span = renderer.getRenderOutput().props.children[2];
  assert.equal(span.type, "span", "Adds SPAN with icon");
  assert.equal(span.props.className, "glyphicon glyphicon-triangle-bottom", "Triangle down");
  assert.end();
});

test("lib/SortableTH - show ordered DESC", function (assert) {
  var props = { label: LABEL, field: FIELD, orderBy: FIELD +" DESC", onClick: func };
  renderer.render(React.createElement(SortableTH, props));
  var span = renderer.getRenderOutput().props.children[2];
  assert.equal(span.type, "span", "Adds SPAN with icon");
  assert.equal(span.props.className, "glyphicon glyphicon-triangle-top", "Triangle up");
  assert.end();
});

test("lib/SortableTH - on first click", function (assert) {
  assert.plan(1);
  var onClick = function (orderBy) { assert.equal(orderBy, FIELD +" ASC", "First call is ASC"); };
  var props = { label: LABEL, field: FIELD, orderBy: "name ASC", onClick: onClick };
  renderer.render(React.createElement(SortableTH, props));
  renderer.getRenderOutput().props.onClick();
});

test("lib/SortableTH - on second click", function (assert) {
  assert.plan(1);
  var onClick = function (orderBy) { assert.equal(orderBy, FIELD +" DESC", "Second time is DESC"); };
  var props = { label: LABEL, field: FIELD, orderBy: FIELD +" ASC", onClick: onClick };
  renderer.render(React.createElement(SortableTH, props));
  renderer.getRenderOutput().props.onClick();
});
