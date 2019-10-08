import Greeter from '@common/Greeter';

export default class GreeterUse {
	public static say(): string {
		const gr = new Greeter('world');
		return gr.greet();
	}
}
