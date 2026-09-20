import { Link } from 'react-router-dom'

const base =
  'inline-flex items-center justify-center rounded-lg font-semibold transition-colors'

const sizes = {
  md: 'px-4 py-2 text-[15px]',
  lg: 'px-6 py-3 text-base',
}

const variants = {
  primary: 'bg-cobalt text-white hover:bg-cobalt-deep',
  outline: 'border border-ink/20 text-ink hover:border-ink hover:bg-paper',
  accent: 'bg-marigold text-ink hover:bg-[#ffc933]',
}

// Pass `to` for in-app routes, `href` for anchors/external links, nothing for a <button>.
export default function Button({
  to,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...rest
}) {
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`
  if (to) return <Link to={to} className={cls} {...rest}>{children}</Link>
  if (href) return <a href={href} className={cls} {...rest}>{children}</a>
  return <button className={cls} {...rest}>{children}</button>
}
