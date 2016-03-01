'use strict';

var controller = require('./root.controller');
var router = require('koa-router')();
import betterBodyParse from 'koa-better-body';
import bodyParse from 'koa-bodyparser';

router.get('/', controller.index);
router.get('/all', controller.get);
router.get('/create', controller.create);
router.post('/upload', betterBodyParse({multipart:true}), controller.upload);
router.delete('/files', bodyParse(), controller.delete);

module.exports = router.routes();
