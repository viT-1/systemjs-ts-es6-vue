import { IBem } from '@common/Bem.i';

import tmpl from './IamSelect.html';

const bem: IBem = {
	block: 'iam-select',
};

export const conf = {
	bem,
	name: bem.block,
	template: tmpl,
};
