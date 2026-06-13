import { useState, useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { DAYS } from '../utils/data'
import { todayName, nowMinutes, timeToMinutes, formatTime } from '../utils/time'
import ReminderBanner from '../components/ReminderBanner'
import { Trash2, MapPin } from 'lucide-react'
import styles from './Schedule.module.css'

export default function Schedule() {
  const [classes, setClasses] = useLocalStorage('ck_classes', [])
  const [dayFilter, setDayFilter] = useState('all')
  const [tick, setTick] = useState(0)

  // form state
  const [name, setName]   = useState('')
  const [loc,  setLoc]    = useState('')
  const [start, setStart] = useState('')
  const [end,   setEnd]   = useState('')
  const [day,   setDay]   = useState('')
  const [err,   setErr]   = useState('')

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 60_000)
    return () => clearInterval(id)
  }, [])

  const today  = todayName()
  const nowMin = nowMinutes()

  const classReminders = classes
    .filter(c => c.day === today)
    .flatMap(c => {
      const diff = timeToMinutes(c.start) - nowMin
      if (diff > 0 && diff <= 30)  return [{ type: 'urgent', msg: `${c.name} starts in ${diff} min`, sub: `${c.loc || '—'} · ${formatTime(c.start)}` }]
      if (diff > 0 && diff <= 90)  return [{ type: 'warn',   msg: `${c.name} in ${diff} min`,        sub: `${c.loc || '—'} · ${formatTime(c.start)}` }]
      if (diff > 0 && diff <= 180) return [{ type: 'soft',   msg: `${c.name} coming up`,             sub: `${formatTime(c.start)} — ${diff} min away` }]
      return []
    })

  function addClass() {
    if (!name.trim() || !start || !day) { setErr('Name, start time, and day are required.'); return }
    setErr('')
    setClasses(prev => [...prev, { id: Date.now(), name: name.trim(), loc: loc.trim(), start, end, day }])
    setName(''); setLoc(''); setStart(''); setEnd(''); setDay('')
  }

  function delClass(id) { setClasses(prev => prev.filter(c => c.id !== id)) }

  const filtered = (dayFilter === 'all' ? classes : classes.filter(c => c.day === dayFilter))
    .sort((a, b) => a.start.localeCompare(b.start))

  return (
    <div className={styles.page}>
      <ReminderBanner reminders={classReminders} />

      <div className={styles.card}>
        <div className={styles.cardTitle}>Add a class</div>
        <div className={styles.formGrid2}>
          <input value={name}  onChange={e => setName(e.target.value)}  placeholder="Subject name" />
          <input value={loc}   onChange={e => setLoc(e.target.value)}   placeholder="Room / location (optional)" />
        </div>
        <div className={styles.formGrid4}>
          <input type="time" value={start} onChange={e => setStart(e.target.value)} />
          <input type="time" value={end}   onChange={e => setEnd(e.target.value)}   />
          <select value={day} onChange={e => setDay(e.target.value)}>
            <option value="">Day</option>
            {DAYS.map(d => <option key={d}>{d}</option>)}
          </select>
          <button className={styles.addBtn} onClick={addClass}>+ Add</button>
        </div>
        {err && <div className={styles.err}>{err}</div>}
      </div>

      <div className={styles.dayFilter}>
        {['all', ...DAYS].map(d => (
          <button
            key={d}
            className={`${styles.dayPill} ${dayFilter === d ? styles.activePill : ''}`}
            onClick={() => setDayFilter(d)}
          >{d === 'all' ? 'All' : d.slice(0, 3)}</button>
        ))}
      </div>

      {filtered.length === 0
        ? <Empty icon="📅" msg="No classes yet — add one above." />
        : (
          <div className={styles.card}>
            {filtered.map(c => {
              const diff  = timeToMinutes(c.start) - nowMin
              const isNow  = c.day === today && diff > -90 && diff <= 0
              const isSoon = c.day === today && diff > 0   && diff <= 30
              return (
                <div key={c.id} className={styles.classRow}
                  style={isNow ? { background: '#0D221A' } : isSoon ? { background: '#1F1C0D' } : {}}>
                  <div className={styles.accent}
                    style={{ background: isNow ? 'var(--green)' : isSoon ? 'var(--amber)' : 'var(--border)' }} />
                  <div className={styles.classInfo}>
                    <div className={styles.className}>{c.name}</div>
                    <div className={styles.classMeta}>
                      <MapPin size={11} />
                      {c.loc || '—'} · {c.day} · {formatTime(c.start)}{c.end ? ` – ${formatTime(c.end)}` : ''}
                    </div>
                  </div>
                  {isNow  && <span className={styles.pill} style={{ background:'#0D2B1E', color:'var(--green)' }}>Now</span>}
                  {isSoon && <span className={styles.pill} style={{ background:'#231E0E', color:'var(--amber)' }}>{diff}m</span>}
                  <button className={styles.delBtn} onClick={() => delClass(c.id)}><Trash2 size={14} /></button>
                </div>
              )
            })}
          </div>
        )
      }
    </div>
  )
}

function Empty({ icon, msg }) {
  return (
    <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--muted2)' }}>
      <div style={{ fontSize: 36, marginBottom: 8 }}>{icon}</div>
      <div style={{ fontSize: 13 }}>{msg}</div>
    </div>
  )
}