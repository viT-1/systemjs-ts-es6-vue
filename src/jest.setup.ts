import { ICustomGlobal } from '~/typings/global';

const customGlobal: ICustomGlobal = global as ICustomGlobal;
customGlobal.VueMultiselect = require('vue-multiselect');

// #region fetch mock
customGlobal.fetch = require('jest-fetch-mock');

customGlobal.fetchMock = customGlobal.fetch;
// #endregion
