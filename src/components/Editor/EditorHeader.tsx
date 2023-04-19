import Link from 'next/link'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import styles from './EiditorHeader.module.scss'
import { FC } from 'react'

export const EditorHeader: FC<{ onSubmit: void }> = ({ onSubmit }) => {
  return (
    <header>
      <Link href={'/dashboard'}>
        <ChevronLeftIcon />
        前に戻る
      </Link>
      <button onClick={() => onSubmit}>保存する</button>
    </header>
  )
}
