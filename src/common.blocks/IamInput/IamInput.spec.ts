import { createLocalVue, mount } from '@vue/test-utils';

import { conf, IamInput as WrapperClass } from '.';

const localVue = createLocalVue();

describe('@Component IamHeader', () => {
	it('проверка v-model', async () => {
		expect.assertions(1);

		const outValue = 'hooray!';
		const wrapper = mount({
			// нативный vue-компонент, scope данных
			data: () => ({
				outValue,
			}),
			// Не забываем ограничение - один dom-элемент для слота > нужна обёртка
			template:
				`<${conf.name} v-model="outValue" />`,
			components: {
				[conf.name]: WrapperClass,
			},
		}, localVue);

		const expectedInpValue = 'gghytoo';
		const elInput = wrapper.find('input');

		elInput.setValue(expectedInpValue);

		await wrapper.vm.$nextTick();
		console.log('После установки вёрстка', wrapper.html());

		expect(outValue).toBe(expectedInpValue);
	});
});
