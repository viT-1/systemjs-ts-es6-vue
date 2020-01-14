import Vue from 'vue';
import Vuex from 'vuex';
import DirectVuex from 'direct-vuex';
import { Vue as TypeVue } from 'vue/types/vue';

import {
	components,
	el,
	warnings,
} from './VueApp.conf';
import { storeConf } from './store';

export class VueApp {
	public static init(): TypeVue | null {
		// В любом случае отключаем Vue-предупреждения в консоль
		Vue.config.devtools = true;
		Vue.config.productionTip = false;

		// Если в DOM нет соответствующего селектора, то инициализировать Vue нет возможности
		if (!document.querySelector(el)) {
			console.warn(warnings.WARN_NOT_FOUND_EL);
			return null;
		}

		VueApp.registerComponents();
		Vue.use(Vuex);
		const store = DirectVuex.createDirectStore(storeConf).store.original;

		// Инициализация всего vue на DOM-элементе (смотри VueApp.conf)
		/* eslint-disable no-new */
		// @ts-ignore
		return new Vue({
			el,
			components,
			data: {
				mySelected: null,
			},
			store,
		});
	}

	/**
	 * Регистрация всех компонент (в точ числе и сторонних с cdn),
	 * которые перечислены в конфигурации приложения
	 */
	public static registerComponents(): void {
		// Поскольку не создан корневой App.vue как такой же @Сomponent,
		// все conf.components доступны только на верхнем уровне,
		// но не в качестве подкомпонент. Регистрируем компоненты глобально.
		// https://github.com/vuejs/vue-class-component/issues/229#issuecomment-405811287
		Object.keys(components).forEach((htmlTag) => {
			Vue.component(htmlTag, components[htmlTag]);
		});
	}
}
