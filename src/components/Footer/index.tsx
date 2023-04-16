import Link from 'next/link'
import styles from './Footer.module.scss'

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.inner}>
          <Link
            href="https://next-portfolio-anji0114.vercel.app/about"
            target="_blank"
            className={styles.link}
          >
            開発者
          </Link>
          <Link
            href="https://github.com/anji0114/mind-prompt"
            target="_blank"
            className={styles.link}
          >
            GitHub
          </Link>
        </div>
      </div>
    </footer>
  )
}
