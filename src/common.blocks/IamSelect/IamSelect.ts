/* eslint nonblock-statement-body-position: off */
import {
	Component,
	Prop,
	Watch,
	Vue,
} from 'vue-property-decorator';

import { IOption } from './IamSelect.option.i';
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
export class IamSelect extends Vue {
	constructor() {
		super();

		if (this.value)
			// производительность клонирования
			// https://habr.com/ru/post/283090/ https://jsfiddle.net/thcu7tjv/26/
			this.mValue = JSON.parse(JSON.stringify(this.value));
		else
			this.mValue = null;
	}

	@Prop(Object)
	// v-model supporting
	readonly value?: IOption | null;

	// saving data without mutate restrictions of value
	mValue: IOption | null;

	@Watch('mValue', {})
	mValueChanged(val: IOption | null): void {
		// v-model supporting
		this.$emit('input', JSON.parse(JSON.stringify(val)));
	}
}
