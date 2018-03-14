import { AbstractModel } from './AbstractModel'

const defaultParams = {
  inputs: '2'
}

export class DataSource extends AbstractModel {
  constructor () {
    super()

    this.type = 'data-source'
    this.label = 'Data Source'
    this.selector = ''
    this.defaultParams = defaultParams
  }

  canAdd (cy) {
    return cy.nodes('node[type="data-source"]').length === 0
  }

  createModel (inputs) {
    return {
      exec: (inputTensor) => inputTensor,
      outputs: inputs
    }
  }
}
