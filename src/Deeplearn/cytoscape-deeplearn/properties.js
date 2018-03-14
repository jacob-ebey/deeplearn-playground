import React from 'react'
import ReactDOM from 'react-dom'

class PropsComponent extends React.Component {
  constructor (props) {
    super()
    this._onChange = this._onChange.bind(this)

    const { end, postopEnd, id, label, type, model, ...rest } = props.node.data()

    this.state = Object.getOwnPropertyNames(rest).reduce((p, key) => {
      p[key] = rest[key]
      return p
    }, {})
  }

  render () {
    const { node } = this.props
    const { end, postopEnd, id, label, type, ...rest } = node.data()

    return (
      <div className='white'>
        {
          Object.getOwnPropertyNames(rest).map((key) => (
            <div key={key}>
              <label>{key}:&nbsp;</label>
              <input value={`${this.state[key]}`} onChange={this._onChange(key)} />
            </div>
          ))
        }
      </div>
    )
  }

  _onChange (name) {
    return (e) => {
      this.props.node.data(name, e.target.value)
      this.setState({ [name]: e.target.value })
    }
  }
}

export function initializeProperties (cy) {
  let popper
  let div

  cy.on('render', () => {
    if (popper) {
      popper.scheduleUpdate()
    }
  })

  cy.on('unselect', () => {
    if (popper) {
      popper.destroy()
      popper = undefined
    }
    if (div) {
      document.body.removeChild(div)
      div = undefined
    }
  })

  cy.on('select', (e) => {
    const node = e.target

    if (node.group() === 'nodes') {
      const component = <PropsComponent node={node} />

      popper = node.popper({
        content: () => {
          div = document.createElement('div')
          document.body.appendChild(div)

          ReactDOM.render(component, div)

          return div
        }
      })
    }
  })
}
