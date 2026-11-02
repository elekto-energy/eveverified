import localFont from 'next/font/local'
import '../../services/theme.css'

// Governed by app/stories/WEB_RELEASE_MODEL.md v1.10 section N.
// Uses the /services "Evidence" identity: the same self-hosted fonts and the
// same colour tokens (app/services/theme.css), scoped to this page only.

const sans = localFont({
  src: [{ path: '../../services/fonts/IBMPlexSans-latin-var.woff2', weight: '100 700', style: 'normal' }],
  variable: '--ev-font-sans',
  display: 'swap',
})

const mono = localFont({
  src: [
    { path: '../../services/fonts/IBMPlexMono-latin-400.woff2', weight: '400', style: 'normal' },
    { path: '../../services/fonts/IBMPlexMono-latin-500.woff2', weight: '500', style: 'normal' },
  ],
  variable: '--ev-font-mono',
  display: 'swap',
})

const serif = localFont({
  src: [{ path: '../../services/fonts/SourceSerif4-latin-var.woff2', weight: '200 900', style: 'normal' }],
  variable: '--ev-font-serif',
  display: 'swap',
})

const DEFAULT_THEME = 'evidence'

const applyStoredTheme = `(function(){try{var t=localStorage.getItem('ev-theme');if(t==='evidence'||t==='light'||t==='dark'){document.currentScript.parentElement.setAttribute('data-ev-theme',t)}}catch(e){}})()`

export default function WhatIsEveLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      data-ev-theme={DEFAULT_THEME}
      suppressHydrationWarning
      className={`${sans.variable} ${mono.variable} ${serif.variable}`}
    >
      <script dangerouslySetInnerHTML={{ __html: applyStoredTheme }} />
      {children}
    </div>
  )
}
