import { SomeSvc } from './SomeSvc';

describe('сервис PointSvc', () => {
	it('fetchData возвращает данные, дополненные исходным запросом', async () => {
		expect.assertions(1);

		const gaugePoint = { label: 'Рим' };
		SomeSvc.fetchData(gaugePoint);

		expect(await SomeSvc.fetchData(gaugePoint)).toContainEqual(gaugePoint);
	});
});
