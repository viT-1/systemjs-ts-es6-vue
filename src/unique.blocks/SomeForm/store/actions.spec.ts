import * as actions from './actions';
import { conf as confMutations } from './mutations-conf';

jest.mock('@services/SomeSvc/SomeSvc.ts');

// #region @common/IamSelect
// Пишем простейшие тесты, чтобы при рефакторинге actions, видеть, что не отвалились
describe('vuex SomeForm IamSelect actions', () => {
	it('getPoints after getting data raise appropriate action', async () => {
		expect.assertions(1);

		const dispatch = jest.fn();
		// TODO: how to pass ActionContext with jest.fn() ?
		// const ac = new ActionContext({ dispatch });
		await actions.getSomeValues({ dispatch }, { label: 'Рим' });

		// Без мокирования и выделения данных для response,
		// неизвестно в каком виде приедут данные, потому anything
		expect(dispatch).toHaveBeenCalledWith('setSomeValues', expect.anything());
	});

	it('setSomeValues raise appropriate mutation', () => {
		expect.assertions(1);

		const commit = jest.fn();
		const someValues = [{ label: 'yabadabadoo!' }];
		actions.setSomeValues({ commit }, someValues);

		expect(commit).toHaveBeenCalledWith(confMutations.IamSelect.SOME_VALUES_SET, someValues);
	});

	it('selectSomeValue raise appropriate mutation', () => {
		expect.assertions(1);

		const commit = jest.fn();
		const someValue = { label: 'yabadabadoo!' };
		actions.selectSomeValue({ commit }, someValue);

		expect(commit).toHaveBeenCalledWith(confMutations.IamSelect.SOME_VALUE_SELECT, someValue);
	});
});
// #endregion
