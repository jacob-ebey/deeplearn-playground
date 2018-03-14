import {
  fill,
  greater
} from 'deeplearn'

import { AbstractModel } from './AbstractModel'

const defaultParams = {
  cutoff: '0.5'
}

export class BooleanClip extends AbstractModel {
  constructor () {
    super()

    this.type = 'boolean-clip'
    this.label = 'BooleanClip'
    this.defaultParams = defaultParams
  }

  createModel (inputs, params = defaultParams) {
    const cutoff = Number.parseFloat(params.cutoff)

    return {
      exec: (inputTensor) => {
        return greater(inputTensor, fill(inputTensor.shape, cutoff))
      },
      outputs: inputs
    }
  }
}
