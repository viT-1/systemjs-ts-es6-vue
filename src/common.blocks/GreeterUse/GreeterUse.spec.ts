import { GreeterUse } from './GreeterUse';

describe('module GreeterUse.ts', () => {
	it('says "world"', () => {
		expect.assertions(1);

		expect(GreeterUse.say()).toContain('world');
	});
});
