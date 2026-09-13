# September 13 correction release

## Root cause and repair

The prior AI transport used `redirect: 'error'`. A request-construction probe against the project's installed workerd runtime returned: `Invalid redirect value, must be one of "follow" or "manual"`. The catch-all concealed this as a generic secure-connection failure. `manual` was accepted in the same probe. The current implementation uses manual redirects and rejects all 3xx results, preserving the security property that credentials never follow redirects. Provider status failures, redirects, timeouts and transport categories now have separate messages. Logs contain only a fixed category, never raw errors, headers or key material.

Connection tests use official `/models` endpoints and do not generate text. A successful account check does not promise that an arbitrary selected model supports inference. Live user-account inference must still be confirmed after reconnecting.

## Manual design changes

27 garment presets, organized by category; Indian and Western womenswear emphasized. A persistent construction block adds front/back necklines, sleeve style, length, flare, waist ease, hem, closure, trim and drape options. Old saved documents receive compatible defaults. A free-sketch canvas permits artwork outside the garment silhouette. Fabric images repeat at a user-selected scale and travel with portable exports. Cloud validation checks ownership of fabric-image references as well as artwork images.

A mannequin and volumetric parametric garment surfaces replace the shallow front/back mesh. The renderer supports body sections, sleeves, separate trouser legs and a drape surface. These remain illustrative garment forms, not physical cloth simulation or validated pattern pieces. Fixed mannequin proportions and approximations for compound outfits are explicitly retained limitations; professional tailoring requires domain validation.

Anonymous visitors can use device projects and image storage without an AI key or sign-in. Cloud projects and credential operations remain authenticated and owner-scoped. Device projects do not automatically become cloud projects after sign-in: export locally, sign in, and import to transfer them.

## Reference review

[DIYO](https://diyo.in/) documents an outfit → sketch/reference → fabric → preview flow and a broad women's clothing catalogue. [Tailornova](https://tailornova.com/explore) documents interchangeable templates, length/ease adjustment and separate sketch/pattern/3D outputs. URDesigner uses these interaction principles as reference; it does not copy their proprietary assets, claim their fit-model algorithms, or advertise their manufacturing capabilities as implemented.

[GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages) is static hosting. It cannot itself execute the authenticated credential vault or cloud project API. The owner approved continued ChatGPT Sites hosting and requested public link access. The source remains mirrored to GitHub.
