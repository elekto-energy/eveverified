import { Metadata } from 'next'
import TprmClient from './TprmClient'

export const metadata: Metadata = {
  title: 'TPRM Vendor Evidence Assessment | EVE Verified',
  description:
    'Send vendor evidence. EVE runs a deterministic review — no AI in the matching path — and returns a sealed, cryptographically verifiable workpaper showing what is supported, what is partial, and what is missing. Fixed price, fixed lead time. Not an audit, not a certification.',
}

export default function Page() {
  return <TprmClient />
}
