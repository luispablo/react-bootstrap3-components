var debounce = function (func, wait) {
	var timeoutID = null;

	return function (param) {
		if (timeoutID) clearTimeout(timeoutID);

		timeoutID = setTimeout(function () {
			func(param);
		}, wait || 500); // default 500 milliseconds
	};
};

module.exports = debounce;
