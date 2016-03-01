'use strict';

import staticCache from 'koa-static-cache';
import logger from 'koa-logger';
import path from 'path';
import cors from 'koa-cors';



export default function (app){
  //日志中间件
  app.use(logger());
  //设置静态缓存
  app.use(staticCache(path.join(__dirname, '../public'), {
    maxAge: 365 * 24 * 60 * 60,
    dynamic: true,
    gzip: true
  }));
  //设置cors跨域
  app.use(cors({
  	methods: ['GET', 'PUT', 'POST', 'DELETE']
  }));
}
