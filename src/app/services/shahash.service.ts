/// <reference types="crypto-js" />

import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class SHAHashService {

  constructor() { }

  hash(message) {
    var hashString = CryptoJS.SHA256(message);
    return hashString.toString();
  }
}
