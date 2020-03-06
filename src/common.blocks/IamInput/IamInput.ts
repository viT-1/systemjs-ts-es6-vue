import {
	Prop,
	Component,
	Mixins,
} from 'vue-property-decorator';

import { BemComponent } from '@common/BemComponent';

import { conf } from './IamInput.conf';

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

	@Prop(String) value?: string;

	get mValue(): string | undefined {
		return this.value;
	}

	set mValue(val: string | undefined) {
		this.$emit('input', val);
	}
}
