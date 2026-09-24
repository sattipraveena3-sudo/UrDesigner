# Atelier upgrade — 24 September 2026

## Delivered

- 18 styled starting outfits alongside 27 garment silhouettes, searchable by style and occasion, with front/back thumbnails.
- Region colors, sleeve controls, seam and tier illustrations, pleats, print scale/rotation/offset, and editable pearl/sequin artwork.
- Correctly aligned Fabric 7 canvas backgrounds, outlines visible before coloring, canvas backdrop selection, snapping and layer alignment controls.
- Shared 3D scene builder for preview and GLB export: front/back textile mapping, improved trouser pelvis and sleeves, material sheen/weave, studio environment lighting, shadows, raised borders/buttons, and camera presets.
- Finite geometry at short garment lengths, separate outfit components, and a back-view fallback when WebGL is unavailable.
- Reference boards and image tracing, project variations, collections/favorites, ten saved revisions, and explicit recovery from save conflicts.
- Printable HTML tailor briefs, four-colorway PNG presentation, GLB export, self-contained GLB inspection, and editable project import/export with embedded images.
- Owner-controlled, revocable read-only share snapshots containing title and front/back artwork only. Measurements, notes, and private reference boards are excluded unless intentionally placed as visible artwork.
- Undo captures the previous snapshot correctly. Initialization and asynchronous project operations protect editing state. Consistent image limits, portable-file prevalidation, GLB duplicate-chunk rejection, and failed-model resource cleanup.

## Boundaries

This is a concept-design beta, not a CLO3D replacement or a manufacturing pattern system. Geometry and decorative construction are approximate. There is no physical cloth simulation, validated fit, automated cutting layout, or automatic image-to-3D reconstruction. Imported GLBs are inspected separately and do not become parametric garment templates. A tracing reference is an artwork layer; hide it before exporting if it should not appear in the design.

Manual design works without credentials. Cloud saving and BYOK use the existing hosted sign-in. Direct Google/GitHub authentication is not added by this release. AI remains text chat and reviewable supported property edits, not image or mesh generation. Local Ollama pairing is deferred. Real provider-account verification requires a user's valid provider key; this release does not claim every provider was tested with live credentials.

## Validation

- TypeScript type checking passed.
- All 19 automated checks passed, including ownership, encryption, provider redirects, geometry bounds, history and share revocation.
- Browser checks confirmed initial canvas rendering, reference-image upload, gallery selection, local saving, and prior undo/history checks.
- Export actions reached their success feedback, but the review browser timed out waiting for download events; downloaded files and GLB round-trip were not independently verified.
- The review browser has no WebGL acceleration. The 2D fallback was inspected; the upgraded 3D rendering still needs visual review on a GPU-enabled device.
- Release packaging includes the additive shares migration; no existing migration is rewritten.

## Follow-up work

GPU-device review of all silhouettes, export round-trip verification, stronger anatomical assets and UV layouts, calibrated fabric/fit workflows, optional image-generation adapters, opt-in local inference companion, and licensed marketplace publishing remain future work.
