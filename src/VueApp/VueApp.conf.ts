import { conf as confIamHeader, IamHeader } from '@common/IamHeader';
import { conf as confIamSelect, IamSelect } from '@common/IamSelect';
import { conf as confSomeForm, SomeForm } from '@unique/SomeForm';

export const components = {
	// [confIamHeader.name]: IamHeader,
	// tagName is consistent with class name
	[confIamHeader.name]: IamHeader,
	[confIamSelect.name]: IamSelect,
	[confSomeForm.name]: SomeForm,
};

export const el = '.js-app';

export const warnings = {
	WARN_NOT_FOUND_EL: `${el} is not found, VueApp.init() failed!`,
};

export const conf = {
	components,
	el,
	warnings,
};
