import { createLocalVue, mount } from '@vue/test-utils';

import { conf, IamInput as WrapperClass } from '.';

const localVue = createLocalVue();

describe('@Component IamHeader', () => {
	it('проверка v-model', async () => {
		expect.assertions(1);

		const scopeValue = 'foo';
		const wrapper = mount({
			// native vue-component (no vue-class-component), data scope
			data: () => ({
				scopeValue,
			}),
			template:
				`<${conf.name} v-model="scopeValue" />`,
			components: {
				[conf.name]: WrapperClass,
			},
		}, localVue);

		const expectedInpValue = 'bar';
		const elInput = wrapper.find('input');
		elInput.setValue(expectedInpValue);

		// html is not displayed new value
		// console.log(wrapper.html());

		expect(wrapper.vm.$data.scopeValue).toBe(expectedInpValue);
		// expect((elInput.element as HTMLInputElement).value).toBe(expectedInpValue);
	});
});
