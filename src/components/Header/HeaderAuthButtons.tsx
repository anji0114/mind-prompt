import Link from 'next/link'
import styles from './Header.module.scss'

export const HeaderAuthButtons = () => {
  return (
    <>
      <Link
        href="/auth/login"
        className="text-sm font-medium underline-offset-2 hover:underline"
      >
        ログイン
      </Link>
      <Link
        href="/auth/signup"
        className="text-sm font-medium inline-block ml-5 py-2.5 px-6 bg-[#222] text-white rounded hover:bg-[#555]"
      >
        サインアップ
      </Link>
    </>
  )
}
