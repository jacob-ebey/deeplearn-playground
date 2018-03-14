import { injectGlobal } from 'styled-components'

injectGlobal`
html, body, #app {
  padding: 0;
  margin: 0;
  border: 0;
  width: 100%;
  height: 100%;
}

#app, .grow {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.white {
  background-color: white;
}
`
