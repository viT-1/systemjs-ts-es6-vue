import { conf } from './Greeter-conf';

export class Greeter {
	private greeting: string;

	public constructor(message: string) {
		this.greeting = message;
	}

	public greet(): string {
		return `${conf.greetText}, ${this.greeting}`;
	}
}
