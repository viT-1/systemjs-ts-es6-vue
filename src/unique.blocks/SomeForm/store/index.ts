import { IOption as ISomeValue } from '@common/IamSelect/IamSelect.option.i';

import * as actions from './actions';
import * as mutationTypes from './mutations.conf';
import { IState } from './state.i';

const defaultState: IState = {
	iamSelect: {
		value: null,
		data: {
			options: [],
		},
	},
};

const getters = {
	someValue: (state: IState): ISomeValue | null => state.iamSelect.value,
	someValues: (state: IState): Array<ISomeValue> => state.iamSelect.data.options,
};

const mutations = {
	[mutationTypes.SOME_VALUE_SELECT](state: IState, value: ISomeValue): void {
		state.iamSelect.value = value;
	},
	[mutationTypes.SOME_VALUES_SET](state: IState, values: Array<ISomeValue>): void {
		state.iamSelect.data.options = values;
	},
};

export const name = 'someForm';

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
