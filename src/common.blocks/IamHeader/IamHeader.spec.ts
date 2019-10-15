import { createLocalVue, mount } from '@vue/test-utils';

// VS Code ESLint plugin displays ts2307 error here, but eslint & tsc console is ok
import IamHeaderComponent from './IamHeader.spec.vue';
// import { IamHeader as IamHeaderComponent } from './IamHeader';

const localVue = createLocalVue();

describe('@Component IamHeader', () => {
	it('renders the correct markup', () => {
		expect.assertions(2);

		const testStr = 'Test Vue Jest label';
		const wrapper = mount(IamHeaderComponent, {
			localVue,
			slots: {
				default: [testStr],
			},
		});

		expect(wrapper.contains('label')).toBe(true);
		expect(wrapper.html()).toContain(testStr);
	});
});
