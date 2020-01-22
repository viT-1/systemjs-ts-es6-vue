import { store } from './VueApp.store';

export type IVueAppStore = typeof store;
declare module 'vuex' {
	/* eslint-disable @typescript-eslint/interface-name-prefix */
	interface Store<S> {
		direct: IVueAppStore;
	}
}
