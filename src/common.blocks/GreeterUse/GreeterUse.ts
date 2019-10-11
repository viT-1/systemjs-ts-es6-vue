import { Greeter } from '@common/Greeter';

export class GreeterUse {
	public static say(): string {
		const gr = new Greeter('world');
		return gr.greet();
	}
}
