PS D:\EVE11> Get-FileHash .\agents\eve_grc_agent\ado_runtime_track\runtime_demo\public-evidence-page\PUBLIC_EVIDENCE_COMMITMENTS.md,.\Projects\003_determinism_se\app\stories\PROVIDER_BACKED_STORY_MODEL.md,.\Projects\003_determinism_se\app\stories\WEB_RELEASE_MODEL.md -Algorithm SHA256 | Select-Object Hash,Path

Hash                                                             Path
----                                                             ----
EB49434F3640E8E4DF2C7B0C106D81C27A7C22C91220588884B1EAFDD4AC0219 D:\EVE11\agents\eve_grc_agent\ado_runtime_track\run...
C293FB6FAC0F483B0A37659111A074C45EF8196C5DE08034A70380EB3A36FF5B D:\EVE11\Projects\003_determinism_se\app\stories\PR...
752BA0A51191E7640DEC0FA7BA1629AF50B4F44F5ADA877BFD8A27A3110DF2BA D:\EVE11\Projects\003_determinism_se\app\stories\WE...


PS D:\EVE11> cd D:\EVE11\Projects\003_determinism_se
PS D:\EVE11\Projects\003_determinism_se> npm run build

> eveverified@1.0.0 build
> next build

  ▲ Next.js 14.2.35
  - Environments: .env.local, .env.production

   Creating an optimized production build ...
Browserslist: browsers data (caniuse-lite) is 8 months old. Please run:
  npx update-browserslist-db@latest
  Why you should do it regularly: https://github.com/browserslist/update-db#readme
Browserslist: caniuse-lite is outdated. Please run:
  npx update-browserslist-db@latest
  Why you should do it regularly: https://github.com/browserslist/update-db#readme
 ✓ Compiled successfully
 ✓ Linting and checking validity of types
 ✓ Collecting page data
   Generating static pages (0/37)  [    ] ⚠ metadataBase property in metadata export is not set for resolving social open graph or twitter images, using "http://localhost:3000". See https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase
 ⚠ metadataBase property in metadata export is not set for resolving social open graph or twitter images, using "http://localhost:3000". See https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase
 ⚠ metadataBase property in metadata export is not set for resolving social open graph or twitter images, using "http://localhost:3000". See https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase
 ⚠ metadataBase property in metadata export is not set for resolving social open graph or twitter images, using "http://localhost:3000". See https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase
 ⚠ metadataBase property in metadata export is not set for resolving social open graph or twitter images, using "http://localhost:3000". See https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase
 ⚠ metadataBase property in metadata export is not set for resolving social open graph or twitter images, using "http://localhost:3000". See https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase
 ⚠ metadataBase property in metadata export is not set for resolving social open graph or twitter images, using "http://localhost:3000". See https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase
 ⚠ metadataBase property in metadata export is not set for resolving social open graph or twitter images, using "http://localhost:3000". See https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase
 ⚠ metadataBase property in metadata export is not set for resolving social open graph or twitter images, using "http://localhost:3000". See https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase
 ⚠ metadataBase property in metadata export is not set for resolving social open graph or twitter images, using "http://localhost:3000". See https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase
 ⚠ metadataBase property in metadata export is not set for resolving social open graph or twitter images, using "http://localhost:3000". See https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase
 ⚠ metadataBase property in metadata export is not set for resolving social open graph or twitter images, using "http://localhost:3000". See https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase
 ⚠ metadataBase property in metadata export is not set for resolving social open graph or twitter images, using "http://localhost:3000". See https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase
 ⚠ metadataBase property in metadata export is not set for resolving social open graph or twitter images, using "http://localhost:3000". See https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase
 ⚠ metadataBase property in metadata export is not set for resolving social open graph or twitter images, using "http://localhost:3000". See https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase
 ⚠ metadataBase property in metadata export is not set for resolving social open graph or twitter images, using "http://localhost:3000". See https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase
 ⚠ metadataBase property in metadata export is not set for resolving social open graph or twitter images, using "http://localhost:3000". See https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase
 ⚠ metadataBase property in metadata export is not set for resolving social open graph or twitter images, using "http://localhost:3000". See https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase
 ⚠ metadataBase property in metadata export is not set for resolving social open graph or twitter images, using "http://localhost:3000". See https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase
 ⚠ metadataBase property in metadata export is not set for resolving social open graph or twitter images, using "http://localhost:3000". See https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase
   Generating static pages (21/37)  [=   ] ⚠ metadataBase property in metadata export is not set for resolving social open graph or twitter images, using "http://localhost:3000". See https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase
 ⚠ metadataBase property in metadata export is not set for resolving social open graph or twitter images, using "http://localhost:3000". See https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase
 ✓ Generating static pages (37/37)
 ✓ Collecting build traces
 ✓ Finalizing page optimization

