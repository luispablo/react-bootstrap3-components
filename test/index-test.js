var test = require("tape");
var CheckBox = require("../lib/CheckBox");
var Input = require("../lib/Input");
var RadioButtons = require("../lib/RadioButtons");
var Select = require("../lib/Select");
var HorizontalFormItem = require("../lib/HorizontalFormItem");
var Icon = require("../lib/Icon");
var index = require("../index");

test("index - exports", function (assert) {
	assert.equal(index.CheckBox, CheckBox, "require CheckBox");
	assert.equal(index.Input, Input, "require Input");
	assert.equal(index.RadioButtons, RadioButtons, "require RadioButtons");
	assert.equal(index.HorizontalFormItem, HorizontalFormItem, "require HorizontalFormItem");
	assert.equal(index.Select, Select, "require Select");
	assert.equal(index.Icon, Icon, "require Icon");
	assert.end();
});
