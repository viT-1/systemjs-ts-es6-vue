import Greeter from '@common/Greeter';

export default class GreeterUse {
	public static say(): void {
		const gr = new Greeter('world');
		console.log(gr.greet());
	}
}
