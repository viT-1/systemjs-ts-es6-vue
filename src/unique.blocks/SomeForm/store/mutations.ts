import { IOption as ISomeValue } from '@common/IamSelect/IamSelect.option.i';

import { IState } from './state.i';
import { conf as mutationTypes } from './mutations-conf';

export const mutations = {
	// #region iamSelect mutations
	[mutationTypes.IamSelect.SOME_VALUE_SELECT](state: IState, value: ISomeValue | null): void {
		state.iamSelect.value = value;
	},
	[mutationTypes.IamSelect.SOME_VALUES_SET](state: IState, values: Array<ISomeValue>): void {
		state.iamSelect.data.options = values;
		// new values, therefore flush selected
		state.iamSelect.value = null;
	},
	// #endregion
};
