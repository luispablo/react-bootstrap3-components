var test = require("tape");
var HorizontalFormCheckbox = require("../lib/HorizontalFormCheckbox");
var HorizontalFormInput = require("../lib/HorizontalFormInput");
var HorizontalFormRadioButton = require("../lib/HorizontalFormRadioButton");
var index = require("../index");

test("index - exports", function (assert) {
	assert.equal(index.HorizontalFormCheckbox, HorizontalFormCheckbox, "require HorizontalFormCheckbox");
	assert.equal(index.HorizontalFormInput, HorizontalFormInput, "require HorizontalFormInput");
	assert.equal(index.HorizontalFormRadioButton, HorizontalFormRadioButton, "require HorizontalFormRadioButton");
	assert.end();
});
