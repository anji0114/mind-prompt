import Link from 'next/link'
import {
  DocumentTextIcon,
  CommandLineIcon,
  Cog8ToothIcon,
} from '@heroicons/react/24/outline'
import styles from '@/components/Dashboard/Nav/DashboardNav.module.scss'

export const DashboardSidebar = () => {
  return (
    <nav>
      <ul className={styles.list}>
        <li className={styles.item}>
          <Link href="/dashboard" className={styles.link}>
            <DocumentTextIcon />
            <span>ノート</span>
          </Link>
        </li>
        <li className={styles.item}>
          <Link href="/dashboard" className={styles.link}>
            <CommandLineIcon />
            <span>プロンプト</span>
          </Link>
        </li>
        <li className={styles.item}>
          <Link href="/dashboard" className={styles.link}>
            <Cog8ToothIcon />
            <span>設定</span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
