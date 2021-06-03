import {
	Prop,
	Component,
	Mixins,
} from 'vue-property-decorator';

import { BemComponent } from '@common/BemComponent';

import { conf } from './IamInput-conf';

const { name, template } = conf;

@Component({
	name,
	template,
})
export class IamInput extends Mixins(BemComponent) {
	constructor() {
		super();
		this.b = conf.bem;
	}

	// @Prop(String) value = conf.defValue; // default value is undefined! but mutation!
	@Prop({ default: conf.defValue }) value: string; // default value if undefined! but no mutation!

	get mValue(): string {
		return this.value;
	}

	set mValue(val: string) {
		this.$emit('input', val);
	}
}
