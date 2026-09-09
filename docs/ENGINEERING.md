# URDesigner implementation architecture

## Product contract

The studio must remain useful with no AI connection. AI is an optional assistant with explicit provider consent and no privileged execution path. The canonical design document is the source of truth; 2D and 3D consume it. All account-owned server records enforce ownership independent of client identifiers.

The initial audience is aspiring designers, independent creators and learners exploring concepts. Tailors can record notes but cannot rely on beta templates for production. The primary journey is choose silhouette → set material → add artwork → inspect both sides → save → export. The AI journey is connect/test provider → ask or request a supported edit → inspect suggestion → apply or dismiss → undo if necessary.

## Modules

- `app/studio.tsx`: working surface, cloud project navigation, editor inspector, AI Hub, chat, Academy, export/import, account and maker dialogs.
- `app/design-canvas.tsx`: Fabric.js interaction lifecycle, freehand drawing and selected object synchronization.
- `app/garment-view.tsx`: browser-only WebGL mesh construction, materials, orbit camera, picking and export.
- `lib/urdesigner/model.ts`: strict versioned Zod document schema, visual garment geometry, texture painting and proposal validation.
- `lib/urdesigner/canvas.ts`: canonical layers ↔ Fabric object mapping and texture composition.
- `lib/urdesigner/server.ts`: authenticated D1/R2 API, quotas, optimistic project writes, asset validation, provider vault and AI orchestration.
- `lib/urdesigner/ai.ts`, `providers.ts`, `vault.ts`: provider protocol adapters, approved destinations and authenticated encryption.
- `app/chatgpt-auth.ts`: isolated identity adapter for the managed deployment.
- `db/schema.ts`, `drizzle/`: persistent schema and reviewed migration.
- `tests/security.test.ts`: real SQLite ownership/conflict tests and deterministic provider/crypto contract checks.

## Data design

| Table | Ownership and purpose |
|---|---|
| projects | UUID, owner subject, title, canonical JSON, revision, updated timestamp |
| revisions | Prior document snapshots; owner/project scoped, unique project/revision, last ~11 retained |
| connections | Owner, provider, model, optional approved endpoint, encrypted key, timestamp; no plaintext |
| assets | Owner, private R2 object metadata, byte size and timestamp |
| chats | Owner/project scoped prompt and assistant text history; up to 60 messages per project |
| limits | Atomic per-owner minute counters, expiry cleanup |

Project IDs are identifiers, never authorization. Shared/public records and access grants do not exist in this beta. Data timestamps are epoch milliseconds. R2 keys combine the authenticated subject and server-generated UUID. Portable exports contain images but never connection secrets.

## Synchronization contract

Canonical coordinates are 512 × 640 per side. Every supported artwork layer has a stable ID, front/back side, primitive type and bounded transform/style values. Fabric operations update the document. The same document is composed into front/back canvas textures and mapped to UV coordinates on a procedural garment mesh. Material and sleeve settings change both visual surfaces. 3D camera transforms do not change 2D artwork; mesh picking changes selected side. Arbitrary geometry deformation is deliberately not claimed as synchronized.

Future CAD work needs a separate pattern graph with pattern-piece IDs, seams, notches, physical units, seam allowances, grading and solver metadata. Add schema migrations; do not reinterpret the existing visual silhouette as a validated cutting pattern. Single-image reconstruction should propose a likely base garment, masks and materials with uncertainty and manual correction. Hidden surfaces, physical fabric properties and exact dimensions cannot be recovered reliably from one uncalibrated image.

## Identity and API lifecycle

The trusted managed gateway authenticates the visitor and forwards verified subject/email. API routes obtain that identity using the platform helper and reject missing sessions. Mutating routes verify same-origin plus a custom request header, read bounded bodies, validate schemas and then execute owner-scoped parameterized queries. A standalone public deployment needs real server-side OIDC/session verification, secure HttpOnly cookies, OAuth state/PKCE and redirect validation; never ship a raw header-trusting app to an untrusted ingress.

Google login is a single platform OAuth configuration, not per-user API credentials. Users use Google's consent screen. Email login additionally requires transactional mail delivery, abuse protection and operational quota management. End users should not need to provide SMTP credentials just to sign up.

## AI lifecycle

The connection form submits the key over HTTPS once. Backend adapters issue a small test request to the selected official provider endpoint. Success is encrypted with AES-GCM, random nonce and owner/record associated data. Metadata-only lists power the UI. A chat call authenticates the owner, loads their connection, decrypts in backend memory, applies rate limits and sends prompt, bounded history and selected garment settings to that provider. No uploaded images or measurements are automatically transmitted.

Provider output is bounded and rendered as plain React text. Edit mode must parse the strict supported proposal schema. The UI binds the proposal to the source document snapshot and refuses stale application. There is no arbitrary tool execution, generated JavaScript, shell or direct database write path from model output. Models and account permissions vary; passing a test once does not guarantee later model availability or free credits.

## Nonfunctional acceptance targets

No cross-account document or credential access; bounded request/provider response sizes; explicit quota errors; no silent overwrite on stale revisions; exportable documents; no mandatory AI; keyboard-accessible inspector and dialogs; reduced-motion and light-mode support; graceful missing WebGL/provider failure. Desktop is the primary creation surface; narrow screens stack the panels. Practical latency/performance targets need measurement on representative devices before public availability; they are not asserted as achieved benchmarks.

## Marketplace extension

Add profiles, publications, template versions, licenses, collections, favorites, follows, comments, reports and moderation events as separate tables with explicit visibility and permission policies. Publishing copies a sanitized, immutable project version to a public asset namespace; it must never expose private project endpoints or vault data. Start with free licensed downloads. Paid sales require orders, entitlements, payment webhooks, refunds, tax/payout compliance and seller identity. Keep payments behind a provider adapter and do not claim BYOK eliminates those operational obligations.
