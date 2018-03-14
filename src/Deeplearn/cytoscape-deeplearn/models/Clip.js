import { AbstractModel } from './AbstractModel'

const defaultParams = {
  min: '0',
  max: '1'
}

export class Clip extends AbstractModel {
  constructor () {
    super()

    this.type = 'clip'
    this.label = 'Clip'
    this.defaultParams = defaultParams
  }

  createModel (inputs, params = defaultParams) {
    const min = Number.parseFloat(params.min)
    const max = Number.parseFloat(params.max)

    return {
      exec: (inputTensor) => inputTensor.clipByValue(min, max),
      outputs: inputs
    }
  }
}
