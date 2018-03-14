export const defaultModel = {
  nodes: [
    { data: { id: '1', type: 'data-source', inputs: '2' } },
    { data: { id: '2', type: 'fully-connected-layer', outputs: '10', activation: 'relu' } },
    { data: { id: '3', type: 'fully-connected-layer', outputs: '1', activation: 'sigmoid', end: 'true' } },

    { data: { id: '4', type: 'post-op' } },
    { data: { id: '5', type: 'boolean-clip', cutoff: '0.5', postOpEnd: 'true' } }
  ],
  edges: [
    { data: { source: '1', target: '2' } },
    { data: { source: '2', target: '3' } },

    { data: { source: '4', target: '5' } }
  ]
}
