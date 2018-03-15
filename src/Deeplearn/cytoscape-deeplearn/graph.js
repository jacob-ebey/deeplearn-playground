import {
  SGDOptimizer,
  add,
  scalar,
  tensor2d,
  tidy
} from 'deeplearn'

const compileModels = (modelMap, sourceInputs, aStar) => {
  let inputs = sourceInputs

  return aStar.path.nodes().map((node) => {
    const model = modelMap[node.data('type')].createModel(inputs, node.data())
    inputs = model.outputs
    return model
  })
}

export const compileGraph = (cy, modelArray) => () => {
  const modelMap = {}
  modelArray.forEach((m) => {
    modelMap[m.type] = m
  })

  const dataSource = cy.nodes('node[type="data-source"]')
  const endNode = cy.nodes('node[end="true"]')

  const aStar = cy.elements().aStar({ root: dataSource, goal: endNode })

  if (!aStar.found) {
    throw new Error('Data source and output not connected')
  }

  const sourceInputs = Number.parseInt(dataSource.data('inputs'))

  const models = compileModels(modelMap, sourceInputs, aStar)

  const targetOutputs = Number.parseInt(models[models.length - 1].outputs)

  const postOpSource = cy.nodes('node[type="post-op"]')
  const postOpEndNode = cy.nodes('node[postOpEnd="true"]')

  let postops
  if (postOpSource.length && postOpEndNode.length) {
    const postopAStar = cy.elements().aStar({ root: postOpSource, goal: postOpEndNode })

    if (postopAStar.found) {
      postops = compileModels(modelMap, targetOutputs, postopAStar)
    }
  }

  const sample = (inputTensor) => {
    return models.reduce((p, c) => c.exec(p), inputTensor)
  }

  const one = scalar(1)

  const calculateCost = (target, result) => {
    return add(
      target.mul(result.log()),
      one.sub(target).mul(one.sub(result).log())
    ).sum().neg()
  }

  return {
    sample (input) {
      return tidy(() => {
        const result = sample(tensor2d([input], [1, sourceInputs]))

        if (postops) {
          return postops.reduce((p, c) => c.exec(p), result).dataSync()
        }

        return result.dataSync()
      })
    },

    async train (input, target, iterations = 1000, batchSize = 20, log = 100, optimizer = new SGDOptimizer(0.1)) {
      return new Promise((resolve) => {
        let currentBatch = 0
        for (let i = 0; i < iterations; i++) {
          const currentInput = input.slice(currentBatch * batchSize, (currentBatch + 1) * batchSize)
          const currentTarget = target.slice(currentBatch * batchSize, (currentBatch + 1) * batchSize)

          currentBatch += 1
          if (currentBatch * batchSize >= input.length) {
            currentBatch = 0
          }

          tidy(() => {
            const inputTensor = tensor2d(currentInput, [currentInput.length, sourceInputs])
            const targetTensor = tensor2d(currentTarget, [currentTarget.length, targetOutputs])

            const cost = optimizer.minimize(() => {
              return calculateCost(targetTensor, sample(inputTensor))
            }, true)

            if (i % log === 0 || i === iterations - 1) {
              console.log(`cost[${i}] = ${cost.getValues()}`)
            }
          })
        }

        resolve()
      })
    }
  }
}
