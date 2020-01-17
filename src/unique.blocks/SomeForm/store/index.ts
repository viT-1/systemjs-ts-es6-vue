import DirectVuex from 'direct-vuex';

/* eslint-disable import/no-cycle */
import { actions } from './actions';

import * as getters from './getters';
import { mutations } from './mutations';
import { IState } from './state.i';

const defaultState: IState = {
	iamSelect: {
		value: null,
		data: {
			options: [],
		},
	},
};

export const storeConf = {
	namespaced: true as true,
	actions,
	getters,
	mutations,
	state: defaultState,
	// syntax recommendation https://itnext.io/use-a-vuex-store-with-typing-in-typescript-without-decorators-or-boilerplate-57732d175ff3
	// but we declare type with const above
	// state: defaultState as IState,
} as const;

// Not naming imported cause of SystemJs import only default
// https://github.com/paleo/direct-vuex/issues/14#issuecomment-568543969
const { createModule } = DirectVuex;

export const modSomeForm = createModule(storeConf);