Route (app)                                          Size     First Load JS
┌ ○ /                                                5.63 kB         135 kB
├ ○ /_not-found                                      872 B          88.2 kB
├ ○ /about                                           142 B          87.5 kB
├ ○ /about/company                                   1.61 kB         128 kB
├ ○ /about/determinism                               1.61 kB         128 kB
├ ○ /about/eve-control-room                          2.8 kB          130 kB
├ ○ /about/what-is-eve                               1.61 kB         128 kB
├ ƒ /api/contact                                     0 B                0 B
├ ƒ /api/eve/control-chain                           0 B                0 B
├ ƒ /api/eve/control-chain/agv/health                0 B                0 B
├ ƒ /api/eve/control-chain/agv/session               0 B                0 B
├ ƒ /api/eve/control-chain/agv/session/[id]/seal     0 B                0 B
├ ƒ /api/eve/control-chain/agv/session/[id]/step     0 B                0 B
├ ƒ /api/eve/control-chain/energy/health             0 B                0 B
├ ƒ /api/eve/control-chain/energy/session            0 B                0 B
├ ƒ /api/eve/control-chain/energy/session/[id]/seal  0 B                0 B
├ ƒ /api/eve/control-chain/energy/session/[id]/step  0 B                0 B
├ ƒ /api/pilot                                       0 B                0 B
├ ○ /ask                                             2.1 kB          139 kB
├ ○ /ask/legal                                       2.25 kB         139 kB
├ ○ /ask/legal/healthcare                            3.96 kB         133 kB
├ ○ /ask/legal/journalism                            3.99 kB         133 kB
├ ○ /contact                                         1.87 kB        89.2 kB
├ ○ /control-chain                                   4.47 kB         131 kB
├ ○ /control-chain/agv                               11 kB           138 kB
├ ○ /control-chain/energy                            7.65 kB         134 kB
├ ○ /elekto                                          1.61 kB         128 kB
├ ○ /elekto-x                                        1.61 kB         128 kB
├ ○ /eve                                             13.8 kB         141 kB
├ ○ /eve-verified                                    4.9 kB          132 kB
├ ○ /insights                                        195 B           137 kB
├ ○ /insights/accountability-continuity-checkpoint   7.38 kB         134 kB
├ ○ /insights/ai-act-proof-v1                        12.7 kB         139 kB
├ ○ /iso42001/chain-scanner                          6.35 kB         133 kB
├ ○ /medical                                         56.6 kB         180 kB
├ ○ /origin                                          5.32 kB         132 kB
├ ○ /philosophy                                      193 B           130 kB
├ ○ /pilot                                           4.83 kB         132 kB
├ ○ /robots.txt                                      0 B                0 B
├ ○ /sitemap.xml                                     0 B                0 B
├ ○ /solutions/tprm                                  12.3 kB         139 kB
├ ○ /stories                                         142 B          87.5 kB
├ ○ /stories/accountability                          8.47 kB         135 kB
└ ○ /stories/provider-backed                         6.28 kB         133 kB
+ First Load JS shared by all                        87.3 kB
  ├ chunks/117-648129468f8bcd07.js                   31.7 kB
  ├ chunks/fd9d1056-ea949d58b73d551c.js              53.6 kB
  └ other shared chunks (total)                      1.95 kB


○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand

PS D:\EVE11\Projects\003_determinism_se> npm run lint

> eveverified@1.0.0 lint
> next lint

? How would you like to configure ESLint? https://nextjs.org/docs/basic-features/eslint
❯  Strict (recommended)
   Base
   Cancel
