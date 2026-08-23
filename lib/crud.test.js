'use strict';

/* global describe, it */

const assert = require('node:assert/strict');
const { createListHTML, createListHTMLInstances } = require('./crud');

describe('HTML list generation', () => {
	const adapter = {
		config: {
			userSelectedLanguage: 'en',
		},
	};

	const deviceListTypes = ['linkQualityList', 'offlineList', 'batteryList'];
	const instanceListTypes = [
		'allInstancesList',
		'allActiveInstancesList',
		'errorInstanceList',
		'deactivatedInstanceList',
		'updateAdapterList',
	];

	for (const type of deviceListTypes) {
		it(`does not add a horizontal rule to ${type}`, async () => {
			const html = await createListHTML(adapter, type, [], 0, false);

			assert.doesNotMatch(html, /<hr\b/i);
		});
	}

	for (const type of instanceListTypes) {
		it(`does not add a horizontal rule to ${type}`, async () => {
			const instances = type === 'updateAdapterList' ? new Map() : [];
			const html = await createListHTMLInstances(adapter, type, instances, 0);

			assert.doesNotMatch(html, /<hr\b/i);
		});
	}
});
