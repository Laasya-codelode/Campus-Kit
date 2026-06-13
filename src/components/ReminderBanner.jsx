import styles from './ReminderBanner.module.css'
import { Bell, AlertTriangle, Clock } from 'lucide-react'

export default function ReminderBanner({ reminders }) {
  if (!reminders.length) return null
  return (
    <div className={styles.wrap}>
      {reminders.map((r, i) => {
        const Icon = r.type === 'urgent' ? AlertTriangle : r.type === 'warn' ? Bell : Clock
        return (
          <div key={i} className={`${styles.strip} ${styles[r.type]}`}>
            <Icon size={15} />
            <div>
              <div className={styles.msg}>{r.msg}</div>
              {r.sub && <div className={styles.sub}>{r.sub}</div>}
            </div>
          </div>
        )
      })}
    </div>
  )
}