import { createLocalVue, mount } from '@vue/test-utils';

import { conf, IamInput as WrapperClass } from '.';

const localVue = createLocalVue();

describe('@Component IamHeader', () => {
	it('check using v-model with "undefined" prop value & defaults', async () => {
		expect.assertions(3);

		// const scopeValue = 'foo';
		const wrapper = mount({
			// native vue-component (no vue-class-component), data scope
			data: () => ({
				// scopeValue: undefined,
				myScope: {},
			}),
			template:
				// `<${conf.name} v-model="scopeValue" />`,
				`<${conf.name} v-model="myScope.value" />`,
			components: {
				[conf.name]: WrapperClass,
			},
		}, localVue);

		const expectedInpValue = 'bar';

		// when using v-model
		// eslint-disable-next-line dot-notation
		const inputComp = wrapper.find(WrapperClass);

		expect(inputComp.props('value')).toBe(conf.defValue);

		const elInput = wrapper.find('input');
		elInput.setValue(expectedInpValue);

		// console.log('wrapper.props()2:', wrapper.props());

		// html is not displayed new value
		// console.log(wrapper.html());

		// expect(wrapper.vm.$data.scopeValue).toBe(expectedInpValue);
		expect(wrapper.vm.$data.myScope.value).toBe(expectedInpValue);
		// expect((elInput.element as HTMLInputElement).value).toBe(expectedInpValue);

		await wrapper.vm.$nextTick();

		expect(inputComp.props('value')).toBe(expectedInpValue);
	});

	it('default value for @Prop "value" is correct by mounting', () => {
		expect.assertions(1);

		const wrapper = mount(WrapperClass, { localVue, propsData: { value: undefined } });
		const cmpValue = wrapper.props('value');
		// const cmpValue = wrapper.vm.value;

		expect(cmpValue).toBe(conf.defValue);
	});
});
