// shallowMount не устраивает, так как компонент целиком зависит от подкомпонента
import { createLocalVue, mount } from '@vue/test-utils';
import VueMultiselect from 'vue-multiselect';

import { IOption } from './IamSelect.option.i';
import { IamSelect } from './IamSelect';

const localVue = createLocalVue();

describe('@Component IamSelect', () => {
	it('has rendered multiselect', () => {
		expect.assertions(1);

		const wrapper = mount(IamSelect, { localVue });

		expect(wrapper.find('.multiselect').exists()).toBe(true);
	});

	it('displays choosen value', () => {
		expect.assertions(1);

		const value: IOption = { label: 'yabadabadoo!' };

		const wrapper = mount(IamSelect, {
			localVue,
			propsData: { value },
		});

		expect(wrapper.find('.multiselect__single')
			.html()).toContain(value.label);
	});

	it('изменение значения в дочернем vue-multiselect должно вызвать @input', () => {
		expect.assertions(2);

		const value: IOption = { label: 'yabadabadoo!' };
		const wrapper = mount(IamSelect, {
			localVue,
		});

		// Not working variants:
		// value = value2;
		// wrapper.setProps({ value: value2 });
		// wrapper.setValue(value2);
		const oMSelect = wrapper.find(VueMultiselect);

		// restrictions of vue-test-utils force to vm.$emit
		// https://medium.com/@ManningBooks/testing-events-in-vue-js-part-2-42fb631ae1c5
		oMSelect.vm.$emit('input', value);

		// Setting value is not firing @input from the box
		// https://github.com/vuejs/vue-test-utils/issues/266

		// [vue-test-utils] wrapper.setValue() cannot be called on this element
		// https://github.com/vuejs/vue-test-utils/issues/957#issuecomment-459940871
		// oMSelect.setValue(value2);

		expect(wrapper.emitted('input')).toHaveLength(1);
		expect(wrapper.emitted().input[0]).toStrictEqual([value]);
	});
});
