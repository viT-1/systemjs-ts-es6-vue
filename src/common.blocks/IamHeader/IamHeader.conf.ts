import { IBem } from '@common/Bem.i';

import tmpl from './IamHeader.html';

const bem: IBem = {
	block: 'iam-header',
};

export const conf = {
	bem,
	name: bem.block,
	template: tmpl,
};
