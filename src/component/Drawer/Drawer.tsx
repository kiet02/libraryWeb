import React from "react";
import { NavItem } from "./NavItem";
import {
  HomeIcon,
  BookIcon,
  PenToolIcon,
  BookmarkIcon,
  UsersIcon,
  SettingsIcon,
} from "lucide-react";
import "./style/Drawer.css";
import { useLocation } from "react-router-dom";

interface DrawerProps {
  isOpen: boolean;
}
export function Drawer({ isOpen }: DrawerProps) {
  const location = useLocation();

  return (
    <aside className={`drawer ${isOpen ? "drawer-open" : "drawer-closed"}`}>
      {isOpen && (
        <>
          <div className="drawer-header">
            <h1 className="drawer-title">Library App</h1>
          </div>
          <nav className="drawer-nav">
            <ul className="nav-list">
              {/* <NavItem
                icon={<HomeIcon size={18} />}
                label="Dashboard"
                to="/dashboard"
                isActive={location.pathname === "/dashboard"}
              /> */}
              <NavItem
                icon={<BookIcon size={18} />}
                label="Books"
                to="/books"
                isActive={location.pathname === "/books"}
              />
              <NavItem
                icon={<PenToolIcon size={18} />}
                label="Authors"
                to="/authors"
                isActive={location.pathname === "/authors"}
              />

              <NavItem
                icon={<BookmarkIcon size={18} />}
                label="Categories"
                to="/categories"
                isActive={location.pathname === "/categories"}
              />

              <NavItem
                icon={<UsersIcon size={18} />}
                label="Users"
                to="/users"
                isActive={location.pathname === "/users"}
              />
            </ul>
          </nav>
        </>
      )}
    </aside>
  );
}
