import { IOption as IamSelectOption } from '@common/IamSelect/IamSelect.option.i';

export const resolvedOptions = [
	{ label: 'mock-foo' },
	{ label: 'mock-bar' },
	{ label: 'mock-baz' },
];

export class PointSvc {
	// Если params будет более наворочен, чем IamSelectOption, то указать остальные интерфейсы
	// по соседству с IamSelectOption
	// - то есть структура всё равно должна соответствовать IamSelectOption
	static fetchData(params: IamSelectOption): Promise<Array<IamSelectOption>> {
		// В моках обязательно возвращаем через Promise, зато сразу resolve
		return Promise.resolve([
			...resolvedOptions,
			{ label: params.label }, // Хоть как-то используем передаваемый параметр
		]);
	}
}
