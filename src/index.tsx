import { StrictMode } from 'react'
import ReactDOM from 'react-dom'

import '@src/utils/validateEnvVars'
import App from '@src/App'

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root'),
)
