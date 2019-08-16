import { conf } from './Greeter.conf';

class Greeter {
	private greeting: string;

	public constructor(message: string) {
		this.greeting = message;
	}

	public greet(): string {
		return `${conf.greetText}, ${this.greeting}`;
	}
}

export default Greeter;
