'use strict';

import mongoose from 'mongoose';
import config from './environment';

export default function initDB() {
  mongoose.Promise = Promise;
  mongoose.connect(config.dbUri, function(err, res) {
    if (err) {
      console.log ('ERROR connecting to: ' + config.dbUri + '. ' + err);
    } else {
      console.log ('Succeeded connected to: ' + config.dbUri);
    }
  });
}
