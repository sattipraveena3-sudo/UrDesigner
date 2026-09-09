# URDesigner

**Design. Create. Wear. Inspire.**

An early working fashion studio: manual artwork editing, synchronized 3D visualization, cloud projects, and optional bring-your-own-key AI. This repository is the first implementation milestone of the larger URDesigner product blueprint, not a completed CLO3D replacement.

## What works in this beta

- Manual 2D design: text, rectangle, circle, freehand vector strokes, image artwork, transforms, colors, opacity, visibility, locking, duplication, ordering, undo and redo.
- Four stylized garment templates: T-shirt, hoodie concept, kurta and A-line dress. These are visual templates, not validated patterns.
- Front/back artwork and garment settings feed a real Three.js mesh preview. Rotate, zoom, reset camera, adjust lighting, select an artwork side by double-clicking the mesh, and export a PNG.
- Editable material/color/pattern/sleeve/pocket settings. Satin, linen, cotton and denim are visual finishes, not physical material calibrations.
- Authenticated cloud projects, optimistic version checks, server revision snapshots, account-scoped local draft recovery, portable JSON exports with embedded images, PNG export and reimport.
- Optional encrypted provider connections: OpenAI, Anthropic, Gemini, Groq, OpenRouter, DeepSeek, Mistral and Cohere. Bring a compatible chat model ID and your own API key. Testing a connection can incur a small provider charge. Provider accounts have not been live-tested without user keys.
- Fashion chat, saved prompt history, strict structured suggestions for colors/materials/pattern/pocket, review before applying, and undo after applying.
- Maker measurements/notes and text export; four written Academy lessons; dark/light modes; owner-only aggregate counts.

Ollama is presented with an honest local-companion requirement. Custom OpenAI-compatible HTTPS endpoints require an administrator allowlist. Neither allows arbitrary outbound requests from the public UI.

## Hosting and identity

This implementation uses the managed Sites / Cloudflare Workers runtime with D1 and R2. It does not use Vercel Hobby or Supabase's default email service. The private beta uses platform-provided authenticated identity. **Direct Google, GitHub, email and magic-link signup are not implemented in this deployment.** A production Google OAuth app, redirect domain and identity integration must be configured for public launch; users must never provide Gmail passwords.

Do not independently expose the Worker while trusting arbitrary `oai-authenticated-*` headers. On Sites, the trusted gateway supplies identity. A standalone deployment must replace `app/chatgpt-auth.ts` with verified OIDC/session validation and reject user-supplied identity headers.

BYOK transfers provider usage charges to the user's provider account; it does not eliminate shared hosting, database, bandwidth, email, support or moderation costs. No claim of unlimited free production capacity is made. Free-tier policies and limits must be rechecked at public launch. The initial publication is private.

## Development

Node 22.13+; install with `npm run install:ci`. `npm run dev` starts the development runtime. `npm run build` emits the Cloudflare-compatible application. `npm test` runs the backend contract/security suite using an in-memory SQLite D1 adapter and mocked provider requests. `npm run typecheck` checks TypeScript. `npm run db:generate` generates schema migrations.

The managed runtime's preview/build/hosting scripts remain intact. Follow the environment's Sites workflow when operating this hosted project. The source manifest declares logical DB/R2 bindings; infrastructure supplies actual resources.

## Secrets

`VAULT_KEY`: a cryptographically random, base64-encoded 32-byte encryption key, server-only. It has been configured in the hosted secret store and is not included in source. Back it up through approved infrastructure procedures. Losing it makes stored provider keys unusable; users must reconnect. Production rotation needs versioned master keys plus an authenticated re-encryption job before retiring the old key.

`ADMIN_EMAIL`: server-only account email authorized for aggregate counts. Prefer stable subject-based RBAC in the public production identity system.

`APPROVED_AI_ENDPOINTS`: optional comma-separated exact HTTPS API base URLs approved by the operator. Never approve loopback, private network, link-local, credential-bearing or untrusted DNS endpoints. The application rejects end-user-selected destinations not on this list and does not follow redirects. Strong network-level egress controls and DNS checks are required before broad custom-provider support.

No provider keys belong in public environment variables, localStorage, project documents, logs, repository files or API list responses. They necessarily pass through the user's password input once, then HTTPS to the backend; persisted copies are AES-256-GCM encrypted with random nonces and owner/record authenticated data. Connection forms clear their key after save or close. App operators with both storage and the master key can technically decrypt keys; this is not zero-knowledge encryption.

## Scope, limitations and next steps

See [Engineering plan](docs/ENGINEERING.md), [Security](docs/SECURITY.md), and [Roadmap](docs/ROADMAP.md). Image upload adds editable artwork; it does not reconstruct a garment from a photograph. Realistic draping, sewing patterns, body measurement extraction, embroidery digitization, mesh sculpting, multiplayer collaboration, public marketplace/social features, paid sales, video Academy, and a full moderation console remain future milestones. AI currently provides text and constrained document edits, not image generation or autonomous CAD operations.

A generated satin-gown study in `public/images/inspiration.webp` supports the material lesson. All editable garment shapes are procedural application data, not sourced commercial garment assets. Keep dependency licenses and vendored component attribution intact.
