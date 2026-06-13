export const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']

export function todayName() {
  const idx = new Date().getDay() // 0 = Sunday
  return DAYS[idx === 0 ? 6 : idx - 1]
}

export function nowMinutes() {
  const d = new Date()
  return d.getHours() * 60 + d.getMinutes()
}

/** Returns days until a YYYY-MM-DD date string. Negative = overdue. */
export function daysDiff(dateStr) {
  if (!dateStr) return null
  const due = new Date(dateStr + 'T00:00:00')
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return Math.round((due - today) / 86400000)
}

export function formatTime(t) {
  if (!t) return ''
  const [h, m] = t.split(':').map(Number)
  const ampm = h >= 12 ? 'PM' : 'AM'
  const hh = h % 12 || 12
  return `${hh}:${m.toString().padStart(2, '0')} ${ampm}`
}

export function dueLabelAndColor(dateStr) {
  const d = daysDiff(dateStr)
  if (d === null) return { label: 'No due date', color: 'var(--text-muted)' }
  if (d < 0)  return { label: `${Math.abs(d)}d overdue`, color: 'var(--red)' }
  if (d === 0) return { label: 'Due today', color: 'var(--red)' }
  if (d === 1) return { label: 'Due tomorrow', color: 'var(--amber)' }
  return { label: `Due ${dateStr}`, color: 'var(--text-secondary)' }
}
