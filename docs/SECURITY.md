# Security notes and public-launch gate

The beta uses server-side AES-256-GCM encryption, owner-bound associated data, random nonces, private object access, parameterized SQL, per-record ownership checks, same-origin write checks, input/response limits and per-user rate limits. Provider errors do not forward raw response bodies. Provider requests do not follow redirects. No API retrieves a saved plaintext key. No request bodies or keys are intentionally logged.

The test suite verifies encryption round-trip and wrong-owner rejection; unauthenticated and cross-origin rejection; cross-owner read/write/delete protection; optimistic conflicts and snapshots; metadata-only credential responses; custom destination restrictions; strict proposal validation; provider authorization and redirect behavior; error redaction; admin restriction; and asset ownership.

## Known boundaries

- The master key and datastore together permit operator decryption. Encryption is not a promise that nobody can ever access credentials.
- The managed identity gateway is a trust boundary. Never trust forwarded identity on an independently exposed origin.
- Current CSP permits inline scripts/styles required by the framework. Add nonce-based script policy when supported by the production rendering integration; complete a security review before public launch.
- Custom endpoint approval is exact URL matching, not a complete DNS rebinding defense. Only trusted stable public HTTPS provider domains may be approved. Broad custom/local connections need an egress gateway or paired companion, with DNS/IP validation, TLS verification and explicit grants.
- Image upload converts ordinary images in-browser to PNG and checks server-side size/header/dimensions. Public untrusted uploads additionally need full server-side image decode/re-encode, malware/content moderation and resource-exhaustion review. SVG/HTML uploads are not accepted.
- Project and image allowances are beta guardrails. Concurrent quota checks are not a billing-grade reservation system. Add transactional quota accounting before public multi-user scale.
- Revisions and chat retention are bounded per project; expired usage counters are cleaned on writes. Uploaded assets currently remain in the owner's allowance even if their layer/project is deleted. Implement a safe unreferenced-asset collector and deletion workflow before public scale.
- Local draft recovery stores design content on that device, scoped by the authenticated user ID. It stores no provider key. Shared-device users should clear browser data when appropriate.
- API adapters are contract-tested with mocks. Real accounts, regional restrictions, provider credits and selected model IDs require user-owned credentials to validate live.

Before public signup: penetration test auth/session and tenant isolation; replace email-based admin detection with stable-subject roles; implement audit logging with redaction and retention; add account deletion/export and privacy terms; finish provider destination defense; define incident response and master-key backup/rotation; verify dependency advisories and licenses; enforce spending/availability alerts and production quotas; test accessibility and real-device WebGL behavior; validate Google OAuth consent and operational email where used.
