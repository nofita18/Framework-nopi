import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './tailwind.css'
import MenuCard from './MenuCard.jsx'
import MenuTable from './MenuTable.jsx'
import MenuSearchFilter from './MenuSearchFilter.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MenuSearchFilter/>
  </StrictMode>,
)