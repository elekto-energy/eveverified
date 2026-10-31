import { IBM_Plex_Mono, IBM_Plex_Sans, Source_Serif_4 } from 'next/font/google'

// Governed by app/stories/WEB_RELEASE_MODEL.md v1.5 section I.
// Scoped to /services and its sub-routes only. These fonts are exposed as CSS
// variables (--ev-font-*) on a wrapper element and are applied only by
// elements inside the services pages. html, body, global CSS, the Tailwind
// theme and the shared Navigation/Footer components are not changed.

const sans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--ev-font-sans',
  display: 'swap',
})

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--ev-font-mono',
  display: 'swap',
})

const serif = Source_Serif_4({
  subsets: ['latin'],
  axes: ['opsz'],
  variable: '--ev-font-serif',
  display: 'swap',
})

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${sans.variable} ${mono.variable} ${serif.variable}`}>{children}</div>
}
