'use strict';

import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let AccountSchema = new Schema({
  account: String,
  nick: String,
  password: String
});

export default mongoose.model('accounts', AccountSchema);
