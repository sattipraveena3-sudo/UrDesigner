import {z} from 'zod';
export const color=z.string().regex(/^#[0-9a-f]{6}$/i);
export const garmentTypes=['tee','hoodie','kurta','dress'] as const;
export const fabrics=['cotton','linen','satin','denim'] as const;
const number=z.number().finite();
export const layerSchema=z.object({id:z.string().uuid(),name:z.string().max(80),type:z.enum(['text','rect','circle','path','image']),side:z.enum(['front','back']),x:number.min(-1000).max(2000),y:number.min(-1000).max(2000),scaleX:number.min(-10).max(10),scaleY:number.min(-10).max(10),angle:number.min(-3600).max(3600),fill:color,opacity:number.min(0).max(1),visible:z.boolean(),locked:z.boolean(),width:number.min(0).max(2048),height:number.min(0).max(2048),text:z.string().max(500).optional(),fontSize:number.min(8).max(200).optional(),fontFamily:z.enum(['Arial','Georgia','Courier New']).optional(),path:z.array(z.array(z.union([number.min(-10000).max(10000),z.enum(['M','L','Q','C','Z','m','l','q','c','z'])]))).max(6000).optional(),strokeWidth:number.min(1).max(60).optional(),asset:z.string().regex(/^[0-9a-f-]{36}$/i).optional()}).strict();
export const documentSchema=z.object({schemaVersion:z.literal(1),title:z.string().min(1).max(100),garment:z.enum(garmentTypes),color,accent:color,fabric:z.enum(fabrics),pattern:z.enum(['solid','pinstripe','check','dots']),sleeve:number.min(0).max(1),pocket:z.boolean(),layers:z.array(layerSchema).max(80),notes:z.string().max(4000),measurements:z.object({chest:number.min(0).max(250),waist:number.min(0).max(250),length:number.min(0).max(250)}).strict()}).strict();
export type Design=z.infer<typeof documentSchema>;export type Layer=z.infer<typeof layerSchema>;
export type Side='front'|'back';
export function freshDesign():Design{return {schemaVersion:1,title:'The everyday silhouette',garment:'tee',color:'#c3b8a5',accent:'#6e3f4e',fabric:'cotton',pattern:'solid',sleeve:.25,pocket:false,layers:[],notes:'',measurements:{chest:0,waist:0,length:0}}}
export function baseLayer(type:Layer['type'],side:Side):Layer{return{id:crypto.randomUUID(),name:type==='text'?'Your signature':type==='path'?'Brush stroke':'New '+type,type,side,x:206,y:250,scaleX:1,scaleY:1,angle:0,fill:'#59364a',opacity:1,visible:true,locked:false,width:100,height:100,...(type==='text'?{text:'UR\nDESIGNER',fontSize:26,fontFamily:'Georgia' as const}:{} )}}
export const proposalSchema=z.object({explanation:z.string().max(4000),changes:z.object({color:color.optional(),accent:color.optional(),fabric:z.enum(fabrics).optional(),pattern:z.enum(['solid','pinstripe','check','dots']).optional(),pocket:z.boolean().optional()}).strict()}).strict();
export type Proposal=z.infer<typeof proposalSchema>;
export function applyProposal(doc:Design,proposal:unknown):Design{const p=proposalSchema.parse(proposal);return documentSchema.parse({...doc,...p.changes})}
export function normalizeDocument(value:unknown):Design{return documentSchema.parse(value)}
export const garmentNames={tee:'Essential T-shirt',hoodie:'Relaxed hoodie',kurta:'Everyday kurta',dress:'A-line dress'};
// Artwork coordinates are shared by the 2D surface and mesh UVs; these are visual templates, not cutting patterns.
export function contour(d:Design):[number,number][]{
 const long=d.garment==='kurta'||d.garment==='dress';const bottom=long?596:552;const half=d.garment==='dress'?139:105;const sleeve=46+d.sleeve*56;const pts:[number,number][]=[[216,98],[180,102],[105,137],[86-sleeve*.2,220+sleeve*.5],[142,244+sleeve*.5],[160,203],[256-half,bottom],[256+half,bottom],[352,203],[370,244+sleeve*.5],[426+sleeve*.2,220+sleeve*.5],[407,137],[332,102],[296,98]];
 for(let i=0;i<=20;i++){const t=i/20*Math.PI;pts.push([256+40*Math.cos(t),98+32*Math.sin(t)])}return pts;
}
export function silhouettePath(d:Design):string{const p=contour(d);return 'M '+p.map(p=>p.join(' ')).join(' L ')+' Z'}
export function drawGarment(ctx:CanvasRenderingContext2D,d:Design){ctx.save();ctx.clearRect(0,0,512,640);const path=new Path2D(silhouettePath(d));ctx.clip(path);ctx.fillStyle=d.color;ctx.fillRect(0,0,512,640);ctx.strokeStyle=d.accent;ctx.fillStyle=d.accent;ctx.globalAlpha=.45;
 if(d.pattern==='pinstripe')for(let x=0;x<512;x+=17){ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,640);ctx.stroke()}
 if(d.pattern==='check')for(let x=0;x<640;x+=27){ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,640);ctx.moveTo(0,x);ctx.lineTo(512,x);ctx.stroke()}
 if(d.pattern==='dots')for(let y=0;y<640;y+=24)for(let x=0;x<512;x+=24){ctx.beginPath();ctx.arc(x+(y%48?12:0),y,2,0,Math.PI*2);ctx.fill()}
 ctx.globalAlpha=.065;ctx.fillStyle='#000000';for(let y=0;y<640;y+=d.fabric==='linen'?3:2)ctx.fillRect(0,y,512,1);ctx.globalAlpha=.4;ctx.strokeStyle=d.accent;ctx.lineWidth=1;ctx.stroke(path);ctx.beginPath();const hem=d.garment==='dress'||d.garment==='kurta'?579:535;ctx.moveTo(156,hem);ctx.lineTo(356,hem);ctx.stroke();if(d.pocket){ctx.globalAlpha=.8;ctx.strokeRect(290,260,47,55);ctx.beginPath();ctx.moveTo(290,268);ctx.lineTo(337,268);ctx.stroke()}if(d.garment==='hoodie'){ctx.globalAlpha=.8;ctx.beginPath();ctx.moveTo(216,110);ctx.lineTo(215,210);ctx.moveTo(296,110);ctx.lineTo(297,210);ctx.stroke();ctx.beginPath();ctx.ellipse(256,113,53,31,0,0,Math.PI);ctx.stroke()}ctx.restore();
}
export function downloadBlob(blob:Blob,name:string){const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),3000)}
