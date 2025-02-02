import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { HashRouter } from 'react-router-dom'
import { LoadingProvider } from './Contexts/LoadingContext.jsx'
import { ProfileDataProvider } from './Contexts/ProfileContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <LoadingProvider>
        <ProfileDataProvider>
          <App />
        </ProfileDataProvider>
      </LoadingProvider>
    </HashRouter>
  </StrictMode>,
)
