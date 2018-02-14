const ejs = require('ejs');

class Email {
  constructor({ to, from, dir, data }) {
    this.to = to;
    this.from = from;
    this.dir = dir;
    this.data = data;
  }

  get text() {
    return this.render('text');
  }

  get html() {
    return this.render('html');
  }

  get subject() {
    return this.render('subject');
  }

  render(type) {
    const template = require(`${this.dir}/${type}.ejs`);
    return template(this.data);
  }
}

module.exports = Email;
