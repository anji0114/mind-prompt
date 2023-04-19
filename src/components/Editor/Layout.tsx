import { FC, ReactNode } from 'react'
import { Header } from '../Header'

export const EditorLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen pb-10">
      <Header />
      <div className="pt-16">
        <div className="">{children}</div>
      </div>
    </div>
  )
}
