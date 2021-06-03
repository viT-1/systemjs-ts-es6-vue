import express from 'express';
import path from 'path';

import { conf } from './express-conf.node.json';

// Не выдаёт ошибок, если в tsconfig указано, что соберём commonjs
import { conf as appConf } from '../app.conf';

const app = express();
app.use(express.static(
	path.resolve(appConf.rootFolderPath, appConf.destFolderName),
	{ cacheControl: false },
));

const args = process.argv.slice(2);
const entryName = args.length && args[0] && args[0] === '--dev'
	? appConf.entryDevFileName : appConf.entryFileName;

const absEntry = path.resolve(
	appConf.rootFolderPath,
	appConf.destFolderName,
	entryName,
);

app.get('/', (req, res): void => {
	res.sendFile(absEntry);
	// res.send(absEntry);
});

const server = app.listen(conf.port, (): void => {
	console.log(conf.log.onListen, conf.port);
});

// @link: https://flaviocopes.com/node-terminate-program/
process.on('SIGTERM', (): void => {
	server.close((): void => {
		console.log(conf.log.onSigterm);
	});
});
