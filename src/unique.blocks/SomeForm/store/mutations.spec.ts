import { IState } from './state.i';
import { mutations } from './mutations';
import * as confMutations from './mutations.conf';

describe('vuex MainFilter iamSelect mutations', () => {
	it(`after ${confMutations.SOME_VALUES_SET} mutation state have points & flush value`, () => {
		expect.assertions(1);

		const state: IState = {
			iamSelect: {
				data: {
					options: [{ label: 'some' }],
				},
				value: { label: 'some' },
			},
		};
		const points = [{ label: 'yabadabadoo!' }, { label: 'foo' }];
		mutations[confMutations.SOME_VALUES_SET](state, points);

		expect(state).toMatchObject({
			iamSelect: {
				data: {
					options: points,
				},
				value: null,
			},
		});
	});

	it(`after ${confMutations.SOME_VALUE_SELECT} mutation state show us active value`, () => {
		expect.assertions(1);

		// Для атомарности тестов в пределах области видимости свой state и points
		const options = [{ label: 'some' }];
		const state: IState = {
			iamSelect: {
				data: {
					options,
				},
				value: { label: 'some' },
			},
		};

		const value = { label: 'thing' };
		mutations[confMutations.SOME_VALUE_SELECT](state, value);

		expect(state).toMatchObject({
			iamSelect: { data: { options }, value },
		});
	});
});
