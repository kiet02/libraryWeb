import  { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Dashboard } from './page/Dashboard/Dashboard'
import Login from './page/Auth/Login'
export function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true)
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen}/>} />
      </Routes>
  </Router>

  )
}
