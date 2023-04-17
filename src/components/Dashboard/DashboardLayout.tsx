import { FC, ReactNode } from 'react'
import { DashboardSidebar } from './Nav'
import styles from '@/components/Dashboard/DashboardLayout.module.scss'

type Props = {
  children: ReactNode
}

export const DashBoardLayout: FC<Props> = ({ children }) => {
  return (
    <div className={styles.grid}>
      <aside className={styles.aside}>
        <DashboardSidebar />
      </aside>
      <main className={styles.main}>{children}</main>
    </div>
  )
}
