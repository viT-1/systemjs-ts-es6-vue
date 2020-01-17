import { ActionContext } from 'vuex';
import DirectVuex from 'direct-vuex';

import { IOption as ISomeValue } from '@common/IamSelect/IamSelect.option.i';
import { SomeSvc } from '@services/SomeSvc';
import { moduleActionContext } from '~/VueApp/store';

/* eslint-disable import/no-cycle */
import { modSomeForm } from '.';

import * as mutationTypes from './mutations.conf';
import { IState } from './state.i';

// Not naming imported cause of SystemJs import only default
// https://github.com/paleo/direct-vuex/issues/14#issuecomment-568543969
const { createActions } = DirectVuex;

export const modSomeFormActionContext = (ctx: any) => moduleActionContext(ctx, modSomeForm);

export const actions = createActions({
	getSomeValues(
		// commit полученных данных выполняется другим (синхронным) action, потому dispatch
		// { dispatch }: { dispatch: Function },
		context: ActionContext<IState, IState>,
		{ label }: ISomeValue,
	): Promise <Array<ISomeValue> | void> {
		return SomeSvc
			.fetchData({ label }) // Все опции запроса в одном параметре-объекте (помимо label)
			.then((resp) => {
				// const { dispatch } = context;
				const { dispatch } = modSomeFormActionContext(context);
				dispatch.setSomeValues(resp);
			});
	},

	setSomeValues(
		{ commit }: { commit: Function },
		values: Array<ISomeValue>,
	): void {
		commit(mutationTypes.SOME_VALUES_SET, values);
	},

	selectSomeValue(
		{ commit }: { commit: Function },
		value: ISomeValue | null,
	): void {
		commit(mutationTypes.SOME_VALUE_SELECT, value);
	},
});
