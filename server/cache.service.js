

let defaultOptions = {
  expiresIn: 1000*60*30
}

class Cache {
  constructor() {
    this.storage = {};
    this.expiresAt = {};
  }

  set(key, value, userOptions) {
    let options = Object.assign({}, defaultOptions, userOptions);

    this.storage[key] = value;
    this.expiresAt[key] = Date.now() + options.expiresIn;
  }

  get(key) {
    let expiresAt = this.expiresAt[key];
    if (Date.now() - expiresAt > 0) {
      return null;
    } else {
      return this.storage[key];
    }
  }
}

module.exports = Cache;
