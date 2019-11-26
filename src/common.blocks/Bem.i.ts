/** BEM: Block & modificator. Elements should be as standart html tags in block templates */
export interface IBem {
	/** Block name */
	readonly block: string;

	/**
	 * Parent block name
	 * For css-selectors block nesting with mixed blocks (class="parentBlock__block block")
	 * https://ru.bem.info/methodology/key-concepts/#микс
	 */
	blockParent?: string;

	/**
	 * Base constant modificator ([view on BEViS](https://github.com/bevis-ui/docs/blob/master/faq/bem-vs-bevis.md#view) ),
	 * not changed as states (they are also modificators on Bem)
	 * @link: https://ru.bem.info/forum/135/
	 * @link: https://github.com/bevis-ui/docs
	 */
	readonly mod?: string;
}
