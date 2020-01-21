import { Greeter, conf } from '.';

describe('module GreeterUse.ts', () => {
	it(`greets you like "${conf.greetText}"`, () => {
		expect.assertions(1);

		const gr = new Greeter('dude');

		expect(gr.greet()).toContain(conf.greetText);
	});
});
