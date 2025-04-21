import React from 'react'
import './style/NavItem.css'
import { Link } from 'react-router-dom'

interface NavItemProps {
  icon: React.ReactNode
  label: string
  isActive?: boolean
  to: string
}

export function NavItem({ icon, label, to, isActive = false }: NavItemProps) {
  return (
    <li>
      <Link to={to} className={`nav-link ${isActive ? 'active' : ''}`}>
        <span className="nav-icon">{icon}</span>
        <span className="nav-label">{label}</span>
      </Link>
    </li>
  )
}
