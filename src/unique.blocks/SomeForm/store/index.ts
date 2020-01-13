import { IOption as ISomeValue } from '@common/IamSelect/IamSelect.option.i';

import { SomeSvc } from '@services/SomeSvc';

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
		console.log(`vuex mutation ${mutationTypes.SOME_VALUE_SELECT}`, value);
	},
	[mutationTypes.SOME_VALUES_SET](state: IState, values: Array<ISomeValue>): void {
		state.iamSelect.data.options = values;
		console.log(`vuex mutation ${mutationTypes.SOME_VALUES_SET}`, values);
	},
};

const actions = {
	getSomeValues: (
		// commit полученных данных выполняется другим (синхронным) action, потому dispatch
		{ dispatch }: { dispatch: Function },
		{ label }: ISomeValue,
	): Promise <Array<ISomeValue> | void> => SomeSvc
		.fetchData({ label }) // Все опции запроса в одном параметре-объекте (помимо label)
		.then((resp) => dispatch('setSomeValues', resp)),

	setSomeValues: (
		{ commit }: { commit: Function },
		values: Array<ISomeValue>,
	): void => commit(mutationTypes.SOME_VALUES_SET, values),

	selectSomeValue: (
		{ commit }: { commit: Function },
		value: ISomeValue,
	): void => commit(mutationTypes.SOME_VALUE_SELECT, value),
};

export const name = 'someForm';

export const storeConf = {
	namespaced: true,
	actions,
	getters,
	mutations,
	state: defaultState,
} as const;
