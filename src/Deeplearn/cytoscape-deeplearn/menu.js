export function createContextMenuOptions (cy, models) {
  return {
    menuItems: [
      ...models.map((m) => createAddModel(cy, m)),
      {
        id: 'set-output',
        content: 'Set as output',
        selector: 'node',
        onClickFunction: (e) => {
          if (e.target.data('type') !== 'data-source' && e.target.data('type') !== 'post-op') {
            cy.nodes().data('end', 'false')
            e.target.data('end', 'true')
          }
        }
      },
      {
        id: 'set-post-op-output',
        content: 'Set as post-op output',
        selector: 'node',
        onClickFunction: (e) => {
          if (e.target.data('type') !== 'data-source' && e.target.data('type') !== 'post-op') {
            cy.nodes().data('postopEnd', 'false')
            e.target.data('postopEnd', 'true')
          }
        }
      },
      {
        id: 'remove',
        content: 'Remove',
        selector: 'node, edge',
        onClickFunction: (e) => {
          cy.remove(e.target)
          cy.layout({ name: 'dagre' }).run()
          cy.fit()
        }
      }
    ]
  }
}

function createAddModel (cy, model) {
  return {
    id: `add-${model.id}`,
    content: `Add ${model.label}`,
    selector: typeof model.selector === 'undefined' ? 'node' : model.selector,
    coreAsWell: typeof model.coreAsWell === 'undefined' || model.coreAsWell,
    onClickFunction: (e) => {
      if (model.canAdd && !model.canAdd(cy)) {
        return
      }

      const target = cy.add({
        group: 'nodes',
        data: {
          ...model.defaultParams,
          type: model.type,
          label: model.label
        }
      }).data('id')

      const source = e.target && e.target.data && e.target.data('id')

      if (source) {
        cy.add({
          group: 'edges',
          data: { source, target }
        })
      }

      cy.layout({ name: 'dagre' }).run()
      cy.fit()
    }
  }
}
