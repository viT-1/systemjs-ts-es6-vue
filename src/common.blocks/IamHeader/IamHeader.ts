import Vue from 'vue';
// import Component from 'vue-class-component';

import { name, template } from './IamHeader.conf';

// @Component({
// 	name,
// 	template,
// })
// class IamHeader extends Vue {
// }

const IamHeader = Vue.extend({
	name,
	template,
});

export default IamHeader;
