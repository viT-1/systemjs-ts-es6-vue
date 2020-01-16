import { store } from './VueApp.store';

type VueAppStore = typeof store;
declare module 'vuex' {
	interface IVueAppStore<S> {
		direct: VueAppStore;
	}
}
