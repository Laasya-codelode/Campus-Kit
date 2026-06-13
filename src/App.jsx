import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Checklist from './pages/Checklist'
import Schedule from './pages/Schedule'
import Homework from './pages/Homework'
import Toast from './components/Toast'
import { useLocalStorage } from './hooks/useLocalStorage'
import { todayName, nowMinutes, timeToMinutes, dateDiff } from './utils/time'
import styles from './App.module.css'

export default function App() {
  const [tab, setTab]     = useState('checklist')
  const [toast, setToast] = useState('')

  const [classes] = useLocalStorage('ck_classes', [])
  const [hw]      = useLocalStorage('ck_hw', [])
  const [, setTick] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 60_000)
    return () => clearInterval(id)
  }, [])

  const today  = todayName()
  const nowMin = nowMinutes()

  const scheduleReminders = classes.filter(c => {
    if (c.day !== today) return false
    const diff = timeToMinutes(c.start) - nowMin
    return diff > 0 && diff <= 180
  }).length

  const hwReminders = hw.filter(h => {
    if (h.done || !h.due) return false
    const d = dateDiff(h.due)
    return d !== null && d <= 3 && d >= 0
  }).length

  return (
    <div className={styles.layout}>
      <Sidebar
        tab={tab}
        setTab={setTab}
        reminderCount={{ schedule: scheduleReminders, homework: hwReminders }}
      />
      <main className={styles.main}>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>
            {tab === 'checklist' ? '📋 Checklists'
              : tab === 'schedule' ? '🗓 Schedule'
              : '📝 Assignments'}
          </h1>
          <span className={styles.dateLabel}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </span>
        </div>

        {tab === 'checklist' && <Checklist />}
        {tab === 'schedule'  && <Schedule  />}
        {tab === 'homework'  && <Homework  />}
      </main>
      <Toast message={toast} onDone={() => setToast('')} />
    </div>
  )
}