// Отключаем ограничение по количеству классов, так как
// это базовый класс, тестируем варианты реализаций
/* eslint max-classes-per-file: off */
import { Component } from 'vue-property-decorator';

import { IBem } from '@common/Bem.i';

import { BemComponent } from './index';

const confBem: IBem = {
	block: 'someBody',
	mod: 'someMode',
};

class Compo extends BemComponent {
	constructor() {
		super();
		this.b = confBem;
	}
}

describe('@Component BemComponent', () => {
	it('classComponent has not undefined string', () => {
		expect.assertions(1);

		const c = new BemComponent();

		expect(
			c.classComponent,
		).not.toContain('undefined');
	});

	it('classComponent has not " _" without mod setting', () => {
		expect.assertions(1);

		class CompoMin extends BemComponent {
			constructor() {
				super();
				this.b = { block: confBem.block };
			}
		}

		const c = new CompoMin();

		expect(
			c.classComponent,
		).not.toContain(' _');
	});

	it('classComponent, with block and mod settings, rendered correctly', () => {
		expect.assertions(2);

		const c = new Compo();

		expect(
			c.classComponent,
		).toContain(confBem.block);

		expect(
			c.classComponent,
		).toContain(` _${confBem.mod}`);
	});

	it('classComponent, with blockParent is ok', () => {
		expect.assertions(1);

		const c = new Compo();
		// Свойство, которое будут передавать из вёрстки, не относится к конструктору
		const blockParent = 'somePa';
		c.blockParent = blockParent;

		// TODO: вынести строку-разделитель блок-элемента в общую конфигурацию
		expect(
			c.classComponent,
		).toContain(`${blockParent}__${confBem.block}`);
	});

	// super-проблема https://github.com/vuejs/vue-class-component/issues/93#issuecomment-554298726

	it('custom component extends BemComponent.classComponent correctly', () => {
		expect.assertions(2);

		@Component
		class Child extends BemComponent {
			constructor() {
				super();
				this.b = { block: 'boo' };
			}

			get classComponent(): string {
				return `${this.getClassComponent()} foo`;
			}
		}

		const obj = new Child();

		expect(obj.classComponent).toContain('foo');
		expect(obj.classComponent).toContain('boo');
	});
});
