import { IOption as ISomeValue } from '@common/IamSelect/IamSelect.option.i';

import { IState } from './state.i';

export const someValue = (state: IState): ISomeValue | null => state.iamSelect.value;
export const someValues = (state: IState): Array<ISomeValue> => state.iamSelect.data.options;
