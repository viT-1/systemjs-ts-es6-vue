import { createLocalVue, mount } from '@vue/test-utils';
import Vuex from 'vuex';
import { createDirectStore } from 'direct-vuex';

import { IamSelect } from '@common/IamSelect';

import { modSomeForm } from './store';
import { SomeForm } from './index';
// import { resolvedOptions } from '@services/SomeSvc/SomeSvc.spec.case01.ts';

jest.mock('@services/SomeSvc/SomeSvc.ts');

const localVue = createLocalVue();
localVue.component('iam-select', IamSelect);
localVue.use(Vuex);

const storeConf = {
	modules: {
		modSomeForm,
	},
};

// const store = new Vuex.Store(storeConf);
const { store: _store } = createDirectStore(storeConf);
const store = _store.original;

describe('@Component SomeForm', () => {
	it('all mock data are rendered', () => {
		expect.assertions(1);

		const wrapper = mount(SomeForm, { store, localVue });

		wrapper.vm.$nextTick();
		// console.log(wrapper.html());
		// store should be changed after mount, but not!
		// console.log(JSON.stringify(store.state));

		expect(
			wrapper.find('.multiselect__single')
				.exists(),
		).toBe(true);
	});
});
