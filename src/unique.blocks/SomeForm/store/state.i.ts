import { IOption as IamSelectOption } from '@common/IamSelect/IamSelect.option.i';
import { IData as IamSelectData } from '@common/IamSelect/IamSelect.data.i';

export interface IState {
	iamSelect: {
		// https://github.com/vuejs/vue-class-component#undefined-will-not-be-reactive
		/** Selected value (if null, we see placeholder) */
		value: IamSelectOption | null;
		data: IamSelectData;
	};
}
