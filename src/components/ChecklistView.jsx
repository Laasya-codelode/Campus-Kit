import { useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { CHECKLIST, YEAR_META } from '../utils/checklistData'
import styles from './ChecklistView.module.css'

const YEARS = ['freshman', 'sophomore', 'junior', 'senior']

export default function ChecklistView() {
  const [year, setYear] = useState('freshman')
  const [checks, setChecks] = useLocalStorage('ck_checks', {})

  function toggle(key) {
    setChecks(c => ({ ...c, [key]: !c[key] }))
  }

  const cats = CHECKLIST[year]
  const meta = YEAR_META[year]
  const totalItems = cats.reduce((a, c) => a + c.items.length, 0)
  const doneItems  = cats.reduce((a, c, ci) =>
    a + c.items.filter((_, ii) => checks[`${year}_${ci}_${ii}`]).length, 0)
  const pct = Math.round((doneItems / totalItems) * 100)

  return (
    <div className={styles.view}>
      {/* Year tabs */}
      <div className={styles.yearTabs}>
        {YEARS.map(y => {
          const m = YEAR_META[y]
          return (
            <button
              key={y}
              className={`${styles.yearTab} ${year === y ? styles.activeYear : ''}`}
              style={{ '--accent': m.color }}
              onClick={() => setYear(y)}
            >
              <span>{m.emoji}</span>
              <span>{m.label}</span>
            </button>
          )
        })}
      </div>

      {/* Progress card */}
      <div className={styles.progressCard} style={{ '--accent': meta.color }}>
        <div className={styles.progressTop}>
          <span className={styles.progressLabel}>{meta.label} checklist</span>
          <span className={styles.progressPct}>{pct}%</span>
        </div>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${pct}%`, background: meta.color }} />
        </div>
        <div className={styles.progressSub}>{doneItems} of {totalItems} items complete</div>
      </div>

      {/* Category cards */}
      {cats.map((cat, ci) => {
        const catDone  = cat.items.filter((_, ii) => checks[`${year}_${ci}_${ii}`]).length
        const catTotal = cat.items.length
        return (
          <div key={ci} className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.cardTitle}>
                <span className={styles.catIcon}>{cat.icon}</span>
                {cat.cat}
              </span>
              <span
                className={styles.catBadge}
                style={{
                  background: catDone === catTotal ? 'var(--green-dim)' : 'var(--bg-hover)',
                  color: catDone === catTotal ? 'var(--green)' : 'var(--text-muted)',
                }}
              >
                {catDone}/{catTotal}
              </span>
            </div>

            {cat.items.map((item, ii) => {
              const key  = `${year}_${ci}_${ii}`
              const done = !!checks[key]
              return (
                <div
                  key={ii}
                  className={`${styles.item} ${done ? styles.done : ''}`}
                  onClick={() => toggle(key)}
                  role="checkbox"
                  aria-checked={done}
                  tabIndex={0}
                  onKeyDown={e => e.key === ' ' && toggle(key)}
                >
                  <div
                    className={styles.checkbox}
                    style={{ borderColor: done ? meta.color : 'var(--border)', background: done ? meta.color : 'transparent' }}
                  >
                    {done && <span className={styles.checkmark}>✓</span>}
                  </div>
                  <span className={styles.itemLabel}>{item}</span>
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
