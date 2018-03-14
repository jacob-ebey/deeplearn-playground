export const defaultStyles = [
  {
    selector: 'edge',
    style: {
      'curve-style': 'bezier',
      'target-arrow-shape': 'triangle'
    }
  },
  {
    selector: 'node',
    style: {
      label: (n) => n.data('label') || '',
      width: '100px',
      height: '100px',
      color: 'white',
      'text-valign': 'center'
    }
  },
  {
    selector: 'node[?type]',
    style: {
      width: 'label',
      height: (n) => n.width(),
      'background-color': 'orange',
      padding: '10px'
    }
  },
  {
    selector: 'node[type="fully-connected-layer"]',
    style: {
      shape: 'rectangle',
      height: 'label'
    }
  },
  {
    selector: 'node[type="softmax"]',
    style: {
      shape: 'rectangle'
    }
  },
  {
    selector: 'node[end="true"], node[postOpEnd="true"]',
    style: {
      'background-color': 'blue'
    }
  },
  {
    selector: 'node[type="data-source"], node[type="post-op"]',
    style: {
      'background-color': 'green'
    }
  },
  {
    selector: '.eh-handle',
    style: {
      width: '10px',
      height: '10px',
      'background-color': 'gray'
    }
  }
]
