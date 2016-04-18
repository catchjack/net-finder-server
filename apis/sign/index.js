'use strict';

var controller = require('./sign.controller');
var router = require('koa-router')();
import betterBodyParse from 'koa-better-body';
import bodyParse from 'koa-bodyparser';

router.post('/up', controller.signUp);
router.post('/in', controller.signIn);

module.exports = router.routes();
