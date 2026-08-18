import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import CharacterDetail from './pages/CharacterDetail.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<ProtectedRoute><App /></ProtectedRoute>} />
        <Route path="/character/:id" element={<ProtectedRoute><CharacterDetail /></ProtectedRoute>} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
)
