import {providerById,allowedEndpoint} from './providers';
export type Message={role:'user'|'assistant';content:string};
export async function callProvider(connection:{provider:string;model:string;endpoint?:string|null},key:string,messages:Message[],system:string,allowlist='',fetcher:typeof fetch=(input,init)=>globalThis.fetch(input,init)){
 const p=providerById(connection.provider);if(!p)throw Error('Unknown provider');if(p.kind==='local')throw Error('Local companion connection is not configured');
 const base=p.kind==='custom'?allowedEndpoint(connection.endpoint||'',allowlist):p.base;let url=base+'/chat/completions';let body:unknown;const headers:Record<string,string>={'Content-Type':'application/json'};
 if(p.kind==='anthropic'){url=base+'/messages';headers['x-api-key']=key;headers['anthropic-version']='2023-06-01';body={model:connection.model,max_tokens:1600,system,messages}}
 else if(p.kind==='gemini'){url=base+'/models/'+encodeURIComponent(connection.model.replace(/^models\//,''))+':generateContent';headers['x-goog-api-key']=key;body={systemInstruction:{parts:[{text:system}]},contents:messages.map(m=>({role:m.role==='assistant'?'model':'user',parts:[{text:m.content}]})),generationConfig:{maxOutputTokens:1600}}}
 else{headers.Authorization='Bearer '+key;body={model:connection.model,messages:[{role:'system',content:system},...messages],...(p.id==='openai'?{max_completion_tokens:1600}:{max_tokens:1600})};if(p.kind==='cohere')url=base+'/chat';}
 // Never follow redirects with an Authorization header; never expose a provider response body on errors.
 let response:Response;try{response=await fetcher(url,{method:'POST',headers,body:JSON.stringify(body),redirect:'manual',signal:AbortSignal.timeout(45000)})}catch(error){throw transportError(error)}
 if(response.status>=300&&response.status<400){await response.body?.cancel();throw Error('The provider redirected the API request. URDesigner did not forward your key. Check the provider endpoint.')} 
 if(!response.ok){const status=response.status;await response.body?.cancel();throw Error(status===401||status===403?'The provider rejected this key or model. Check your account permissions.':status===429?'Your provider rate limit or credit allowance was reached. Try later or choose another connection.':'The provider could not complete the request (HTTP '+status+'). Check the model ID and account.')}
 const reader=response.body?.getReader();if(!reader)throw Error('Empty provider response');let bytes=0,raw='';const decoder=new TextDecoder();while(true){const {done,value}=await reader.read();if(done)break;bytes+=value.byteLength;if(bytes>256000){await reader.cancel();throw Error('Provider response exceeded the allowed size')}raw+=decoder.decode(value,{stream:true})}raw+=decoder.decode();
 let data:any;try{data=JSON.parse(raw)}catch{throw Error('The provider returned an unreadable response. Try again or select another model.')}let text='';if(p.kind==='anthropic')text=(data.content||[]).filter((v:any)=>v.type==='text').map((v:any)=>v.text).join('\n');else if(p.kind==='gemini')text=(data.candidates?.[0]?.content?.parts||[]).map((v:any)=>v.text||'').join('\n');else if(p.kind==='cohere')text=(data.message?.content||[]).map((v:any)=>v.text||'').join('\n');else text=data.choices?.[0]?.message?.content||'';
 if(typeof text!=='string'||!text.trim())throw Error('The selected model returned no text. Choose a compatible chat model.');return text.slice(0,20000);
}

export function transportError(error:unknown){
 const e=error as {name?:string;message?:string;cause?:{code?:string}};
 const code=e?.cause?.code||'';const message=e?.message||'';
 const category=e?.name==='TimeoutError'||e?.name==='AbortError'?'TIMEOUT':/ENOTFOUND|EAI_AGAIN/.test(code)?'DNS':/CERT|TLS|SSL/.test(code)?'TLS':/ECONNREFUSED|ECONNRESET|UND_ERR_CONNECT/.test(code)?'CONNECTION':/illegal invocation/i.test(message)?'RUNTIME_BINDING':/blocked|not allowed|denied|network access/i.test(message)?'HOST_EGRESS':'NETWORK';
 console.warn(JSON.stringify({event:'ai_transport_failure',category}));
 return Error(category==='TIMEOUT'?'The provider timed out. Try again in a moment.':`The server could not contact the AI provider (${category}). Your key has not been marked invalid. The deployment administrator can use this code to diagnose outbound connectivity.`);
}
export async function testProvider(connection:{provider:string;model:string;endpoint?:string|null},key:string,allowlist='',fetcher:typeof fetch=(input,init)=>globalThis.fetch(input,init)){
 const p=providerById(connection.provider);if(!p||p.kind==='local')throw Error('Choose a hosted provider');
 const base=p.kind==='custom'?allowedEndpoint(connection.endpoint||'',allowlist):p.base;const headers:Record<string,string>={Accept:'application/json'};
 if(p.kind==='anthropic'){headers['x-api-key']=key;headers['anthropic-version']='2023-06-01'}else if(p.kind==='gemini')headers['x-goog-api-key']=key;else headers.Authorization='Bearer '+key;
 let response:Response;try{response=await fetcher(base+'/models',{headers,redirect:'manual',signal:AbortSignal.timeout(15000)})}catch(error){throw transportError(error)}
 const status=response.status;await response.body?.cancel();if(status===401||status===403)throw Error('The provider rejected this API key or account access. Check the key in your provider dashboard.');if(status>=300&&status<400)throw Error('The provider redirected this endpoint. The API key was not forwarded.');if(status===429)throw Error('The provider is rate limiting this account. Wait and try again.');if(!response.ok)throw Error('Provider account check failed (HTTP '+status+'). Check the API endpoint.');return true;
}
