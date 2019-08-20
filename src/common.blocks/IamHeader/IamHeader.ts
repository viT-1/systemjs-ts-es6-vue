// @link: https://github.com/vuejs/vue/issues/6815#issuecomment-336721984
/* eslint-disable import/no-duplicates */
import VueD from 'vue';
import * as VueN from 'vue';

import { name, template } from './IamHeader.conf';

const Vue = VueD || VueN;

const IamHeader = Vue.extend({
	name,
	template,
});

export default IamHeader;
