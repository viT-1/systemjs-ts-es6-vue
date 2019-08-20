// @link: https://github.com/vuejs/vue/issues/6815#issuecomment-336721984
/* eslint-disable import/no-duplicates */
import VueD from 'vue';
import * as VueN from 'vue';

import { components, selector as el } from './VueApp.conf';

const Vue = VueD || VueN;

export default class VueApp {
	public static init(): void {
		Vue.config.productionTip = false;

		// @link: no-new https://gitlab.com/gitlab-org/gitlab-ce/issues/42783
		/* eslint-disable no-new */
		new Vue({
			el,
			components,
		});
	}
}
