import { store } from './VueApp.store';

type VueAppStore = typeof store;
declare module 'vuex' {
	/* eslint-disable @typescript-eslint/interface-name-prefix */
	interface Store<S> {
		direct: VueAppStore;
	}
}
