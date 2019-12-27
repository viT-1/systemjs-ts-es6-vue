import { IOption as ISomeValue } from '@common/IamSelect/IamSelect.option.i';

// https://stackoverflow.com/questions/33719459/how-to-declare-an-interface-with-static-method#answer-33720781
export class SomeSvc {
	static fetchData(params: ISomeValue): Promise<Array<ISomeValue>> {
		return new Promise((resolve: Function) => {
			setTimeout(() => {
				resolve([
					{ label: 'foo' },
					{ label: 'bar' },
					{ label: 'baz' },
					{ label: params.label },
				]);
			}, 750);
		});
	}
}
