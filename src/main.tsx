import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactGA from "react-ga4";

import '../styles/index.css'
import App from './App.tsx'

ReactGA.initialize("G-7P7MNT81T3");

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)