import { IBem } from '@common/Bem.i';

import tmpl from './IamInput.html';

const bem: IBem = {
	block: 'iam-input',
};

export const conf = {
	bem,
	name: bem.block,
	template: tmpl,
};
