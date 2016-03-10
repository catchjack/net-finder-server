'use strict';

import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let FileSchema = new Schema({
  name: String,
  uri: String,
  downloadUri: String,
  coverUri: String,
  addDate: Date,
  type: String, //music normal
  ext: String,
  typeFlag: Number
});

export default mongoose.model('files', FileSchema);
