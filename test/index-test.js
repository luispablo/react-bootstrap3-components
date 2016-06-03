var test = require("tape");
var HorizontalFormCheckbox = require("../lib/HorizontalFormCheckbox");
var HorizontalFormInput = require("../lib/HorizontalFormInput");
var HorizontalFormInputText = require("../lib/HorizontalFormInputText");
var HorizontalFormRadioButton = require("../lib/HorizontalFormRadioButton");
var Select = require("../lib/Select");
var index = require("../index");

test("index - exports", function (assert) {
	assert.equal(index.HorizontalFormCheckbox, HorizontalFormCheckbox, "require HorizontalFormCheckbox");
	assert.equal(index.HorizontalFormInput, HorizontalFormInput, "require HorizontalFormInput");
	assert.equal(index.HorizontalFormRadioButton, HorizontalFormRadioButton, "require HorizontalFormRadioButton");
	assert.equal(index.HorizontalFormInputText, HorizontalFormInputText, "require HorizontalFormInputText");
	assert.equal(index.Select, Select, "require Select");
	assert.end();
});
