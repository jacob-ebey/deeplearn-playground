import React from 'react'
import cytoscape from 'cytoscape'
import contextMenus from 'cytoscape-context-menus'
import dagre from 'cytoscape-dagre'
import edgeHandles from 'cytoscape-edgehandles'
import popper from 'cytoscape-popper'
import jquery from 'jquery'

import deeplean, { defaultStyles } from './cytoscape-deeplearn/deeplearn'
import { datasets } from './datasets'
// import { defaultModel } from './defaultModel'

contextMenus(cytoscape, jquery)
deeplean(cytoscape)
dagre(cytoscape)
edgeHandles(cytoscape)
popper(cytoscape)

export class UX extends React.Component {
  constructor () {
    super()

    this._getGraphRef = this._getGraphRef.bind(this)
    this._compileGraph = this._compileGraph.bind(this)
    this._train = this._train.bind(this)
    this._sampleGraph = this._sampleGraph.bind(this)
    this._changeValue = this._changeValue.bind(this)

    this.graphRef = undefined
    this.cy = undefined
    this.network = undefined

    this.state = {
      cost: 0,
      training: false,
      selectedDataset: 0,
      iterations: 1000,
      batchSize: 10,
      logEvery: 100
    }
  }

  componentDidMount () {
    this.cy = cytoscape(createCytoscapeOptions(this.graphRef))
    this.cy.layout({ name: 'dagre' }).run()
    this.cy.fit()
    this.network = this.cy.deeplearn()
  }

  render () {
    const { training, selectedDataset, iterations, batchSize, logEvery } = this.state

    return (
      <div className='grow'>
        <div>
          <button disabled={training} onClick={this._compileGraph}>Compile Graph</button>
          <button disabled={training} onClick={this._train}>Train</button>
          <button onClick={this._sampleGraph}>Sample</button>
          <span>&nbsp;Inputs: {datasets[selectedDataset].inputCount}</span>
          <span>Outputs: {datasets[selectedDataset].outputCount}</span>
          <br />
          <span>Dataset: </span>
          <select onChange={this._changeValue('selectedDataset')} value={selectedDataset}>
            {
              datasets.map((d, i) => (
                <option key={i} value={i}>{d.name}</option>
              ))
            }
          </select>
          <span>Iterations: </span>
          <input key='number' value={iterations} onChange={this._changeValue('iterations')} />
          <span>Batch Size: </span>
          <input type='number' value={batchSize} onChange={this._changeValue('batchSize')} />
          <span>Log Every: </span>
          <input type='number' value={logEvery} onChange={this._changeValue('logEvery')} />
        </div>

        <div className='grow' ref={this._getGraphRef} />
      </div>
    )
  }

  _getGraphRef (ref) {
    this.graphRef = ref
  }

  _compileGraph () {
    this.graph = this.network.compileGraph()
  }

  async _train () {
    const { iterations, batchSize, logEvery } = this.state

    this.setState({ training: true })
    try {
      await this.graph.train(
        datasets[this.state.selectedDataset].inputs,
        datasets[this.state.selectedDataset].outputs,
        iterations,
        batchSize,
        logEvery
      )
    } finally {
      this.setState({ training: false })
    }
  }

  _sampleGraph () {
    if (this.graph) {
      for (let i = 0; i < datasets[this.state.selectedDataset].testInputs.length; i++) {
        const result = this.graph.sample(datasets[this.state.selectedDataset].testInputs[i])
        console.log(`Expected: ${JSON.stringify(datasets[this.state.selectedDataset].testOutputs[i])}`)
        console.log(`     Got: ${JSON.stringify(Object.keys(result).map((k) => result[k]))}`)
      }
    }
  }

  _changeValue (key) {
    return (e) => {
      this.setState({ [key]: e.target.value })
    }
  }
}

const createCytoscapeOptions = (ref, elements) => ({
  container: ref,
  elements,

  style: defaultStyles
})
