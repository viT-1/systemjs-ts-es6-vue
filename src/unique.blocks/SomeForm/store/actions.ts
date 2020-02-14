import { ActionContext } from 'vuex';
// import { DirectActionContext } from 'direct-vuex/types/direct-types';
import directVuex from 'direct-vuex';
// import { localActionContext } from 'direct-vuex';

import { IOption as ISomeValue } from '@common/IamSelect/IamSelect.option.i';
import { SomeSvc } from '@services/SomeSvc';

import { IState } from './state.i';
import * as confMutations from './mutations.conf';
/* eslint-disable import/no-cycle */
import { modSomeForm } from '.';
// import { moduleActionContext } from '~/VueApp/store';

const { localActionContext } = directVuex;

const getTypedContext = (ctx: any) => localActionContext(ctx, modSomeForm);

export const getSomeValues = (
	// commit полученных данных выполняется другим (синхронным) action, потому dispatch
	// TODO: How to write tests with ActionContext & jest.fn() for dispatch & commit?
	// context: ActionContext<IState, {}>,
	context: ActionContext<IState, {}> | { dispatch: Function },
	{ label }: ISomeValue,
): Promise <Array<ISomeValue> | void> => SomeSvc
	.fetchData({ label }) // Все опции запроса в одном параметре-объекте (помимо label)
	.then((resp) => {
		const { dispatch } = getTypedContext(context);
		dispatch.setSomeValues(resp);
	});

export const setSomeValues = (
	context: ActionContext<IState, {}> | { commit: Function },
	values: Array<ISomeValue>,
): void => {
	const { commit } = getTypedContext(context);
	commit[confMutations.SOME_VALUES_SET](values);
};

export const selectSomeValue = (
	context: ActionContext<IState, {}> | { commit: Function },
	value: ISomeValue | null,
): void => {
	const { commit } = getTypedContext(context);
	commit[confMutations.SOME_VALUE_SELECT](value);
};
