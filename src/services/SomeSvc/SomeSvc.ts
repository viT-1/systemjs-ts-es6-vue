import { IOption as ISomeValue } from '@common/IamSelect/IamSelect.option.i';
import { IRespSomeOther } from './respSome.other.i';

// https://stackoverflow.com/questions/33719459/how-to-declare-an-interface-with-static-method#answer-33720781
export class SomeSvc {
	static async fetchData(params: ISomeValue): Promise<Array<ISomeValue>> {
		const resp = await fetch('/fetch-resp.json');

		if (!resp.ok) {
			throw new Error(resp.statusText);
		}

		const result = await resp.json();
		return Promise.resolve([
			...this.mapResponse({ resp: result }),
			{ label: params.label },
		]);
	}

	static mapResponse({ resp }: { resp: IRespSomeOther }): Array<ISomeValue> {
		return Object.keys(resp.imports).map(
			(key) => ({ label: key }),
		);
	}
}
