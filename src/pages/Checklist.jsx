import { useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { CHECKLISTS, YEARS, YEAR_COLORS } from '../utils/data'
import styles from './Checklist.module.css'

export default function Checklist() {
  const [year, setYear]     = useState('freshman')
  const [checks, setChecks] = useLocalStorage('ck_checks', {})
  const cats = CHECKLISTS[year]
  const col  = YEAR_COLORS[year]

  const total = cats.reduce((a, c) => a + c.items.length, 0)
  const done  = cats.reduce((a, c, ci) =>
    a + c.items.filter((_, ii) => checks[`${year}_${ci}_${ii}`]).length, 0)
  const pct = Math.round((done / total) * 100)

  function toggle(key) {
    setChecks(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className={styles.page}>
      <div className={styles.yearTabs}>
        {YEARS.map(y => {
          const c = YEAR_COLORS[y]
          return (
            <button
              key={y}
              className={`${styles.yearTab} ${year === y ? styles.activeTab : ''}`}
              style={year === y ? { background: c.dim, borderColor: c.border, color: c.accent } : {}}
              onClick={() => setYear(y)}
            >{y.charAt(0).toUpperCase() + y.slice(1)}</button>
          )
        })}
      </div>

      <div className={styles.progressCard} style={{ borderColor: col.border }}>
        <div className={styles.progressTop}>
          <span className={styles.progressLabel}>{year} Progress</span>
          <span className={styles.progressPct} style={{ color: col.accent }}>{pct}%</span>
        </div>
        <div className={styles.progressTrack}>
          <div className={styles.progressBar} style={{ width: `${pct}%`, background: col.accent }} />
        </div>
        <div className={styles.progressSub}>{done} of {total} items complete</div>
      </div>

      {cats.map((cat, ci) => {
        const catDone = cat.items.filter((_, ii) => checks[`${year}_${ci}_${ii}`]).length
        return (
          <div className={styles.card} key={ci}>
            <div className={styles.cardHeader}>
              <span className={styles.catTitle}>{cat.cat}</span>
              <span className={styles.catBadge}
                style={catDone === cat.items.length
                  ? { background: '#0D2B1E', color: 'var(--green)' }
                  : { background: col.dim, color: col.accent }}
              >{catDone}/{cat.items.length}</span>
            </div>
            {cat.items.map((item, ii) => {
              const key = `${year}_${ci}_${ii}`
              const checked = !!checks[key]
              return (
                <div key={ii}
                  className={`${styles.checkItem} ${checked ? styles.checked : ''}`}
                  onClick={() => toggle(key)}
                >
                  <div className={styles.checkbox}
                    style={checked
                      ? { background: col.accent, borderColor: col.accent }
                      : { borderColor: 'var(--border)' }}
                  >
                    {checked && (
                      <svg width="9" height="7" viewBox="0 0 9 7">
                        <polyline points="1,3.5 3.5,6 8,1" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
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