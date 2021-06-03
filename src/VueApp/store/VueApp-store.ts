import Vue from 'vue';
import Vuex from 'vuex';
import { createDirectStore } from 'direct-vuex';

import { conf as modulesConf } from './modules-conf';

export const storeConf = {
	state: {},
	actions: {},
	getters: {},
	mutations: {},
	modules: modulesConf,
} as const;

Vue.use(Vuex);
export const { store } = createDirectStore(storeConf);
