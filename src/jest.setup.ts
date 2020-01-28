import { ICustomGlobal } from '~/typings/global';

const customGlobal: ICustomGlobal = global as ICustomGlobal;
customGlobal.VueMultiselect = require('vue-multiselect');
