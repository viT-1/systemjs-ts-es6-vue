import VueApp, { conf } from './index';

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
	it(`если DOM не содержит ${conf.el}, то Vue НЕ инициализируется и выдаётся предупреждение`, () => {
		expect.assertions(2);

		const warn = jest.spyOn(global.console, 'warn');
		const v = VueApp.init(); // Активируем Vue

		expect(warn).toHaveBeenCalledWith(conf.warnings.WARN_NOT_FOUND_EL);

		expect(v).toBeNull();
	});

	it(`если DOM содержит ${conf.el}, Vue инициализируется`, () => {
		expect.assertions(1);

		// Перед активацией инициализируем DOM
		document.body.innerHTML += `<div class="${conf.el.substring(1)}"></div>`;

		// Активируем Vue
		const v = VueApp.init();

		expect(v).not.toBeNull();
	});
});
