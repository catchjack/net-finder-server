'use strict';

import File from '../../models/files';
import fs from 'fs';
import path from 'path';
import config from '../../config/environment';


exports.index = function *(next){
  this.status = 200;
  this.body ='Hello world';
}

exports.get = function *() {
  let files = yield File.find();
  this.status = 200;
  this.body = files;
}

exports.create = function* () {
  let file = new File({
    name: '1',
    downloadUri: '1',
    coverUri: '1',
    addDate: new Date(),
    type: '1',
  });
  let res = yield file.save();
  this.body = res;
}

exports.upload = function *(next) {
    let upfiles =this.request.body.files.userFiles;
    let resBody = [];
    for( let i = 0; i < upfiles.length; i ++) {
      let upfile = upfiles[i];
      let tmpath = upfile['path'];
      let ext ='.'+ upfile['name'].split('.').pop();
      let newName = parseInt(Math.random()*100) + Date.parse(new Date()).toString() + ext;
      let newpath = path.join(__dirname + '../../../public/files', newName);

      let stream = fs.createWriteStream(newpath);//创建一个可写流
      fs.createReadStream(tmpath).pipe(stream);//可读流通过管道写入可写流
      let fileUrl = `http://${config.domain}/files/${newName}`;

      let newFile = {
        name: newName,
        downloadUri: fileUrl,
        coverUri: fileUrl,
        addDate: new Date(),
        type: '1',
      }
      resBody.push(newFile);
    }

    let arr = yield resBody.map(newFile => {
      let file = new File(newFile);
      return file.save();
    })

    this.status = 200;
    this.body = {
      files: arr
    };
}

exports.delete = function* (next){

  let ids = this.request.body.ids;
  let res = yield File.remove({_id:{$in:ids}});
  this.status = 200;
  this.body = res;
}
