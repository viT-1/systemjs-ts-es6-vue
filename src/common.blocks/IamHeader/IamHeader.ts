import { Prop, Component, Vue } from 'vue-property-decorator';

import { conf } from './IamHeader.conf';

const { name, template } = conf;

@Component({
	name,
	template,
})
export class IamHeader extends Vue {
	@Prop(String) some: string | undefined;

	computeSome = `computed ${this.some}`;
}
