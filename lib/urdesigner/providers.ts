export const providers=[
 {id:'openai',name:'OpenAI',base:'https://api.openai.com/v1',kind:'openai',link:'https://platform.openai.com/api-keys',hint:'Enter a chat model ID from your OpenAI account.'},
 {id:'anthropic',name:'Anthropic',base:'https://api.anthropic.com/v1',kind:'anthropic',link:'https://console.anthropic.com/settings/keys',hint:'Enter a Claude model ID available to your account.'},
 {id:'gemini',name:'Google Gemini',base:'https://generativelanguage.googleapis.com/v1beta',kind:'gemini',link:'https://aistudio.google.com/api-keys',hint:'Use a text model ID from Google AI Studio.'},
 {id:'groq',name:'Groq',base:'https://api.groq.com/openai/v1',kind:'openai',link:'https://console.groq.com/keys',hint:'Use a currently available Groq chat model ID.'},
 {id:'openrouter',name:'OpenRouter',base:'https://openrouter.ai/api/v1',kind:'openai',link:'https://openrouter.ai/settings/keys',hint:'Free models may be available; availability and limits vary.'},
 {id:'deepseek',name:'DeepSeek',base:'https://api.deepseek.com',kind:'openai',link:'https://platform.deepseek.com/api_keys',hint:'Enter a model ID available in your DeepSeek account.'},
 {id:'mistral',name:'Mistral',base:'https://api.mistral.ai/v1',kind:'openai',link:'https://console.mistral.ai',hint:'Use a text/chat model from your Mistral account.'},
 {id:'cohere',name:'Cohere',base:'https://api.cohere.com/v2',kind:'cohere',link:'https://dashboard.cohere.com/api-keys',hint:'Enter a Cohere chat model ID.'},
 {id:'ollama',name:'Ollama (Local)',base:'',kind:'local',link:'https://ollama.com',hint:'A hosted website cannot connect to your laptop’s localhost. Use the companion setup described in the project documentation.'},
 {id:'custom',name:'Custom OpenAI-Compatible API',base:'',kind:'custom',link:'',hint:'Only administrator-approved HTTPS endpoints can receive credentials.'}
] as const;
export type ProviderId=typeof providers[number]['id'];
export const providerIds=providers.map(p=>p.id);
export function providerById(id:string){return providers.find(p=>p.id===id)}
export function allowedEndpoint(endpoint:string,allowlist:string){let u:URL;try{u=new URL(endpoint)}catch{throw Error('Invalid endpoint')}
 if(u.protocol!=='https:'||u.username||u.password||u.port||u.search||u.hash)throw Error('Use an approved HTTPS endpoint without query parameters');
 const allowed=allowlist.split(',').map(v=>v.trim().replace(/\/$/,'')).filter(Boolean);
 if(!allowed.includes(u.href.replace(/\/$/,'')))throw Error('This endpoint is not approved by the administrator');return u.href.replace(/\/$/,'');
}
