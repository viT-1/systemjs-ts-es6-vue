import { Component, Mixins } from 'vue-property-decorator';

import { BemComponent } from '@common/BemComponent';
import { IOption as ISomeValue } from '@common/IamSelect/IamSelect.option.i';

import { name as storeName, storeConf } from './store';
import { conf } from './SomeForm.conf';

const {
	bem,
	name,
	template,
} = conf;

@Component({
	name,
	template,
})
export class SomeForm extends Mixins(BemComponent) {
	constructor() {
		super();
		this.b = bem;
	}

	/* beforeCreate: Called synchronously immediately after the instance
	has been initialized, before data observation and event/watcher setup. */
	/* created: Called synchronously after the instance is created. */
	beforeCreate(): void {
		// Инициализируем свой vuex-store если оно ещё не проинициализированно
		const store = this.$store;
		if (!(store && store.state && store.state[storeName])) {
			store.registerModule(storeName, storeConf);
		}
	}

	mounted(): void {
		this.initDefaultStoreState();
	}

	/** Изначальная инициализация vuex-store данными всех элементов */
	initDefaultStoreState(): void {
		// Данные для multiselect привязаны через $store,
		// потому нет нужды обрабатывать здесь then
		// TODO: типизация к action api, any очень плох! https://github.com/paleo/direct-vuex
		this.$store.dispatch(`${storeName}/getSomeValues`, { label: 'Rome' });
	}

	get iamSelectData(): { options: Array<ISomeValue> } {
		const options = this.$store.getters[`${storeName}/someValues`];
		return { options };
	}

	get iamSelectValue(): ISomeValue | null {
		return this.$store.getters[`${storeName}/someValue`];
	}

	set iamSelectValue(val: ISomeValue | null) {
		this.$store.dispatch(`${storeName}/selectSomeValue`, val);
	}
}
