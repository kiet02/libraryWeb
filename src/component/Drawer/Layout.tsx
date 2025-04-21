import React from 'react'
import { Drawer } from './Drawer'
import { MenuIcon, XIcon } from 'lucide-react'
import './style/Layout.css'

interface LayoutProps {
  children: React.ReactNode
  isDrawerOpen: boolean
  setIsDrawerOpen: (isOpen: boolean) => void
}

export function Layout({
  children,
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
          {!isDrawerOpen && (
            <h1 className="app-title">Library App</h1>
          )}
        </header>
        <main className="main-content">{children}</main>
      </div>
    </div>
  )
}
