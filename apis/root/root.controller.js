'use strict';

import File from '../../models/files';
import fs from 'fs';
import path from 'path';
import config from '../../config/environment';
import {fileType, fileTypeArr, ext2FileType} from '../../lib/fileType';


exports.index = function *(next){
  this.status = 200;
  this.body ='Hello world';
}

//type=picture"
exports.get = function *() {
  let files = yield File.find();
  let params = this.request.query;
  this.status = 200;
  switch (params.type) {
    case 'music':
      this.body = files.filter(file => {
        return file.typeFlag == fileType.MUSIC;
      })
      break;
    case 'picture':
      this.body = files.filter(file => {
        return file.typeFlag == fileType.PICTURE;
      })
      break;
    case 'other':
      this.body = files.filter(file => {
        return file.typeFlag != fileType.PICTURE && file.typeFlag != fileType.MUSIC;;
      })
      break;
    default:
      this.body = files;
  }

}

function dealFile(upfile) {
  let tmpath = upfile['path'];
  let ext ='.'+ upfile['name'].split('.').pop();
  let filename =upfile['name'].slice(0, -(ext.length));
  let newName = `${filename}_${Date.parse(new Date()).toString()}${ext}`;
  let newpath = path.join(__dirname + '../../../public/files', newName);

  let stream = fs.createWriteStream(newpath);//创建一个可写流
  fs.createReadStream(tmpath).pipe(stream);//可读流通过管道写入可写流
  let fileUrl = `http://${config.domain}/files/${newName}`;

  let newFile = {
    name: filename,
    uri: fileUrl,
    downloadUri: fileUrl,
    coverUri: fileUrl,
    addDate: new Date(),
    type: upfile['type'],
    typeFlag: ext2FileType[ext],
  }
  return newFile;
}

exports.upload = function *(next) {
    let upfiles =this.request.body.files.userFiles;
    let resBody = [];
    if(upfiles.length) {
      for( let i = 0; i < upfiles.length; i ++) {
        resBody.push(dealFile(upfiles[i]));
      }
    } else {
      resBody.push(dealFile(upfiles));
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
