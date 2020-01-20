import DirectVuex from 'direct-vuex';

/* eslint-disable import/no-cycle */
import * as actions from './actions';

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

// Not naming imported cause of SystemJs import only default
// https://github.com/paleo/direct-vuex/issues/14#issuecomment-568543969
const {
	createActions,
	// createGetters,
	createModule,
	createMutations,
} = DirectVuex;

export const storeConf = {
	namespaced: true as true,
	actions: createActions(actions),
	// getters: createGetters<IState>()(getters),
	getters,
	mutations: createMutations<IState>()(mutations),
	state: defaultState,
	// syntax recommendation https://itnext.io/use-a-vuex-store-with-typing-in-typescript-without-decorators-or-boilerplate-57732d175ff3
	// but we declare type with const above
	// state: defaultState as IState,
} as const;

export const modSomeForm = createModule(storeConf);
