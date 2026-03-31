import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import CharacterDetail from './pages/CharacterDetail.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/character/:id" element={<CharacterDetail />} />
    </Routes>
  </BrowserRouter>
)