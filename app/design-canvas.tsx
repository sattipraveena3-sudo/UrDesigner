'use client';
import {useEffect,useRef} from 'react';
import {Canvas,PencilBrush} from 'fabric';
import {Design,Side,baseLayer} from '@/lib/urdesigner/model';
import {paint,updateFromObject} from '@/lib/urdesigner/canvas';
export default function DesignCanvas({design,side,tool,brushColor,brushSize,selected,onSelect,onChange,onError}:{design:Design;side:Side;tool:string;brushColor:string;brushSize:number;selected:string|null;onSelect:(id:string|null)=>void;onChange:(d:Design)=>void;onError:(s:string)=>void}){
 const element=useRef<HTMLCanvasElement>(null),instance=useRef<Canvas|null>(null),latest=useRef({design,side,onSelect,onChange,onError}),busy=useRef(false),queue=useRef(Promise.resolve()),last=useRef('');latest.current={design,side,onSelect,onChange,onError};
 useEffect(()=>{const c=new Canvas(element.current!,{width:512,height:640,preserveObjectStacking:true,selection:false});instance.current=c;
 c.on('selection:created',e=>latest.current.onSelect((e.selected?.[0] as any)?.layerId||null));c.on('selection:updated',e=>latest.current.onSelect((e.selected?.[0] as any)?.layerId||null));c.on('selection:cleared',()=>{if(!busy.current)latest.current.onSelect(null)});
 const change=(e:any)=>{if(busy.current||!e.target)return;const {design,onChange}=latest.current;const next={...design,layers:design.layers.map(l=>l.id===e.target.layerId?updateFromObject(l,e.target):l)};last.current=JSON.stringify(next)+latest.current.side;onChange(next)};c.on('object:modified',change);c.on('text:editing:exited',change);
 c.on('path:created',e=>{const {design,side,onChange,onSelect}=latest.current;const p=e.path as any,l={...baseLayer('path',side),x:p.left,y:p.top,width:p.width,height:p.height,path:p.path as any,fill:typeof p.stroke==='string'?p.stroke:'#59364a',strokeWidth:p.strokeWidth};(p as any).layerId=l.id;const next={...design,layers:[...design.layers,l]};last.current=JSON.stringify(next)+side;onChange(next);onSelect(l.id)});
 return()=>{instance.current=null;queue.current.finally(()=>c.dispose())};},[]);
 useEffect(()=>{const c=instance.current;if(!c)return;const stamp=JSON.stringify(design)+side;if(stamp===last.current)return;last.current=stamp;queue.current=queue.current.then(async()=>{if(instance.current!==c||stamp!==last.current)return;busy.current=true;try{await paint(c,design,side);const item=c.getObjects().find(o=>(o as any).layerId===selected);if(item)c.setActiveObject(item);c.requestRenderAll()}catch{latest.current.onError('An image could not be loaded. Check your connection.')}finally{busy.current=false}})},[design,side]);
 useEffect(()=>{const c=instance.current;if(!c)return;c.isDrawingMode=tool==='draw';const b=new PencilBrush(c);b.color=brushColor;b.width=brushSize;c.freeDrawingBrush=b},[tool,brushColor,brushSize]);
 useEffect(()=>{const c=instance.current;if(!c)return;const o=c.getObjects().find(o=>(o as any).layerId===selected);if(o&&!o.selectable)return;if(o)c.setActiveObject(o);else c.discardActiveObject();c.requestRenderAll()},[selected]);
 return <div className="fabric-wrap"><canvas ref={element} aria-label="Editable garment artwork canvas. Use the layer controls to edit with the keyboard."/></div>
}
