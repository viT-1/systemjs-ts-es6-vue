import { Prop, Component, Vue } from 'vue-property-decorator';

import { IBem } from '@common/Bem.i';
import { IClassComponent } from '@common/ClassComponent.i';

// TODO: вынести в настройки составные строки для элемента и модификатора
// как рендерить модификатор блока слитно через -- или раздельно

@Component
export class BemComponent extends Vue
	implements IBem, IClassComponent {
	constructor() {
		super();
		this.b = { block: 'bemComponent' };
	}

	/**
	 * Initial bem configuration for every BemComponent extender,
	 */
	protected b: IBem;

	@Prop(String)
	blockParent?: string;

	get block(): string {
		return this.b.block;
	}

	get mod(): string | undefined {
		// Hello IE6 ;) .blockName._modificatorName
		return this.b.mod ? `_${this.b.mod}` : undefined;
	}

	// Can't use super keyword!
	// https://github.com/microsoft/TypeScript/issues/338#issuecomment-347382190
	// Any additional class is adding as class on custom-tag in markup
	getClassComponent(): string {
		let retClass = this.block;

		if (this.mod) {
			retClass += ` ${this.mod}`;
		}

		if (this.blockParent) {
			retClass += ` ${this.blockParent}__${this.block}`;
		}

		return retClass;
	}

	// use case :class="someClassValue"
	get classComponent(): string {
		return this.getClassComponent();
	}
}
