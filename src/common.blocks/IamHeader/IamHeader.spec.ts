import { createLocalVue, mount } from '@vue/test-utils';

import { IamHeader } from './IamHeader';

const localVue = createLocalVue();

describe('@Component IamHeader', () => {
	it('renders the correct markup', () => {
		expect.assertions(2);

		const testStr = 'Test Vue Jest label';
		const wrapper = mount(IamHeader, {
			localVue,
			slots: {
				default: [testStr],
			},
		});

		expect(wrapper.contains('label')).toBe(true);
		expect(wrapper.html()).toContain(testStr);
	});
});
