import { FC, ReactNode } from 'react'
import { Header } from '../Header'
import { Footer } from '../Footer'

type Props = {
  children: ReactNode
  title: 'ログイン' | 'サインアップ'
}

export const AuthLayout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <Header />
      <div className="max-w-[1140px] w-full mx-auto px-7">
        <div className="flex items-center justify-center py-20 min-h-[calc(100vh_-_150px)]">
          <div className="max-w-[350px] w-full">
            <h2 className="text-center text-xl font-medium">{title}</h2>
            {children}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
