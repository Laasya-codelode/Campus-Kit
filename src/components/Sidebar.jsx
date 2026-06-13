import styles from './Sidebar.module.css'
import { CheckSquare, Calendar, BookOpen, GraduationCap } from 'lucide-react'

const NAV = [
  { id: 'checklist', label: 'Checklists',   Icon: CheckSquare },
  { id: 'schedule',  label: 'Schedule',     Icon: Calendar    },
  { id: 'homework',  label: 'Assignments',  Icon: BookOpen    },
]

export default function Sidebar({ tab, setTab, reminderCount }) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <GraduationCap size={22} />
        <span>CampusKit</span>
      </div>
      <nav className={styles.nav}>
        {NAV.map(({ id, label, Icon }) => (
          <button key={id}
            className={`${styles.navItem} ${tab === id ? styles.active : ''}`}
            onClick={() => setTab(id)}
          >
            <Icon size={17} />
            <span>{label}</span>
            {id !== 'checklist' && reminderCount[id] > 0 && (
              <span className={styles.badge}>{reminderCount[id]}</span>
            )}
          </button>
        ))}
      </nav>
      <div className={styles.footer}>v0.1.0 MVP</div>
    </aside>
  )
}