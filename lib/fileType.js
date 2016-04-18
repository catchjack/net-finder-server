'use strict';

export const fileType = {
  NORMAL: 1,
  PICTURE: 2,
  MUSIC: 3,
  DIR: 4,
  OTHER: 5,
}

export const fileTypeArr = {
  PICTURE: ['.jpg', '.jpeg', '.png', '.svg', '.bmp'],
  MUSIC: ['.mp3']
}

export let ext2FileType = {};

Object.keys(fileTypeArr).forEach((fileTypeName) => {
  fileTypeArr[fileTypeName].forEach(ext => {
    ext2FileType[ext] = fileType[fileTypeName];
  });
})
