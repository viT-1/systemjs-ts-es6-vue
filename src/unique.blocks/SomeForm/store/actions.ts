import { ActionContext } from 'vuex';
import { DirectActionContext } from 'direct-vuex/types/direct-types';
import { localActionContext } from 'direct-vuex';

import { IOption as ISomeValue } from '@common/IamSelect/IamSelect.option.i';
import { SomeSvc } from '@services/SomeSvc';

import { IState } from './state.i';
import { conf as confMutations } from './mutations-conf';
/* eslint-disable import/no-cycle */
import { modSomeForm } from '.';

const getTypedContext = (ctx: any):
DirectActionContext<never, typeof modSomeForm> => localActionContext(ctx, modSomeForm);

// #region iamSelect actions
export const getSomeValues = (
	// commit полученных данных выполняется другим (синхронным) action, потому dispatch
	// TODO: How to write tests with ActionContext & jest.fn() for dispatch & commit?
	// context: ActionContext<IState, {}>,
	context: ActionContext<IState, Record<string, unknown>> | { dispatch: Function },
	{ label }: ISomeValue,
): Promise <Array<ISomeValue> | void> => SomeSvc
	.fetchData({ label }) // Все опции запроса в одном параметре-объекте (помимо label)
	.then((resp) => {
		const { dispatch } = getTypedContext(context);
		dispatch.setSomeValues(resp);
	});

export const setSomeValues = (
	context: ActionContext<IState, Record<string, unknown>> | { commit: Function },
	values: Array<ISomeValue>,
): void => {
	const { commit } = getTypedContext(context);
	commit[confMutations.IamSelect.SOME_VALUES_SET](values);
};

export const selectSomeValue = (
	context: ActionContext<IState, Record<string, unknown>> | { commit: Function },
	value: ISomeValue | null,
): void => {
	const { commit } = getTypedContext(context);
	commit[confMutations.IamSelect.SOME_VALUE_SELECT](value);
};
// #endregion
