import { AbstractModel } from './AbstractModel'

export class ArgMax extends AbstractModel {
  constructor () {
    super()

    this.type = 'arg-max'
    this.label = 'ArgMax'
  }

  createModel (inputs) {
    return {
      exec: (inputTensor) => inputTensor.argMax(),
      outputs: 1
    }
  }
}
