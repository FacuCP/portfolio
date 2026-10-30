import { SITE_NAME } from '../siteConfig'

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        © {new Date().getFullYear()} {SITE_NAME}
      </div>
    </footer>
  )
}
