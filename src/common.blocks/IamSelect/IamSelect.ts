import { BemComponent } from '@common/BemComponent';

import {
	Component,
	Prop,
	Mixins,
} from 'vue-property-decorator';

import { IOption } from './IamSelect.option.i';
import { IData } from './IamSelect.data.i';
import { conf } from './IamSelect.conf';

const { name, template } = conf;

// TODO: add support setValue of vue-test-utils
// https://github.com/vuejs/vue-test-utils/issues/957#issuecomment-459940871

@Component({
	name,
	template,
	// TODO: extends Mixins(VueMultiselect) instead global
	// when es6 importmap will be supported without shims
	components: {
		// window type extended in typings/vue-multiselect.d.ts
		'vue-multiselect': window.VueMultiselect.default,
	},
})
export class IamSelect extends Mixins(BemComponent) {
	constructor() {
		super();
		this.b = conf.bem;
	}

	@Prop(Object)
	// v-model supporting
	readonly value: IOption | null;

	@Prop()
	readonly data?: IData;

	// saving data without mutate restrictions of value
	// mValue: IOption | null;
	get mValue(): IOption | null {
		return this.value;
	}

	set mValue(val: IOption | null) {
		// v-model supporting
		this.$emit('input', val);
	}
}
