const fs = require('fs');

class FileDb {
  constructor(name) {
    this.name = name;
    this.indexes = [];
    this.fileName = `/Users/paul.selden/Development/personal/stellarguard/dbs/${
      this.name
    }.json`;
    this.load();
  }

  load() {
    if (fs.existsSync(this.fileName)) {
      this.db = require(this.fileName);
    } else {
      this.db = {
        data: {
          id: {}
        },
        counter: 0
      };
    }
  }

  indexOn(index, { multi = false } = {}) {
    if (!this.indexes[index]) {
      this.indexes[index] = { index, multi };
    }

    if (!this.db.data[index]) {
      this.db.data[index] = this.db.data[index] || {};
    }
  }

  get(id, index) {
    if (index) {
      const { multi } = this.indexes[index];
      if (multi) {
        const ids = this.db.data[index][id] || [];
        return ids.map(id => this.db.data.id[id]);
      } else {
        id = this.db.data[index][id];
        return this.db.data.id[id];
      }
    }

    return this.db.data.id[id];
  }

  getAll() {
    return Object.values(this.db.data.id);
  }

  create(obj) {
    let id = obj.id;
    if (!id) {
      id = this.db.counter + 1;
      this.db.counter = id;
      obj = clone(obj);
      obj.id = id;
    }

    this.db.data.id[id] = obj;
    for (const [index, { multi }] of Object.entries(this.indexes)) {
      if (multi) {
        this.db.data[index][obj[index]] = (
          this.db.data[index][obj[index]] || []
        ).concat(id);
      } else {
        this.db.data[index][obj[index]] = id;
      }
    }

    this.flush();
    return id;
  }

  update(obj) {
    const id = obj.id;
    obj = clone(obj);
    this.db.data.id[obj.id] = obj;
    this.flush();
  }

  flush() {
    fs.writeFileSync(this.fileName, JSON.stringify(this.db, null, 2), 'utf-8');
  }
}

module.exports = FileDb;

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}
