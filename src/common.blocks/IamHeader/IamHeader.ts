import {
	Prop,
	Component,
	Mixins,
} from 'vue-property-decorator';

import { BemComponent } from '@common/BemComponent';

import { conf } from './IamHeader-conf';

const { name, template } = conf;

@Component({
	name,
	template,
})
export class IamHeader extends Mixins(BemComponent) {
	constructor() {
		super();
		this.b = conf.bem;
	}

	@Prop(String) some = '';

	computeSome = `computed ${this.some}`;
}
