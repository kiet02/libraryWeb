import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Dashboard } from './page/Dashboard/Dashboard'
import Login from './page/Auth/Login'
import Books from './page/Book/Book'
import { Layout } from './component/Drawer/Layout'

export function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true)

  return (
    <Router>
      <Routes>
        {/* Route login riêng không có layout */}
        <Route path="/" element={<Login />} />

        {/* Routes có layout dùng Outlet */}
        <Route
          path="/"
          element={
            <Layout
              isDrawerOpen={isDrawerOpen}
              setIsDrawerOpen={setIsDrawerOpen}
            />
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="books" element={<Books />} />
        </Route>
      </Routes>
    </Router>
  )
}
