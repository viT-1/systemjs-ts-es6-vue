import Vue from 'vue';

import { components, selector as el } from './VueApp.conf';

export default class VueApp {
	public static init(): void {
		Vue.config.devtools = false;
		Vue.config.productionTip = false;

		// @link: no-new https://gitlab.com/gitlab-org/gitlab-ce/issues/42783
		/* eslint-disable no-new */
		new Vue({
			el,
			components,
		});
	}
}
