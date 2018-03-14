import React from 'react'
import cytoscape from 'cytoscape'
import contextMenus from 'cytoscape-context-menus'
import dagre from 'cytoscape-dagre'
import edgeHandles from 'cytoscape-edgehandles'
import popper from 'cytoscape-popper'
import jquery from 'jquery'

import deeplean, { defaultStyles } from './cytoscape-deeplearn/deeplearn'

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

    this.graphRef = undefined
    this.cy = undefined
    this.network = undefined

    this.state = {
      cost: 0,
      training: false
    }
  }

  componentDidMount () {
    this.cy = cytoscape(createCytoscapeOptions(this.graphRef))
    this.network = this.cy.deeplearn()
  }

  render () {
    const { training } = this.state

    return (
      <div className='grow'>
        <div>
          <button disabled={training} onClick={this._compileGraph}>Compile Graph</button>
          <button onClick={this._train}>Train</button>
          <button onClick={this._sampleGraph}>Sample</button>
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
    await this.graph.train(
      [[0, 0], [0, 1], [1, 0], [1, 1]],
      [[0], [1], [1], [0]]
    )
  }

  _sampleGraph () {
    if (this.graph) {
      console.log(this.graph.sample([0, 0]))
      console.log(this.graph.sample([1, 0]))
      console.log(this.graph.sample([0, 1]))
      console.log(this.graph.sample([1, 1]))
    }
  }
}

const createCytoscapeOptions = (ref, elements) => ({
  container: ref,
  elements,

  style: defaultStyles
})
