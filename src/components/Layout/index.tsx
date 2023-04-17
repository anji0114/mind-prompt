import React, { FC, ReactNode } from 'react'
import { Header } from '../Header'
import { Footer } from '../Footer'

import styles from './Layout.module.scss'

type Props = {
  children: ReactNode
}

export const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <div className={styles.wrap}>
        <div className={styles.container}>{children}</div>
      </div>
      <Footer />
    </>
  )
}
