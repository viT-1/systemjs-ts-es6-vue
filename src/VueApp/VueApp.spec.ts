import { conf } from './index';

describe('conf VueApp.ts', () => {
	// like DTD - @todo: needs d.ts for config objects
	it('should export "conf" and contains "components"', () => {
		expect.assertions(2);

		expect(conf).toBeDefined();

		// This test is bad practice - should be implemented with strict defenition typing!
		expect(conf.components).toBeDefined();
	});
});

describe('module VueApp.ts', () => {

});
