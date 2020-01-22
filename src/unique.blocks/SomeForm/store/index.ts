import * as getters from './getters';
import { mutations } from './mutations';
import { IState } from './state.i';

/* eslint-disable import/no-cycle */
import * as actions from './actions';

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
	actions,
	getters,
	mutations,
	state: defaultState,
	// syntax recommendation https://itnext.io/use-a-vuex-store-with-typing-in-typescript-without-decorators-or-boilerplate-57732d175ff3
	// but we declare type with const above
	// state: defaultState as IState,
} as const;
