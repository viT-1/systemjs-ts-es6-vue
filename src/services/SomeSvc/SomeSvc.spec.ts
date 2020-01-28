import fetchMock from 'fetch-mock';
import { IOption as ISomeValue } from '@common/IamSelect/IamSelect.option.i';

import { SomeSvc } from './SomeSvc';
import { IRespSomeOther } from './respSome.other.i';

const respMock: IRespSomeOther = {
	imports: {
		foo: 'some',
		bar: 'thing',
	},
};

fetchMock.mock({
	url: '/fetch-resp.json',
	response: Promise.resolve(JSON.stringify(respMock)),
});

describe('service SomeSvc', () => {
	it('fetchData возвращает данные, дополненные исходным запросом', async () => {
		expect.assertions(1);

		const gaugePoint = { label: 'Рим' };
		SomeSvc.fetchData(gaugePoint);

		expect(await SomeSvc.fetchData(gaugePoint)).toContainEqual(gaugePoint);
	});

	it('mapResponse is working correctly', () => {
		expect.assertions(1);

		const labels = ['foo', 'bar'];

		const resp: IRespSomeOther = {
			imports: {
				[labels[0]]: 'url0swerf',
				[labels[1]]: 'url2sdf',
			},
		};

		const expectedResp: Array<ISomeValue> = [
			{ label: labels[0] },
			{ label: labels[1] },
		];

		const resultResp = SomeSvc.mapResponse({ resp });

		expect(resultResp).toStrictEqual(expectedResp);
	});
});
