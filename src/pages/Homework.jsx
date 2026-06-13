import { useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { dateDiff } from '../utils/time'
import ReminderBanner from '../components/ReminderBanner'
import { Trash2, CheckCircle } from 'lucide-react'
import styles from './Homework.module.css'

const PRIO_COLOR = { high: 'var(--red)', med: 'var(--amber)', low: 'var(--green)' }

export default function Homework() {
  const [hw, setHw]       = useLocalStorage('ck_hw', [])
  const [filter, setFilter] = useState('pending')

  const [name,   setName]   = useState('')
  const [course, setCourse] = useState('')
  const [due,    setDue]    = useState('')
  const [prio,   setPrio]   = useState('med')
  const [type,   setType]   = useState('')
  const [err,    setErr]    = useState('')

  const hwReminders = hw.filter(h => !h.done && h.due).flatMap(h => {
    const d = dateDiff(h.due)
    if (d === 0) return [{ type: 'urgent', msg: `${h.name} due TODAY`,   sub: h.course }]
    if (d === 1) return [{ type: 'warn',   msg: `${h.name} due tomorrow`, sub: h.course }]
    if (d > 1 && d <= 3) return [{ type: 'soft', msg: `${h.name} in ${d} days`, sub: h.course }]
    return []
  })

  function addHW() {
    if (!name.trim()) { setErr('Assignment title is required.'); return }
    setErr('')
    setHw(prev => [...prev, { id: Date.now(), name: name.trim(), course: course.trim(), due, prio, type: type.trim(), done: false }])
    setName(''); setCourse(''); setDue(''); setPrio('med'); setType('')
  }

  function markDone(id) { setHw(prev => prev.map(h => h.id === id ? { ...h, done: true } : h)) }
  function del(id)      { setHw(prev => prev.filter(h => h.id !== id)) }

  const visible = (filter === 'pending' ? hw.filter(h => !h.done)
    : filter === 'done' ? hw.filter(h => h.done) : hw)
    .sort((a, b) => {
      if (!a.due) return 1; if (!b.due) return -1
      return a.due.localeCompare(b.due)
    })

  return (
    <div className={styles.page}>
      <ReminderBanner reminders={hwReminders} />

      <div className={styles.card}>
        <div className={styles.cardTitle}>Add assignment</div>
        <div className={styles.formGrid2}>
          <input value={name}   onChange={e => setName(e.target.value)}   placeholder="Assignment title" />
          <input value={course} onChange={e => setCourse(e.target.value)} placeholder="Course (optional)" />
        </div>
        <div className={styles.formGrid4}>
          <input type="date" value={due}  onChange={e => setDue(e.target.value)} />
          <select value={prio} onChange={e => setPrio(e.target.value)}>
            <option value="high">🔴 High</option>
            <option value="med">🟡 Medium</option>
            <option value="low">🟢 Low</option>
          </select>
          <input value={type} onChange={e => setType(e.target.value)} placeholder="Type (essay, quiz…)" />
          <button className={styles.addBtn} onClick={addHW}>+ Add</button>
        </div>
        {err && <div className={styles.err}>{err}</div>}
      </div>

      <div className={styles.filterTabs}>
        {['pending', 'done', 'all'].map(f => (
          <button key={f}
            className={`${styles.filterTab} ${filter === f ? styles.activeFilter : ''}`}
            onClick={() => setFilter(f)}
          >{f.charAt(0).toUpperCase() + f.slice(1)}</button>
        ))}
        <span className={styles.countLabel}>
          {hw.filter(h => !h.done).length} pending
        </span>
      </div>

      {visible.length === 0
        ? <Empty icon="📝" msg="Nothing here yet." />
        : (
          <div className={styles.card}>
            {visible.map(h => {
              const d = dateDiff(h.due)
              let dueText  = h.due || 'No due date'
              let dueColor = 'var(--muted)'
              if (d !== null) {
                if (d < 0)      { dueText = 'Overdue';       dueColor = 'var(--red)' }
                else if (d === 0) { dueText = 'Due today';   dueColor = 'var(--red)' }
                else if (d === 1) { dueText = 'Due tomorrow'; dueColor = 'var(--amber)' }
                else              { dueText = `Due ${h.due}` }
              }
              return (
                <div key={h.id} className={`${styles.hwRow} ${h.done ? styles.done : ''}`}>
                  <div className={styles.prioDot} style={{ background: PRIO_COLOR[h.prio] }} />
                  <div className={styles.hwInfo}>
                    <div className={styles.hwName}>{h.name}</div>
                    <div className={styles.hwMeta}>
                      {h.course && <span>{h.course}</span>}
                      {h.type   && <span> · {h.type}</span>}
                      {h.due    && <span style={{ color: dueColor }}> · {dueText}</span>}
                    </div>
                  </div>
                  <div className={styles.hwActions}>
                    {!h.done && (
                      <button className={styles.doneBtn} onClick={() => markDone(h.id)}>
                        <CheckCircle size={13} /> Done
                      </button>
                    )}
                    {h.done && <span className={styles.doneBadge}>✓ Done</span>}
                    <button className={styles.delBtn} onClick={() => del(h.id)}><Trash2 size={14} /></button>
                  </div>
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