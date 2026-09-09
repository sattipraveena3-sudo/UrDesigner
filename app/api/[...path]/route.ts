import {env} from 'cloudflare:workers';
import {getChatGPTUser} from '../../chatgpt-auth';
import {handleApi, type Bindings} from '@/lib/urdesigner/server';
export const dynamic='force-dynamic';
async function handler(request:Request){return handleApi(request,await getChatGPTUser(),env as unknown as Bindings)}
export {handler as GET,handler as POST,handler as PUT,handler as DELETE};
