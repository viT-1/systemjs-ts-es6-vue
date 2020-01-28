import VueMultiselect from 'vue-multiselect';

import Global = NodeJS.Global;

export interface ICustomGlobal extends Global {
	VueMultiselect: VueMultiselect;
}
