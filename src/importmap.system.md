Diff with importmap.dev.json
Modules vue-class-component & vue-property-decorator
- vue-class-component code has runtime error in Chrome, FF, Edge: "instance of Vue" operand
- vue-property-decorator code is not supported in ie11 with "[in operator](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/in)"
	`TypeError: right-hand side of 'in' should be an object, got undefined` because umd can't reolve vue-class-component

SystemJs 5.0 importmaps should use packages without dependencies?!