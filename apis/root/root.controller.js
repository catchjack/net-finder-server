'use strict';

import File from '../../models/files';
import fs from 'fs';
import path from 'path';


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
    var upfile =this.request.body.files.userFile;
    var tmpath = upfile['path'];
    var ext ='.'+ upfile['name'].split('.').pop();
    var newName = parseInt(Math.random()*100) + Date.parse(new Date()).toString() + ext;
    var newpath = path.join(__dirname + '../../../public/files', newName);
   
    var stream = fs.createWriteStream(newpath);//创建一个可写流
    fs.createReadStream(tmpath).pipe(stream);//可读流通过管道写入可写流
    var domain = 'http://localhost:3000/';
    var fileUrl = domain + 'files/' + newName;

    //存入数据库
    let file = new File({
      name: newName,
      downloadUri: fileUrl,
      coverUri: fileUrl,
      addDate: new Date(),
      type: '1',
    });
    let res = yield file.save();

    this.status = 200;
    this.body = res;

}

exports.delete = function* (next){

  let ids = this.request.body.ids;
  let res = yield File.remove({_id:{$in:ids}});
  this.status = 200;
  this.body = res;
}
