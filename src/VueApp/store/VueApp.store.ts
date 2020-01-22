import Vue from 'vue';
import Vuex from 'vuex';
import DirectVuex from 'direct-vuex';

import { modulesConf } from './modules.conf';

// Not naming imported cause of SystemJs import only default
// https://github.com/paleo/direct-vuex/issues/14#issuecomment-568543969
const { createDirectStore } = DirectVuex;

export const storeConf = {
	state: {},
	actions: {},
	getters: {},
	mutations: {},
	modules: modulesConf,
} as const;

Vue.use(Vuex);
export const { store, moduleActionContext } = createDirectStore(storeConf);
