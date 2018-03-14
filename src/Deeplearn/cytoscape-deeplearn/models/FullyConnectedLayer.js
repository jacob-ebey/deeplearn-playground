import {
  randomNormal,
  scalar,
  variable
} from 'deeplearn'

import { AbstractModel } from './AbstractModel'

function initializeWeights (shape, prevLayerSize) {
  return randomNormal(shape).mul(scalar(Math.sqrt(2.0 / prevLayerSize)))
}

const defaultParams = {
  outputs: 2,
  activation: 'sigmoid'
}

export class FullyConnectedLayer extends AbstractModel {
  constructor () {
    super()

    this.type = 'fully-connected-layer'
    this.label = 'Fully Connected Layer'
    this.defaultParams = defaultParams
  }

  createModel (inputs, params = defaultParams) {
    const weights = variable(initializeWeights([inputs, params.outputs], inputs), true)
    const bias = variable(scalar(0), true)

    return {
      exec: (inputTensor) => {
        const weighted = inputTensor.matMul(weights).add(bias)

        if (params.activation === 'relu') {
          return weighted.relu()
        }

        return weighted.sigmoid()
      },
      outputs: params.outputs,
      trainable: [weights, bias]
    }
  }
}
