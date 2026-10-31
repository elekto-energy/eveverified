import localFont from 'next/font/local'

// Governed by app/stories/WEB_RELEASE_MODEL.md v1.5 section I.
// Scoped to /services and its sub-routes only. These fonts are exposed as CSS
// variables (--ev-font-*) on a wrapper element and are applied only by
// elements inside the services pages. html, body, global CSS, the Tailwind
// theme and the shared Navigation/Footer components are not changed.
//
// Self-hosted (latin subset, woff2) so the build does not depend on the Google
// Fonts service: next/font/google failed on the Vercel build of 9fed090 while
// parsing a Google font URL. Licence: SIL Open Font License 1.1, see
// app/services/fonts/OFL-NOTICE.txt.

const sans = localFont({
  src: [{ path: './fonts/IBMPlexSans-latin-var.woff2', weight: '100 700', style: 'normal' }],
  variable: '--ev-font-sans',
  display: 'swap',
})

const mono = localFont({
  src: [
    { path: './fonts/IBMPlexMono-latin-400.woff2', weight: '400', style: 'normal' },
    { path: './fonts/IBMPlexMono-latin-500.woff2', weight: '500', style: 'normal' },
  ],
  variable: '--ev-font-mono',
  display: 'swap',
})

const serif = localFont({
  src: [{ path: './fonts/SourceSerif4-latin-var.woff2', weight: '200 900', style: 'normal' }],
  variable: '--ev-font-serif',
  display: 'swap',
})

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${sans.variable} ${mono.variable} ${serif.variable}`}>{children}</div>
}
