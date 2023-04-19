import React, { FC, ReactNode } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

type Props = {
  children: ReactNode
}

export const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <div className="py-24">
        <div className="max-w-[1140px] w-full mx-auto px-7">{children}</div>
      </div>
      <Footer />
    </>
  )
}
