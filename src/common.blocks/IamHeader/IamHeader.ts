import Vue from 'vue';
import Component from 'vue-class-component';

import { conf } from './IamHeader.conf';

const { name, template } = conf;

@Component({
	name,
	template,
})
export class IamHeader extends Vue {
}
