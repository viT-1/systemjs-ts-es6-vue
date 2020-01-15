import { store } from './VueApp.store';

// TODO: reexport type from './VueApp.store'
// cant declare in d.ts cause of dynamic typeof store
export type VueAppStore = typeof store;
declare module 'vuex' {
	interface IVueAppStore<S> {
		direct: VueAppStore;
	}
}

export {
	moduleActionContext,
	store,
	storeConf,
} from './VueApp.store';
