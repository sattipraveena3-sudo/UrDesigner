'use client';
import {useEffect,useRef} from 'react';
import {drawGarment,freshDesign,selectGarment,Design,Side} from '@/lib/urdesigner/model';
export default function GarmentThumbnail({garment,color='#bc8393',accent='#633748',document,side='front'}:{garment:Design['garment'];color?:string;accent?:string;document?:Design;side?:Side}){const ref=useRef<HTMLCanvasElement>(null);useEffect(()=>{const ctx=ref.current?.getContext('2d');if(!ctx)return;const d=document||{...selectGarment(freshDesign(),garment),color,accent};drawGarment(ctx,d,side)},[garment,color,accent,document,side]);return <canvas ref={ref} width={512} height={640} aria-label={garment+' editable silhouette'} className="garment-thumbnail"/>}
