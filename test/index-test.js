var test = require("tape");
var CheckBox = require("../lib/CheckBox");
var InputText = require("../lib/InputText");
var RadioButtons = require("../lib/RadioButtons");
var Select = require("../lib/Select");
var HorizontalFormItem = require("../lib/HorizontalFormItem");
var index = require("../index");

test("index - exports", function (assert) {
	assert.equal(index.CheckBox, CheckBox, "require CheckBox");
	assert.equal(index.InputText, InputText, "require InputText");
	assert.equal(index.RadioButtons, RadioButtons, "require RadioButtons");
	assert.equal(index.HorizontalFormItem, HorizontalFormItem, "require HorizontalFormItem");
	assert.equal(index.Select, Select, "require Select");
	assert.end();
});
