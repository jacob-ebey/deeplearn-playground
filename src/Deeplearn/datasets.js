import mnist from 'mnist'

const set = mnist.set(2000, 1).training

const mnistDataset = set.filter(c => c && Array.isArray(c.input) && Array.isArray(c.output)).reduce((p, c) => {
  p.inputs.push(c.input.map(n => { const f = Number.parseFloat(n); return Number.isNaN(f) ? 0 : f }))
  p.outputs.push(c.output.map(n => { const f = Number.parseFloat(n); return Number.isNaN(f) ? 0 : f }))

  return p
}, {
  inputs: [],
  outputs: []
})

export const datasets = [
  {
    name: 'XOR (single output)',
    inputCount: 2,
    outputCount: 1,
    inputs: [[0, 0], [0, 1], [1, 0], [1, 1]],
    outputs: [[0], [1], [1], [0]]
  },
  {
    name: 'XOR (two outputs)',
    inputCount: 2,
    outputCount: 2,
    inputs: [[0, 0], [0, 1], [1, 0], [1, 1]],
    outputs: [[1, 0], [0, 1], [0, 1], [1, 0]]
  },
  {
    name: 'MNIST',
    inputCount: mnistDataset.inputs[0].length,
    outputCount: mnistDataset.outputs[0].length,
    ...mnistDataset
  }
]
