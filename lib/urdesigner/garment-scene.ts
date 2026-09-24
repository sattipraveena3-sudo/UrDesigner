import * as T from 'three';
import {Design,dimensions} from './model';
import {texture} from './canvas';
import {garmentSurface,sleeveSurface,pantsSurface,drape} from './mesh';
import {garmentSpec} from './catalog';
export function disposeGroup(group:T.Object3D){const geometries=new Set<T.BufferGeometry>(),materials=new Set<T.Material>(),maps=new Set<T.Texture>();group.traverse(o=>{if(o instanceof T.Mesh){geometries.add(o.geometry);for(const m of Array.isArray(o.material)?o.material:[o.material]){materials.add(m);for(const v of Object.values(m))if(v instanceof T.Texture)maps.add(v)}}});geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());maps.forEach(m=>m.dispose())}
export async function buildGarment(d:Design){const group=new T.Group();group.name=d.title;const images=await Promise.all([texture(d,'front',true),texture(d,'back',true)]);const weave=document.createElement('canvas');weave.width=128;weave.height=128;const wc=weave.getContext('2d')!;wc.fillStyle='#888888';wc.fillRect(0,0,128,128);for(let i=0;i<128;i+=4){wc.fillStyle=i%8?'#999999':'#777777';wc.fillRect(i,0,1,128);wc.fillRect(0,i,128,1)}const bump=new T.CanvasTexture(weave);bump.wrapS=bump.wrapT=T.RepeatWrapping;bump.repeat.set(16,20);const glossy=['satin','silk','brocade'].includes(d.fabric);const mats=images.map(image=>{const map=new T.CanvasTexture(image);map.colorSpace=T.SRGBColorSpace;map.anisotropy=4;return new T.MeshPhysicalMaterial({map,bumpMap:bump,bumpScale:['denim','linen','brocade'].includes(d.fabric)?.004:.001,roughness:glossy?.3:d.fabric==='velvet'?.98:.78,metalness:d.fabric==='brocade'?.15:0,side:T.DoubleSide,transparent:true,alphaTest:.06,sheen:glossy?.65:.12,sheenColor:new T.Color(d.color),clearcoat:glossy?.25:0})});
const plain=(color:string)=>new T.MeshPhysicalMaterial({color,roughness:glossy?.32:.78,side:T.DoubleSide,sheen:glossy?.5:.1,sheenColor:new T.Color(color)});
const add=(g:T.BufferGeometry,m:T.Material,name:string,part:string,side='front')=>{const mesh=new T.Mesh(g,m);mesh.name=name;mesh.castShadow=true;mesh.receiveShadow=true;mesh.userData={side,part};group.add(mesh)};
const spec=garmentSpec(d.garment),split=['lehenga','coord'].includes(d.garment);
if(spec.kind==='pants'){for(const left of [true,false])for(const side of ['front','back'] as const)add(pantsSurface(d,left,side),mats[side==='front'?0:1],(left?'Left':'Right')+' trouser '+side,'bottom',side)}
else if(['jumpsuit','suit','pantsuit'].includes(spec.kind)){
const top=spec.kind==='jumpsuit'?{...d,garment:'top' as const,construction:{...d.construction,length:.94}}:d;
add(garmentSurface(top,'front'),mats[0],'Bodice front','bodice');add(garmentSurface(top,'back'),mats[1],'Bodice back','bodice','back');
const bottom={...d,garment:(d.garment==='sharara'?'palazzo':'trousers') as Design['garment'],construction:{...d.construction,length:1}};
for(const left of [true,false])for(const side of ['front','back'] as const)add(pantsSurface(bottom,left,side),mats[side==='front'?0:1],(left?'Left':'Right')+' trouser '+side,'bottom',side);
}else for(const side of ['front','back'] as const){const m=mats[side==='front'?0:1];if(split){add(garmentSurface(d,side,undefined,300),m,'Bodice '+side,'bodice',side);add(garmentSurface(d,side,317),m,'Skirt '+side,'bottom',side)}else add(garmentSurface(d,side),m,(spec.kind==='skirt'?'Skirt ':'Garment ')+side,spec.kind==='skirt'?'bottom':'bodice',side)}
if(!['pants','skirt'].includes(spec.kind)&&d.construction.sleeveStyle!=='sleeveless'&&d.sleeve>0)for(const left of [true,false])for(const side of ['front','back'] as const)add(sleeveSurface(d,left,side),mats[side==='front'?0:1],(left?'Left':'Right')+' sleeve '+side,'sleeves',side);
if(d.garment==='saree'||d.construction.dupatta)add(drape(),new T.MeshPhysicalMaterial({color:d.accent,roughness:glossy?.3:.6,side:T.DoubleSide,transparent:true,opacity:['chiffon','georgette','organza','lace'].includes(d.fabric)?.6:.95}),'Draped overlay','drape');

// Raised trim follows the same surface geometry; it stays attached as the silhouette changes.
const z=dimensions(d);if(d.construction.trim!=='none'&&spec.kind!=='pants'){
 const trimMaterial=new T.MeshStandardMaterial({color:d.accent,roughness:d.construction.trim==='embroidered'?.48:.68,metalness:d.construction.trim==='embroidered'?.15:0});
 for(const side of ['front','back'] as const){const surface=garmentSurface(d,side),position=surface.getAttribute('position'),points:T.Vector3[]=[];const first=48*65;for(let i=0;i<=64;i++){points.push(new T.Vector3(position.getX(first+i),position.getY(first+i)+.045,position.getZ(first+i)*1.018))}surface.dispose();add(new T.TubeGeometry(new T.CatmullRomCurve3(points),96,d.construction.trim==='border'?.012:.006,5,false),trimMaterial,'Raised hem trim '+side,'bottom',side)}
}
if(d.construction.closure==='buttons'&&!['pants','skirt'].includes(spec.kind))for(let y=185;y<Math.min(z.bottom-20,350);y+=28){const material=new T.MeshStandardMaterial({color:d.accent,roughness:.35,metalness:.3});const geometry=new T.SphereGeometry(.015,12,8);const mesh=new T.Mesh(geometry,material);mesh.name='Front button';mesh.position.set(0,(340-y)/180,(y<240?88:74*d.construction.waist)*.55/180+.012);mesh.scale.z=.4;mesh.castShadow=true;mesh.userData={side:'front',part:'bodice'};group.add(mesh)}

// Dispose unused materials when a construction uses only solid components.
for(const m of mats)if(!group.children.some(o=>(o as T.Mesh).material===m)){m.map?.dispose();m.dispose()}
return group;
}
