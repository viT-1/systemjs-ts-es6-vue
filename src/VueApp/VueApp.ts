import Vue from 'vue';
import { Vue as TypeVue } from 'vue/types/vue';

import {
	components,
	el,
	warnings,
} from './VueApp.conf';

export class VueApp {
	public static init(): TypeVue | null {
		// В любом случае отключаем Vue-предупреждения в консоль
		Vue.config.devtools = false;
		Vue.config.productionTip = false;

		// Если в DOM нет соответствующего селектора, то инициализировать Vue нет возможности
		if (!document.querySelector(el)) {
			console.warn(warnings.WARN_NOT_FOUND_EL);
			return null;
		}

		// Инициализация всего vue на DOM-элементе (смотри VueApp.conf)
		/* eslint-disable no-new */
		return new Vue({
			el,
			components,
		});
	}
}
