import React from 'react'
import { Outlet } from 'react-router-dom'
import { Drawer } from './Drawer'
import { MenuIcon, XIcon } from 'lucide-react'
import './style/Layout.css'

interface LayoutProps {
  isDrawerOpen: boolean
  setIsDrawerOpen: (isOpen: boolean) => void
}

export function Layout({
  isDrawerOpen,
  setIsDrawerOpen,
}: LayoutProps) {
  return (
    <div className="layout">
      <Drawer isOpen={isDrawerOpen} />
      <div className="content">
        <header className="header">
          <button
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            className="menu-button"
          >
            {isDrawerOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
          </button>
          {!isDrawerOpen && <h1 className="app-title">Library App</h1>}
        </header>
        <main className="main-content">
          <Outlet /> {/* Đây là nơi các page con sẽ render */}
        </main>
      </div>
    </div>
  )
}
