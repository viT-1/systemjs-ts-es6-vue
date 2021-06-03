import { IBem } from '@common/Bem.i';

import tmpl from './IamInput.html';

export const bem: IBem = {
	block: 'iam-input',
};

export const defValue = 'def';

export const conf = {
	bem,
	defValue,
	name: bem.block,
	template: tmpl,
};
