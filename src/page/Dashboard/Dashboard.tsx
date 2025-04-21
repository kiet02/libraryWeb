

import { Layout } from '../../component/Drawer/Layout'
import { Note } from '../../component/Note'
import './style/Dashboard.css'


type TDashBoard ={
  isDrawerOpen:boolean,
  setIsDrawerOpen:(value: boolean) => void
}


export function Dashboard() {
  
  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Dashboard</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <h2 className="stat-heading">Total Books</h2>
          <p className="stat-value">1,254</p>
        </div>
        <div className="stat-card">
          <h2 className="stat-heading">Total Authors</h2>
          <p className="stat-value">378</p>
        </div>
        <div className="stat-card">
          <h2 className="stat-heading">Categories</h2>
          <p className="stat-value">42</p>
        </div>
      </div>
      <div className="notes-section">
        <h2 className="notes-title">Recent Notes</h2>
        <div className="notes-grid">
          <Note
            title="Book Return Policy Update"
            content="Updated the return policy for borrowed books. Now allows 3-day grace period for all members."
            date="2 hours ago"
          />
          <Note
            title="New Author Submissions"
            content="Remember to review new author submissions in the queue by end of week."
            date="Yesterday"
          />
          <Note
            title="System Maintenance"
            content="Scheduled maintenance for library catalog system this weekend."
            date="2 days ago"
          />
          <Note
            title="Staff Meeting Notes"
            content="Discussed upcoming reading program and summer events planning."
            date="3 days ago"
          />
        </div>
      </div>
    </div>
  
  )
}
