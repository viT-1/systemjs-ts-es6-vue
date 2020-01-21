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

export const modSomeForm = {
	namespaced: true as true,
	// actions: createActions(actions),
	actions,
	// getters: createGetters<IState>()(getters),
	getters,
	// mutations: createMutations<IState>()(mutations),
	mutations,
	state: defaultState,
	// syntax recommendation https://itnext.io/use-a-vuex-store-with-typing-in-typescript-without-decorators-or-boilerplate-57732d175ff3
	// but we declare type with const above
	// state: defaultState as IState,
} as const;
