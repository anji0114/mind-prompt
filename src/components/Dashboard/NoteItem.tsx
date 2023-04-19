import { FC, useState } from 'react'
import Link from 'next/link'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import { ListBulletIcon } from '@heroicons/react/24/solid'
import styles from '@/components/Dashboard/NoteItem.module.scss'

type Props = {
  id: string
  title: string
}

export const NoteItem: FC<Props> = ({ id, title }) => {
  const supabase = useSupabaseClient()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleDeleteNote = async (id: string) => {
    const { error } = await supabase.from('notes').delete().eq('id', id)
    if (error) {
      alert(error.message)
      return
    }

    router.reload()
  }

  return (
    <li className={styles.item}>
      <div className={styles.contents}>
        <p className={styles.date}>2022.01.01</p>
        <p className={styles.title}>
          <Link href={`note/${id}`}>{title}</Link>
        </p>
        <p className={styles.description}>
          インスピレーションを磨く、アイデアを育てるためのノートです。
        </p>
      </div>
      <div className={styles.menu}>
        <button
          className={`${styles.menuButton} ${
            menuOpen ? styles.isOpen : styles.isClose
          }`}
          onClick={() => setMenuOpen((prevState) => !prevState)}
        >
          <ListBulletIcon />
        </button>
        <ul
          className={`${styles.menuList} ${
            menuOpen ? styles.isOpen : styles.isClose
          }`}
        >
          <li className={styles.menuItem}>
            <Link href={`note/${id}`} className={styles.editButton}>
              編集する
            </Link>
          </li>
          <li className={styles.menuItem}>
            <button
              className={styles.deleteButton}
              onClick={() => handleDeleteNote(id)}
            >
              削除する
            </button>
          </li>
        </ul>
      </div>
    </li>
  )
}
