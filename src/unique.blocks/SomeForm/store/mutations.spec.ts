import { IState } from './state.i';
import { mutations } from './mutations';

describe('vuex MainFilter iamSelect mutations', () => {
	it('after SOME_VALUES_SET mutation state have points & flush value', () => {
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
		mutations.SOME_VALUES_SET(state, points);

		expect(state).toMatchObject({
			iamSelect: {
				data: {
					options: points,
				},
				value: null,
			},
		});
	});

	it('after SOME_VALUE_SELECT mutation state show us active value', () => {
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
		mutations.SOME_VALUE_SELECT(state, value);

		expect(state).toMatchObject({
			iamSelect: { data: { options }, value },
		});
	});
});
