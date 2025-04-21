import React from 'react'
import { NavItem } from './NavItem'
import {
  HomeIcon,
  BookIcon,
  PenToolIcon,
  BookmarkIcon,
  UsersIcon,
  SettingsIcon,
} from 'lucide-react'
import './style/Drawer.css'

interface DrawerProps {
  isOpen: boolean
}
export function Drawer({ isOpen }: DrawerProps) {
  return (
    <aside className={`drawer ${isOpen ? 'drawer-open' : 'drawer-closed'}`}>
      {isOpen && (
        <>
          <div className="drawer-header">
            <h1  className="drawer-title">Library App</h1>
          </div>
          <nav className="drawer-nav">
            <ul className="nav-list">
              <NavItem
                icon={<HomeIcon size={18} />}
                label="Dashboard"
                isActive={true}
              />
              <NavItem icon={<BookIcon size={18} />} label="Books" />
              <NavItem icon={<PenToolIcon size={18} />} label="Authors" />
              <NavItem icon={<BookmarkIcon size={18} />} label="Categories" />
              <NavItem icon={<UsersIcon size={18} />} label="Users" />
              <NavItem icon={<SettingsIcon size={18} />} label="Admin" />
            </ul>
          </nav>
        </>
      )}
    </aside>
  )
}
