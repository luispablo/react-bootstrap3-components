var test = require("tape");
var debounce = require("../lib/debounce");

test("lib/debounce - runs ok", function (assert) {
	assert.plan(1);
	var debounced = debounce(function () {
		assert.ok("function invoked");
	}, 1);
	debounced();
});

test("lib/debounce - waits 100 ms", function (assert) {
	assert.plan(1);
	var start = Date.now();
	var wait = 100;
	var debounced = debounce(function () {
		// Give or take 5 milliseconds...
		var elapsedTime = Date.now() - start;
		assert.ok(wait - 5 < elapsedTime && elapsedTime < wait + 5, "It waited "+ wait +" milliseconds");
	}, wait);
	debounced();
});

test("lib/debounce - runs only last one", function (assert) {
	assert.plan(1);
	var debounced = debounce(function () {
		assert.ok("Should be invoked only once");
	});
	debounced();
	debounced();
	debounced();
});
