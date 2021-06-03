import { IBem } from '@common/Bem.i';

import tmpl from './SomeForm.html';

const bem: IBem = { block: 'some-form' };

export const conf = {
	bem,
	name: bem.block,
	template: tmpl,
};
