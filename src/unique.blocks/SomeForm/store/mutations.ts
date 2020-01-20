import { IOption as ISomeValue } from '@common/IamSelect/IamSelect.option.i';

import { IState } from './state.i';
import * as mutationTypes from './mutations.conf';

export const mutations = {
	// #region iamSelect mutations
	[mutationTypes.SOME_VALUE_SELECT](state: IState, value: ISomeValue): void {
		state.iamSelect.value = value;
	},
	[mutationTypes.SOME_VALUES_SET](state: IState, values: Array<ISomeValue>): void {
		state.iamSelect.data.options = values;
		// new values, therefore flush selected
		state.iamSelect.value = null;
	},
	// #endregion
};
