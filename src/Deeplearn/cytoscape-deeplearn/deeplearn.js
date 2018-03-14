import { compileGraph } from './graph'
import { createContextMenuOptions } from './menu'
import defaultModels from './models'
import { initializeProperties } from './properties'

export * from './styles'

export const defaultOptions = {
  models: defaultModels
}

export default function deeplearn (cytoscape, options = defaultOptions) {
  cytoscape('core', 'deeplearn', function (args) {
    const cy = this

    initializeProperties(cy)

    cy.contextMenus(createContextMenuOptions(cy, options.models))

    cy.edgehandles({
      handlePosition: (node) => 'middle bottom',
      complete: () => {
        cy.layout({ name: 'dagre' }).run()
        cy.fit()
      }
    })

    return {
      compileGraph: compileGraph(cy, options.models)
    }
  })
}
