import { AbstractModel } from './AbstractModel'

export class PostOp extends AbstractModel {
  constructor () {
    super()

    this.type = 'post-op'
    this.label = 'Post Op'
    this.selector = ''
  }

  canAdd (cy) {
    return cy.nodes('node[type="post-op"]').length === 0
  }

  createModel (inputs) {
    return {
      exec: (inputTensor) => inputTensor,
      outputs: inputs
    }
  }
}
