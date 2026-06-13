import { useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { DAYS, todayName, nowMinutes, formatTime } from '../utils/dateUtils'
import ReminderBanner from './ReminderBanner'
import styles from './ScheduleView.module.css'

export default function ScheduleView() {
  const [classes, setClasses] = useLocalStorage('ck_classes', [])
  const [dayFilter, setDayFilter] = useState('all')

  const [name, setName]   = useState('')
  const [loc, setLoc]     = useState('')
  const [start, setStart] = useState('')
  const [end, setEnd]     = useState('')
  const [day, setDay]     = useState('')
  const [error, setError] = useState('')

  const today  = todayName()
  const nowMin = nowMinutes()

  // Reminders
  const reminders = classes
    .filter(c => c.day === today)
    .flatMap(c => {
      const [sh, sm] = c.start.split(':').map(Number)
      const diff = sh * 60 + sm - nowMin
      if (diff > 0 && diff <= 60)  return [{ level: 'urgent', msg: `${c.name} in ${diff} min`, sub: `${c.loc || '—'} · ${formatTime(c.start)}–${formatTime(c.end)}` }]
      if (diff > 0 && diff <= 120) return [{ level: 'soft',   msg: `${c.name} coming up in ${diff} min`, sub: formatTime(c.start) }]
      if (diff > -90 && diff <= 0) return [{ level: 'warn',   msg: `${c.name} is happening now`, sub: `${c.loc || '—'} · ends ${formatTime(c.end)}` }]
      return []
    })

  function addClass() {
    if (!name.trim() || !start || !day) { setError('Name, start time, and day are required.'); return }
    setClasses(c => [...c, { id: Date.now(), name: name.trim(), loc: loc.trim(), start, end, day }])
    setName(''); setLoc(''); setStart(''); setEnd(''); setDay(''); setError('')
  }

  function delClass(id) { setClasses(c => c.filter(x => x.id !== id)) }

  const filtered = (dayFilter === 'all' ? classes : classes.filter(c => c.day === dayFilter))
    .slice().sort((a, b) => {
      const dayOrder = d => DAYS.indexOf(d)
      if (dayFilter === 'all' && a.day !== b.day) return dayOrder(a.day) - dayOrder(b.day)
      return a.start.localeCompare(b.start)
    })

  return (
    <div className={styles.view}>
      <ReminderBanner reminders={reminders} />

      {/* Add class form */}
      <div className={styles.card}>
        <div className={styles.cardTitle}>Add a class</div>
        {error && <div className={styles.error}>{error}</div>}
        <div className={styles.formGrid2}>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Subject name" />
          <input value={loc}  onChange={e => setLoc(e.target.value)}  placeholder="Room / location (optional)" />
        </div>
        <div className={styles.formGrid4}>
          <input type="time" value={start} onChange={e => setStart(e.target.value)} />
          <input type="time" value={end}   onChange={e => setEnd(e.target.value)} placeholder="End time" />
          <select value={day} onChange={e => setDay(e.target.value)}>
            <option value="">Select day</option>
            {DAYS.map(d => <option key={d}>{d}</option>)}
          </select>
          <button className={styles.addBtn} onClick={addClass}>+ Add class</button>
        </div>
      </div>

      {/* Day filter */}
      <div className={styles.dayFilter}>
        {['all', ...DAYS].map(d => (
          <button
            key={d}
            className={`${styles.dayPill} ${dayFilter === d ? styles.activePill : ''}`}
            onClick={() => setDayFilter(d)}
          >
            {d === 'all' ? 'All' : d.slice(0, 3)}
            {d !== 'all' && d === today && <span className={styles.todayDot} />}
          </button>
        ))}
      </div>

      {/* Class list */}
      <div className={styles.card}>
        {filtered.length === 0 ? (
          <div className={styles.empty}>
            <span>🗓</span>
            <span>No classes yet — add one above.</span>
          </div>
        ) : (
          filtered.map(c => {
            const [sh, sm] = c.start.split(':').map(Number)
            const diff = sh * 60 + sm - nowMin
            const isNow  = c.day === today && diff > -90 && diff <= 0
            const isSoon = c.day === today && diff > 0 && diff <= 60
            return (
              <div key={c.id} className={`${styles.classRow} ${isNow ? styles.nowRow : isSoon ? styles.soonRow : ''}`}>
                <div className={`${styles.stripe} ${isNow ? styles.stripeGreen : isSoon ? styles.stripeAmber : styles.stripeDim}`} />
                <div className={styles.classInfo}>
                  <div className={styles.className}>{c.name}</div>
                  <div className={styles.classMeta}>
                    📍 {c.loc || '—'} · {c.day} · {formatTime(c.start)}{c.end ? `–${formatTime(c.end)}` : ''}
                  </div>
                </div>
                {isNow  && <span className={styles.pillGreen}>Now</span>}
                {isSoon && <span className={styles.pillAmber}>{diff}m</span>}
                <button className={styles.delBtn} onClick={() => delClass(c.id)} aria-label="Remove class">✕</button>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
