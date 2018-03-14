import { AbstractModel } from './AbstractModel'

export class Softmax extends AbstractModel {
  constructor () {
    super()

    this.type = 'softmax'
    this.label = 'Softmax'
  }

  createModel (inputs) {
    return {
      exec: (inputTensor) => inputTensor.softmax(),
      outputs: inputs
    }
  }
}
