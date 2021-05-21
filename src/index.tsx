import { Suspense, StrictMode } from 'react'
import ReactDOM from 'react-dom'

import '@src/utils/validateEnvVars'
import SuspenseFallback from '@src/App/SuspenseFallback'
import App from '@src/App'

ReactDOM.render(
  <StrictMode>
    <Suspense fallback={<SuspenseFallback />}>
      <App />
    </Suspense>
  </StrictMode>,
  document.getElementById('root'),
)
