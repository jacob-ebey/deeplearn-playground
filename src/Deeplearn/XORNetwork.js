import { Layer, Neuron } from './Network'

export class XORNetwork {
  constructor () {
    this.hiddenLayer = new Layer([new Neuron(2, 0, 1, 'relu'), new Neuron(2, 0, 1, 'relu')])
    this.prediction = new Layer([new Neuron(2, 0, 1, 'relu')])
  }

  predict () {

  }

  train () {

  }
}
