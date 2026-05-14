import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './tailwind.css'
import TicketForm from './TicketForm'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TicketForm />
  </StrictMode>,
)