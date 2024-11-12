import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ProfileDataProvider } from './Components/Contexts/ProfileContext.jsx'
import { LoadingProvider } from './Components/Contexts/LoadingContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoadingProvider>
      <ProfileDataProvider>
        <App />
      </ProfileDataProvider>
    </LoadingProvider>
  </StrictMode>,
)
