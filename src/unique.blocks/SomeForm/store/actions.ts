import { IOption as ISomeValue } from '@common/IamSelect/IamSelect.option.i';
import { SomeSvc } from '@services/SomeSvc';

import * as mutationTypes from './mutations.conf';

export const getSomeValues = (
	// commit полученных данных выполняется другим (синхронным) action, потому dispatch
	{ dispatch }: { dispatch: Function },
	{ label }: ISomeValue,
): Promise <Array<ISomeValue> | void> => SomeSvc
	.fetchData({ label }) // Все опции запроса в одном параметре-объекте (помимо label)
	.then((resp) => dispatch('setSomeValues', resp));

export const setSomeValues = (
	{ commit }: { commit: Function },
	values: Array<ISomeValue>,
): void => commit(mutationTypes.SOME_VALUES_SET, values);

export const selectSomeValue = (
	{ commit }: { commit: Function },
	value: ISomeValue,
): void => commit(mutationTypes.SOME_VALUE_SELECT, value);
