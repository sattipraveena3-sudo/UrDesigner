import {test} from 'node:test';
import assert from 'node:assert/strict';
import {Miniflare} from 'miniflare';
import {readFileSync} from 'node:fs';
test('deployed runtime accepts manual redirect mode and keeps credentials on the original request',async()=>{const source=readFileSync('lib/urdesigner/ai.ts','utf8');assert.ok(!source.includes("redirect:'error'"));const mf=new Miniflare({modules:true,compatibilityDate:'2026-05-15',script:`export default {async fetch(){const request=new Request('https://api.openai.com/v1/models',{redirect:'manual',headers:{Authorization:'Bearer test-only'}});return Response.json({redirect:request.redirect,authorization:request.headers.get('Authorization')})}}`});try{const result:any=await(await mf.dispatchFetch('http://localhost/')).json();assert.equal(result.redirect,'manual');assert.equal(result.authorization,'Bearer test-only')}finally{await mf.dispose()}});
