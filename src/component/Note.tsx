import React from 'react'
import { StickyNoteIcon } from 'lucide-react'
import './Note.css'

interface NoteProps {
  title: string
  content: string
  date: string
}

export function Note({ title, content, date }: NoteProps) {
  return (
    <div className="note-card">
      <div className="note-container">
        <div className="note-icon">
          <StickyNoteIcon size={18} className="icon" />
        </div>
        <div className="note-content">
          <h3 className="note-title">{title}</h3>
          <p className="note-text">{content}</p>
          <time className="note-date">{date}</time>
        </div>
      </div>
    </div>
  )
}
