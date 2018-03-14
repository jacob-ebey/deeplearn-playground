export class AbstractModel {
  constructor () {
    if (new.target === AbstractModel) {
      throw new TypeError('Cannot construct AbstractModel instances directly')
    }

    if (typeof this.createModel !== 'function') {
      throw new TypeError('Must override createModel')
    }

    this.createModel = this.createModel.bind(this)
  }
}
