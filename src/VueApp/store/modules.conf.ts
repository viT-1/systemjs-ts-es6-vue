// modules.conf filename because of gulp task 'postdeploy.dev:fixImportsNotInIndex'
// not in index because of replacing assets not in index
// TODO: make gulp working with store/index.js (simple vuex-modules)
import { name as storeNameSomeForm, modSomeForm } from '@unique/SomeForm/store';

export const modulesConf = {
	[storeNameSomeForm]: modSomeForm,
};
