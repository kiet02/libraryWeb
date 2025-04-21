import React from 'react'
import './style/NavItem.css'

interface NavItemProps {
  icon: React.ReactNode
  label: string
  isActive?: boolean
}

export function NavItem({ icon, label, isActive = false }: NavItemProps) {
  return (
    <li>
      <a
        href="#"
        className={`nav-link ${isActive ? 'active' : ''}`}
      >
        <span className="nav-icon">{icon}</span>
        <span className="nav-label">{label}</span>
      </a>
    </li>
  )
}
