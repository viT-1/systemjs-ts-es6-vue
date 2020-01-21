/* eslint-disable class-methods-use-this */
// because of vueAppStore instead of this.$store

import { Component, Mixins } from 'vue-property-decorator';

import { BemComponent } from '@common/BemComponent';
import { IOption as ISomeValue } from '@common/IamSelect/IamSelect.option.i';

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

	mounted(): void {
		this.initDefaultStoreState();
	}

	/** Изначальная инициализация vuex-store данными всех элементов */
	initDefaultStoreState(): void {
		// Данные для multiselect привязаны через $store,
		// потому нет нужды обрабатывать здесь then
		this.$store.direct.dispatch.modSomeForm.getSomeValues({ label: 'Rome' });
	}

	get iamSelectData(): { options: Array<ISomeValue> } {
		const options = this.$store.direct.getters.modSomeForm.someValues;
		return { options };
	}

	get iamSelectValue(): ISomeValue | null {
		return this.$store.direct.getters.modSomeForm.someValue;
	}

	set iamSelectValue(val: ISomeValue | null) {
		this.$store.direct.dispatch.modSomeForm.selectSomeValue(val);
	}
}
