/* eslint-disable */
fetch('./templates.htm')
	.then(function (resp) { return resp.text(); })
	.then(function (data) {
		return document.querySelector('#js-fetch-templates').outerHTML = data;
	});
