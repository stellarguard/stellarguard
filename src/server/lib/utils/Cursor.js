class Cursor {
  constructor(cursor = '') {
    this.cursor = cursor;
  }

  getValue() {
    return Buffer.from(this.cursor, 'base64').toString();
  }

  hasValue() {
    return !!this.cursor;
  }

  static fromValue(value = '') {
    const cursor = Buffer.from(value.toString()).toString('base64');
    return new this(cursor);
  }
}

module.exports = Cursor;
