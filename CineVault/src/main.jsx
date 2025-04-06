import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {HeroUIProvider} from '@heroui/react'
import './index.css'
import App from './App.jsx'
import Providers from "./providers"; 

createRoot(document.getElementById('root')).render(
  // <StrictMode>
     <HeroUIProvider>
     <Providers>
      <App />
    </Providers>
    </HeroUIProvider>
  // </StrictMode>,
)
