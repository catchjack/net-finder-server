"use strict";

import koa from 'koa';
import config from './config/environment';
import initDB from './config/db';
import config_koa from './config/koa';
import config_routes from './config/routes';

let app = koa();
initDB();
config_koa(app);
config_routes(app);

app.listen(config.port, config.ip, function (){
  console.log('Koa server listening on %d, in %s mode', config.port, config.env);
});
