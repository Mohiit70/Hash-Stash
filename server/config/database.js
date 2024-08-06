// server/config/database.js

class InMemoryStore {
    constructor() {
      this.store = new Map();
    }
  
    set(key, value) {
      this.store.set(key, value);
    }
  
    get(key) {
      return this.store.get(key);
    }
  
    delete(key) {
      this.store.delete(key);
    }
  
    clear() {
      this.store.clear();
    }
  }
  
  const database = new InMemoryStore();
  
  module.exports = database;