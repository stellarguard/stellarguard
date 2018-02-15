const { AppError, UnknownError } = require('errors');

class DummyClass {
  constructor() {}
}

const commonNames = Object.getOwnPropertyNames(
  Object.getPrototypeOf(DummyClass)
);

class Controller {
  constructor() {
    Object.getOwnPropertyNames(Object.getPrototypeOf(this))
      .filter(name => !commonNames.includes(name))
      .forEach(name => {
        const method = this[name].bind(this);
        this[name] = async (req, res, next) => {
          try {
            await method(req, res, next);
          } catch (error) {
            if (error instanceof AppError) {
              res.status(error.statusCode || 400).json(error);
            } else {
              console.error(error);
              res.status(500).json(new UnknownError());
            }
          }
        };
      });
  }
}

module.exports = Controller;
